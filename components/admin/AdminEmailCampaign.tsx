"use client";

import { useEffect, useRef, useState } from "react";
import { Alert, Button, Empty, Input, Modal, Select, Skeleton, Tag, message } from "antd";
import { Bold, Code, Eye, FileText, Italic, Link as LinkIcon, Mail, Monitor, Plus, RefreshCw, Save, Send, Smartphone, Users } from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import useSWR from "swr";

interface Audience { role: "all" | "alumni" | "student"; batches: number[]; branches: string[] }
interface Content { name: string; subject: string; html: string; audience: Audience }
interface CampaignRow { _id: string; name: string; subject: string; audience: Audience; status: "draft" | "queued" | "queue_failed"; revision: number; total: number; sent: number; failed: number; skipped: number; createdAt: string }
interface History { campaigns: CampaignRow[]; batches: number[]; branches: string[] }
const emptyAudience: Audience = { role: "all", batches: [], branches: [] };
const starter = `<div style="background-color:#f8fafc;padding:32px 16px;font-family:Arial,sans-serif;color:#0f172a;">
  <table role="presentation" style="width:100%;max-width:600px;margin:0 auto;background-color:#ffffff;border-radius:12px;" cellpadding="0" cellspacing="0">
    <tr><td style="padding:32px;">
      <p style="color:#2563eb;font-size:13px;font-weight:bold;">GECWC ALUMNI PORTAL</p>
      <h1 style="font-size:26px;line-height:1.3;">A little update from your community</h1>
      <p style="font-size:16px;line-height:1.7;">Hello {{fullname}},</p>
      <p style="font-size:16px;line-height:1.7;">Write your message here. Share an event, a story, or an opportunity with the GECWC community.</p>
      <p style="font-size:14px;line-height:1.6;">Warm regards,<br>GECWC Alumni Team</p>
    </td></tr>
  </table>
</div>`;
async function api<T>(body: unknown): Promise<T> {
  const response = await fetch("/api/admin/campaign", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Request failed");
  return data;
}
async function getData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Could not load campaigns");
  return data;
}
function previewDocument(html: string) {
  return `<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src https: http:; style-src 'unsafe-inline';"><style>body{margin:0;overflow-wrap:break-word;}img{max-width:100%;}*{box-sizing:border-box;}</style></head><body>${html}</body></html>`;
}
function statusLabel(row: CampaignRow) {
  if (row.status === "draft") return "Draft";
  if (row.sent + row.skipped === row.total && row.total > 0) return row.skipped ? "Completed with skips" : "Sent";
  if (row.status === "queue_failed") return "Queue interrupted";
  if (row.failed > 0) return "Delivery issues";
  return "Sending / queued";
}
function errorText(error: unknown) { return error instanceof Error ? error.message : "Something went wrong"; }

export default function AdminEmailCampaign() {
  const { data, error, isLoading, mutate } = useSWR<History>("/api/admin/campaign", getData, { refreshInterval: 10000 });
  const [toast, toastContext] = message.useMessage();
  const [modal, modalContext] = Modal.useModal();
  const [id, setId] = useState<string>();
  const [revision, setRevision] = useState(0);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [html, setHtml] = useState(starter);
  const [audience, setAudience] = useState<Audience>(emptyAudience);
  const [mode, setMode] = useState<"html" | "visual">("html");
  const [preview, setPreview] = useState("");
  const [previewError, setPreviewError] = useState("");
  const [previewLoading, setPreviewLoading] = useState(false);
  const [mobilePreview, setMobilePreview] = useState(false);
  const [recipientCount, setRecipientCount] = useState<number | null>(null);
  const [audienceError, setAudienceError] = useState("");
  const [busy, setBusy] = useState("");
  const [dirty, setDirty] = useState(false);
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [review, setReview] = useState<{ id: string; revision: number; total: number; preview: string } | null>(null);
  const sourceRef = useRef<HTMLTextAreaElement>(null);
  const selectionRef = useRef({ start: 0, end: 0 });
  const locked = Boolean(busy || review);
  const editor = useEditor({
    extensions: [StarterKit.configure({ link: { openOnClick: false } })],
    immediatelyRender: false,
    content: "",
    editorProps: { attributes: { class: "min-h-[380px] p-5 outline-none prose max-w-none text-sm leading-7" } },
    onUpdate: ({ editor }) => { setHtml(editor.getHTML()); setDirty(true); },
  });
  useEffect(() => { editor?.setEditable(!locked); }, [editor, locked]);
  useEffect(() => {
    let current = true;
    const timer = setTimeout(() => {
      setPreviewLoading(true);
      api<{ preview: string }>({ action: "preview", html })
        .then(result => { if (current) { setPreview(result.preview); setPreviewError(""); } })
        .catch(error => { if (current) { setPreview(""); setPreviewError(errorText(error)); } })
        .finally(() => { if (current) setPreviewLoading(false); });
    }, 600);
    return () => { current = false; clearTimeout(timer); };
  }, [html]);
  useEffect(() => {
    let current = true;
    setRecipientCount(null);
    setAudienceError("");
    const timer = setTimeout(() => {
      api<{ total: number }>({ action: "audience", audience })
        .then(result => { if (current) setRecipientCount(result.total); })
        .catch(error => { if (current) setAudienceError(errorText(error)); });
    }, 250);
    return () => { current = false; clearTimeout(timer); };
  }, [audience]);
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const content = (): Content => ({ name, subject, html, audience });
  async function saveDraft() {
    const saved = await api<{ id: string; revision: number; html: string }>({ action: "save", id, revision, content: content() });
    setId(saved.id); setRevision(saved.revision); setDirty(false);
    void mutate();
    return saved;
  }
  async function run(action: string, work: () => Promise<void>) {
    setBusy(action);
    try { await work(); } catch (error) { toast.error(errorText(error)); } finally { setBusy(""); }
  }
  async function openReview() {
    await run("review", async () => {
      const saved = await saveDraft();
      const [count, rendered] = await Promise.all([
        api<{ total: number }>({ action: "audience", audience }),
        api<{ preview: string }>({ action: "preview", html: saved.html }),
      ]);
      if (!count.total) throw new Error("No approved members match this audience.");
      if (count.total > 5000) throw new Error("Narrow your audience to 5,000 recipients or fewer.");
      setReview({ ...saved, total: count.total, preview: rendered.preview });
    });
  }
  function newCampaign() {
    setId(undefined); setRevision(0); setName(""); setSubject(""); setHtml(starter);
    setAudience({ ...emptyAudience }); setMode("html"); setDirty(false);
  }
  async function openCampaign(row: CampaignRow) {
    await run(row._id, async () => {
      const result = await getData<{ campaign: Content & { _id: string; revision: number; status: string } }>(`/api/admin/campaign?id=${row._id}`);
      const campaign = result.campaign;
      const draft = campaign.status === "draft";
      setId(draft ? campaign._id : undefined); setRevision(draft ? campaign.revision : 0);
      setName(draft ? campaign.name : `${campaign.name} (copy)`); setSubject(campaign.subject);
      setHtml(campaign.html); setAudience(campaign.audience); setMode("html"); setDirty(!draft);
      document.getElementById("campaign-composer")?.scrollIntoView({ behavior: "smooth" });
    });
  }
  function rememberSelection() {
    const source = sourceRef.current;
    if (source) selectionRef.current = { start: source.selectionStart, end: source.selectionEnd };
  }
  function insertHtml(markup: string) {
    const { start, end } = selectionRef.current;
    setHtml(html.slice(0, start) + markup + html.slice(end)); setDirty(true);
    requestAnimationFrame(() => { sourceRef.current?.focus(); sourceRef.current?.setSelectionRange(start + markup.length, start + markup.length); });
  }
  function insertLink() {
    try {
      const url = new URL(linkUrl.trim());
      if (!["https:", "http:", "mailto:", "tel:"].includes(url.protocol)) throw new Error();
      if (!linkText.trim()) { toast.error("Enter the link text"); return; }
      const escape = (value: string) => value.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
      if (mode === "html") insertHtml(`<a href="${escape(url.href)}" style="color:#2563eb;text-decoration:underline;">${escape(linkText.trim())}</a>`);
      else editor?.chain().focus().insertContent({ type: "text", text: linkText.trim(), marks: [{ type: "link", attrs: { href: url.href } }] }).run();
      setLinkOpen(false); setLinkText(""); setLinkUrl("");
    } catch { toast.error("Enter a valid https://, http://, mailto: or tel: link"); }
  }

  return (
    <div className="space-y-6">
      {toastContext}
      {modalContext}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div><h1 className="text-slate-900">Email campaigns</h1><p className="text-sm text-slate-500">Create something worth opening. Write, preview, and reach the right members.</p></div>
        <Button icon={<Plus size={16} />} disabled={locked} onClick={() => {
          if (dirty) modal.confirm({ rootClassName: "admin-dialog", title: "Discard unsaved changes?", content: "Your current edits have not been saved.", okText: "Discard changes", okButtonProps: { danger: true }, onOk: newCampaign });
          else newCampaign();
        }}>New campaign</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {[{ label: "Campaigns in recent history", value: data?.campaigns.length ?? "?", icon: Mail }, { label: "Saved drafts in recent history", value: data?.campaigns.filter(c => c.status === "draft").length ?? "?", icon: FileText }, { label: "Matching approved recipients", value: recipientCount ?? "?", icon: Users }].map(stat => (
          <div key={stat.label} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5"><div><p className="text-sm text-slate-500">{stat.label}</p><p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{stat.value}</p></div><span className="rounded-xl bg-blue-50 p-3 text-blue-600"><stat.icon size={22} /></span></div>
        ))}
      </div>
      <div id="campaign-composer" className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section className="min-w-0 rounded-2xl border border-slate-200 bg-white">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4"><div><h2 className="font-semibold text-slate-900">Compose your email</h2><p className="mt-1 text-xs text-slate-500">{id ? "Editing saved draft" : "New campaign"} ? {dirty ? "Unsaved changes" : "Ready to edit"}</p></div><Tag color="blue">{id ? "Draft" : "Composer"}</Tag></div>
          <div className="grid gap-5 p-5 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-slate-700">Campaign name<Input maxLength={120} value={name} disabled={locked} onChange={e => { setName(e.target.value); setDirty(true); }} placeholder="e.g. Alumni reunion invitation" /></label>
            <label className="space-y-2 text-sm font-medium text-slate-700">Email subject<Input maxLength={200} value={subject} disabled={locked} onChange={e => { setSubject(e.target.value); setDirty(true); }} placeholder="What should appear in the inbox?" /></label>
          </div>
          <div className="px-5 pb-5">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-t-xl border border-slate-200 bg-slate-50 p-3">
              <div className="flex gap-2"><Button type={mode === "html" ? "primary" : "default"} icon={<Code size={15} />} disabled={locked} onClick={() => setMode("html")}>HTML template</Button><Button type={mode === "visual" ? "primary" : "default"} icon={<FileText size={15} />} disabled={locked} onClick={() => { editor?.commands.setContent(html, { emitUpdate: false }); setMode("visual"); }}>Write visually</Button></div>
              <Button icon={<LinkIcon size={15} />} disabled={locked} onClick={() => { if (mode === "html") { rememberSelection(); setLinkText(html.slice(selectionRef.current.start, selectionRef.current.end)); } else setLinkText(editor?.state.doc.textBetween(editor.state.selection.from, editor.state.selection.to) || ""); setLinkOpen(true); }}>Insert link</Button>
            </div>
            {mode === "html" ? <textarea ref={sourceRef} aria-label="Email HTML template" spellCheck={false} value={html} disabled={locked} onSelect={rememberSelection} onChange={e => { setHtml(e.target.value); setDirty(true); }} className="block min-h-[420px] w-full resize-y rounded-b-xl border border-t-0 border-slate-200 bg-white p-4 font-mono text-[13px] leading-6 text-slate-700 focus:outline-blue-500 disabled:opacity-60" /> : <div className="rounded-b-xl border border-t-0 border-slate-200"><div className="flex gap-2 border-b border-slate-100 px-3 py-2"><Button aria-label="Bold" icon={<Bold size={16} />} disabled={locked} onClick={() => editor?.chain().focus().toggleBold().run()} /><Button aria-label="Italic" icon={<Italic size={16} />} disabled={locked} onClick={() => editor?.chain().focus().toggleItalic().run()} /><Button disabled={locked} onClick={() => editor?.chain().focus().toggleBulletList().run()}>Bullet list</Button></div><EditorContent className="campaign-visual-editor" editor={editor} /></div>}
            <p className="mt-3 text-xs leading-5 text-slate-500">{mode === "html" ? "Paste the full HTML template from Claude, including its styles. Markdown code fences are accepted. Use {{fullname}} to personalize each email." : "Use the visual editor for simple emails. Editing here simplifies imported layouts, including tables and custom styles. Keep complex templates in HTML mode."}</p>
          </div>
        </section>
        <aside className="space-y-5">
          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="flex items-center gap-2 font-semibold text-slate-900"><Users size={18} className="text-blue-600" /> Target audience</h2><p className="mt-2 text-xs leading-5 text-slate-500">Only approved alumni and students receive campaigns. Leave a filter empty to include all.</p>
            <div className="mt-5 space-y-5">
              <div><label id="campaign-role" className="mb-2 block text-sm font-medium text-slate-700">Members</label><Select aria-labelledby="campaign-role" className="w-full" value={audience.role} disabled={locked} onChange={role => { setAudience({ ...audience, role }); setDirty(true); }} options={[{ value: "all", label: "Alumni & students" }, { value: "alumni", label: "Alumni only" }, { value: "student", label: "Students only" }]} /></div>
              <div><label id="campaign-batches" className="mb-2 block text-sm font-medium text-slate-700">Batch years</label><Select aria-labelledby="campaign-batches" mode="multiple" allowClear className="w-full" placeholder="All batches" value={audience.batches} disabled={locked || isLoading} onChange={batches => { setAudience({ ...audience, batches }); setDirty(true); }} options={data?.batches.map(value => ({ value, label: String(value) }))} /></div>
              <div><label id="campaign-branches" className="mb-2 block text-sm font-medium text-slate-700">Branches</label><Select aria-labelledby="campaign-branches" mode="multiple" allowClear className="w-full" placeholder="All branches" value={audience.branches} disabled={locked || isLoading} onChange={branches => { setAudience({ ...audience, branches }); setDirty(true); }} options={data?.branches.map(value => ({ value, label: value }))} /></div>
            </div>
            <div className="mt-5 rounded-xl bg-blue-50 p-4"><p className="text-2xl font-semibold text-blue-600">{recipientCount ?? "?"}</p><p className="mt-1 text-xs text-blue-600">matching recipients ? duplicate emails removed</p></div>
            <p className="mt-3 text-xs leading-5 text-slate-500">Selected batches AND selected branches must match. Multiple choices within each filter are combined.</p>
            {audienceError && <Alert className="mt-3" type="error" title={audienceError} />}
          </section>
          <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5">
            <Button block icon={<Save size={16} />} loading={busy === "save"} disabled={locked} onClick={() => run("save", async () => { await saveDraft(); toast.success("Draft saved"); })}>Save draft</Button>
            <Button block icon={<Mail size={16} />} loading={busy === "test"} disabled={locked} onClick={() => run("test", async () => { const result = await api<{ message: string }>({ action: "test", content: content() }); toast.success(result.message); })}>Send test to myself</Button>
            <Button block type="primary" icon={<Send size={16} />} loading={busy === "review"} disabled={locked || !recipientCount || recipientCount > 5000} onClick={openReview}>Review & send</Button>
            <p className="text-xs leading-5 text-slate-500">Save changes before opening another campaign. Sending uses a fixed recipient list and runs in the background.</p>
          </section>
        </aside>
      </div>
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4"><div><h2 className="flex items-center gap-2 font-semibold text-slate-900"><Eye size={18} className="text-blue-600" /> Email preview</h2><p className="mt-1 text-xs text-slate-500">{previewLoading ? "Updating preview?" : "Personalization example: Alex Kumar. Links are disabled in preview."}</p></div><div className="flex gap-2"><Button aria-label="Desktop preview" type={!mobilePreview ? "primary" : "default"} icon={<Monitor size={16} />} onClick={() => setMobilePreview(false)} /><Button aria-label="Mobile preview" type={mobilePreview ? "primary" : "default"} icon={<Smartphone size={16} />} onClick={() => setMobilePreview(true)} /></div></div>
        {previewError ? <div className="p-5"><Alert type="warning" title={previewError} /></div> : <div className="overflow-x-auto bg-slate-100 p-3 sm:p-6"><iframe title="Email preview" sandbox="" referrerPolicy="no-referrer" srcDoc={previewDocument(preview)} className="mx-auto block h-[560px] border-0 bg-white shadow-sm" style={{ width: mobilePreview ? 375 : "100%", maxWidth: mobilePreview ? undefined : 900 }} /></div>}
        <p className="px-5 py-3 text-xs text-slate-500">Preview uses the same sanitized HTML as sending. Email apps may render styles differently; check a test email before sending.</p>
      </section>
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 p-5"><div><h2 className="font-semibold text-slate-900">Campaign history</h2><p className="mt-1 text-xs text-slate-500">Latest 50 campaigns. Delivery progress refreshes every 10 seconds.</p></div><Button aria-label="Refresh campaigns" icon={<RefreshCw size={16} />} onClick={() => mutate()} /></div>
        {error ? <div className="p-5"><Alert type="error" title={errorText(error)} action={<Button onClick={() => mutate()}>Retry</Button>} /></div> : isLoading ? <div className="p-5"><Skeleton active /></div> : !data?.campaigns.length ? <div className="p-8"><Empty description="Your saved drafts and sent campaigns will appear here" /></div> : <div className="overflow-x-auto"><table className="w-full min-w-[740px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr>{["Campaign", "Audience", "Status", "Delivery", "Actions"].map(title => <th key={title} className="px-5 py-4">{title}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">{data.campaigns.map(row => <tr key={row._id} className="hover:bg-slate-50/50"><td className="px-5 py-4"><p className="font-semibold text-slate-900">{row.name}</p><p className="mt-1 max-w-64 truncate text-xs text-slate-500">{row.subject}</p><p className="mt-1 text-xs text-slate-400">{new Date(row.createdAt).toLocaleDateString()}</p></td><td className="max-w-56 px-5 py-4 text-xs leading-5 text-slate-500"><p className="capitalize">{row.audience.role === "all" ? "Alumni & students" : row.audience.role}</p><p>{row.audience.batches.join(", ") || "All batches"}</p><p>{row.audience.branches.join(", ") || "All branches"}</p></td><td className="px-5 py-4"><Tag color={row.status === "draft" ? "default" : row.total === row.sent + row.skipped ? "green" : row.failed || row.status === "queue_failed" ? "orange" : "blue"}>{statusLabel(row)}</Tag></td><td className="px-5 py-4 text-xs text-slate-500">{row.status === "draft" ? "Not sent" : <><p>{row.sent} / {row.total} sent</p><p className="mt-1">{row.failed} failed ? {row.skipped} skipped ? {row.total - row.sent - row.failed - row.skipped} pending</p></>}</td><td className="px-5 py-4"><div className="flex flex-wrap gap-2"><Button disabled={locked || dirty} loading={busy === row._id} onClick={() => openCampaign(row)}>{row.status === "draft" ? "Edit draft" : "Use as template"}</Button>{row.status !== "draft" && row.sent + row.skipped < row.total && <Button disabled={locked} onClick={() => run("retry", async () => { const result = await api<{ queueFailed: boolean }>({ action: "retry", id: row._id }); if (result.queueFailed) toast.warning("Some batches could not be queued. Try again shortly."); else toast.success("Unsent recipients queued again"); void mutate(); })}>Retry unsent</Button>}</div></td></tr>)}</tbody></table></div>}
      </section>
      <Modal rootClassName="admin-dialog" title="Insert a link" open={linkOpen} onCancel={() => setLinkOpen(false)} onOk={insertLink} okText="Insert link"><div className="space-y-4 py-3"><label className="block space-y-2 text-sm">Link text<Input value={linkText} onChange={e => setLinkText(e.target.value)} placeholder="Register for the event" /></label><label className="block space-y-2 text-sm">Destination URL<Input value={linkUrl} onChange={e => setLinkUrl(e.target.value)} placeholder="https://example.com/register" onPressEnter={insertLink} /></label></div></Modal>
      <Modal rootClassName="admin-dialog" width={760} title="Review your campaign" open={Boolean(review)} onCancel={() => { if (!busy) setReview(null); }} closable={!busy} maskClosable={!busy} footer={<div className="flex flex-wrap justify-end gap-3"><Button disabled={Boolean(busy)} onClick={() => setReview(null)}>Back to editing</Button><Button type="primary" loading={busy === "send"} disabled={Boolean(busy)} icon={<Send size={16} />} onClick={() => run("send", async () => { if (!review) return; const result = await api<{ queueFailed: boolean; totalRecipients: number }>({ action: "send", id: review.id, revision: review.revision }); setReview(null); newCampaign(); void mutate(); if (result.queueFailed) toast.warning("Campaign saved, but some batches could not be queued. Use Retry unsent in history."); else toast.success(`Campaign queued for ${result.totalRecipients} recipients`); })}>Send campaign</Button></div>}>
        <p className="mb-2 font-semibold text-slate-900">{subject}</p><p className="mb-4 text-sm text-slate-500">Sending to approximately {review?.total} approved recipients. The list is finalized when you send. This action cannot be undone.</p><iframe title="Final email preview" sandbox="" referrerPolicy="no-referrer" srcDoc={previewDocument(review?.preview || "")} className="h-[400px] w-full rounded-lg border border-slate-200 bg-white" />
      </Modal>
    </div>
  );
}
