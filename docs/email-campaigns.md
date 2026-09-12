# Admin email campaigns

Open `/admin/campaign` with an approved administrator account.

1. Add a campaign name and inbox subject.
2. Paste a complete HTML template into **HTML template**. A Claude HTML code block can be pasted with or without its Markdown fences. Styles in `<style>` blocks are inlined. Use absolute HTTPS image URLs. For simple formatted messages, use **Write visually**; editing there simplifies imported HTML tables and custom styles.
3. Use **Insert link** to add a link at the current selection. HTTP, HTTPS, email and telephone links are supported.
4. Choose member type, batches and branches. Empty filters mean all; selected batches and branches must both match. Only approved alumni/students are eligible and duplicate email addresses are removed.
5. Check the desktop/mobile preview. `{{fullname}}` is replaced with each recipient?s escaped name. Preview uses Alex Kumar as an example and disables link navigation.
6. Save a draft, or send a test to your signed-in administrator email. **Review & send** saves the draft and shows a final preview before queueing. The recipient list is frozen at send time.
7. Watch history for actual SMTP-accepted counts, failures and skipped recipients. **Retry unsent** resumes a campaign without resending recipients already marked sent. **Use as template** copies a sent campaign into a new composer.

## Environment

Keep secrets in the deployment environment; do not commit them.

| Variable | Purpose |
| --- | --- |
| `SERVER` | Public HTTPS origin for this application, reachable by QStash (e.g. `https://alumni.example.edu`). Local HTTP addresses cannot receive hosted QStash deliveries. For local integration testing, use a public HTTPS tunnel and configure this URL. |
| `QSTASH_TOKEN` | QStash publish token. |
| `QSTASH_CURRENT_SIGNING_KEY` | Current signing key from the same QStash account. |
| `QSTASH_NEXT_SIGNING_KEY` | Next signing key for key rotation. |
| `SMTP_SERVER_USERNAME` | SMTP login and From email address. |
| `SMTP_SERVER_PASSWORD` | SMTP password / provider app password. |
| `SMTP_SERVER_HOST` | SMTP host; defaults to `smtp.gmail.com`. |
| `SMTP_SERVER_PORT` | Optional; defaults to 465 with TLS. Use 587 for a STARTTLS server. |
| `DB_URL`, `DB_NAME`, `NEXTAUTH_SECRET` | Existing application database and authentication configuration. |

QStash must be able to POST `/api/queue/send-email` without a hosting-platform login or deployment protection challenge. The route authenticates QStash signatures itself. Both campaign routes request a 300-second execution duration; hosting-plan limits may be lower.

## Delivery behavior and limits

- Templates are sanitized on the server. Scripts, forms, unsafe URLs, remote stylesheets, CSS background URLs, media queries and other non-inline CSS are removed. Base stylesheet rules become inline styles. Preview the result and send a test: email clients differ in HTML/CSS support.
- Maximum template size: 200 KB after inlining. Maximum audience: 5,000 unique recipients per campaign. History displays the latest 50 campaigns.
- Templates, audience snapshots, revisions and delivery state are persisted in MongoDB. Revisions prevent overwriting a newer draft or queueing the same draft twice.
- QStash receives only campaign IDs and offsets, not template HTML or recipient email addresses. Batches contain ten recipients, with one active batch at a time and five automatic retries.
- A database lease prevents overlapping workers from sending to the same recipient concurrently. Expired leases can be reclaimed. Approval is rechecked at delivery time; recipients who are no longer eligible are skipped.
- SMTP success means the server accepted the message, not that it reached the inbox. Bounce processing, open tracking and provider quotas are outside this implementation.
- Delivery is at least once: if SMTP accepts a message and the process exits before MongoDB records success, a later retry can send it again. SMTP does not provide an exactly-once transaction with MongoDB.
- If queue publication fails or the request is interrupted, the persisted audience remains available through **Retry unsent**. The publication lock expires after six minutes. An unavailable worker may leave recipients pending; inspect QStash delivery logs and retry after resolving configuration issues.
- This replaces the legacy `{ month }` campaign request with the custom-template workflow. Old queued payloads are rejected by the worker?s new schema.

## API and verification

`GET /api/admin/campaign` returns recent history and database-backed audience options. `GET /api/admin/campaign?id=...` loads a template. `POST` accepts `preview`, `audience`, `save`, `test`, `send`, or `retry` actions. All require a current approved administrator record. Sending and retrying use persisted campaign IDs; the worker accepts only signed QStash requests.

Run `npm run test:campaign`, `npx tsc --noEmit --incremental false`, and ESLint on the campaign files. Tests use actual content processing and mocked database, authentication and delivery services; they send no email. For deployment validation, send a test to yourself, then a small intended audience and confirm delivery progress in history.

Implementation references: [QStash signature verification](https://upstash.com/docs/qstash/features/security), [sanitize-html](https://www.npmjs.com/package/sanitize-html), [Juice](https://github.com/Automattic/juice).
