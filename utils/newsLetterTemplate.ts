import { aprilNewsletterTemplate } from "./emailTemplates/campaignTemplate/april.template.mail";
import { augustNewsletterTemplate } from "./emailTemplates/campaignTemplate/august.mail.template";
import { decemberNewsletterTemplate } from "./emailTemplates/campaignTemplate/december.mail.template";
import { februaryNewsletterTemplate } from "./emailTemplates/campaignTemplate/feburary.template.mail";
import { januaryNewsletterTemplate } from "./emailTemplates/campaignTemplate/january.mail.template";
import { julyNewsletterTemplate } from "./emailTemplates/campaignTemplate/july.mail.template";
import { juneNewsletterTemplate } from "./emailTemplates/campaignTemplate/june.template.mail";
import { marchNewsletterTemplate } from "./emailTemplates/campaignTemplate/march.template.mail";
import { mayNewsletterTemplate } from "./emailTemplates/campaignTemplate/may.template.mail";
import { novemberNewsletterTemplate } from "./emailTemplates/campaignTemplate/november.mail.template";
import { octoberNewsletterTemplate } from "./emailTemplates/campaignTemplate/october.mail.template";
import { septemberNewsletterTemplate } from "./emailTemplates/campaignTemplate/september.mail.template";

export const newsletterTemplates = {
  january: {
    subject: "🌅 GECWC Letter #01 • A New Year, A New Beginning",
    template: januaryNewsletterTemplate,
  },

  february: {
    subject: "❤️ GECWC Letter #02 • Someone From Your Batch Is Missing",
    template: februaryNewsletterTemplate,
  },

  march: {
    subject: "🌱 GECWC Letter #03 • Look How Far We've Come",
    template: marchNewsletterTemplate,
  },

  april: {
    subject: "🤝 GECWC Letter #04 • Someone Once Helped You...",
    template: aprilNewsletterTemplate,
  },

  may: {
    subject: "🎓 GECWC Letter #05 • Remember Those Days?",
    template: mayNewsletterTemplate,
  },

  june: {
    subject: "🚀 GECWC Letter #06 • Every Great Journey Begins with a Dream",
    template: juneNewsletterTemplate,
  },

  july: {
    subject: "📸 GECWC Letter #07 • Every Picture Tells a Story",
    template: julyNewsletterTemplate,
  },

  august: {
    subject: "🇮🇳 GECWC Letter #08 • Once a Student, Always a GECWC Alumnus",
    template: augustNewsletterTemplate,
  },

  september: {
    subject: "🌟 GECWC Letter #09 • Every Success Story Inspires Another",
    template: septemberNewsletterTemplate,
  },

  october: {
    subject: "🎉 GECWC Letter #10 • Home Is Where Your Memories Begin",
    template: octoberNewsletterTemplate,
  },

  november: {
    subject: "💙 GECWC Letter #11 • Thank You for Being Part of Our Journey",
    template: novemberNewsletterTemplate,
  },

  december: {
    subject: "🎊 GECWC Letter #12 • Thank You for an Incredible Year",
    template: decemberNewsletterTemplate,
  },
} as const;

export type NewsletterMonth = keyof typeof newsletterTemplates;