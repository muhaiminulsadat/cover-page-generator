import { transporter, fromEmail } from "./transporter";
import { getResetPasswordTemplate, getWelcomeTemplate, getRolePromotionTemplate } from "./templates";

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  if (!transporter) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Email transporter is not configured in production.");
    }
    console.log("==========================================");
    console.log(`[EMAIL FALLBACK] To: ${to}`);
    console.log(`[EMAIL FALLBACK] Subject: ${subject}`);
    console.log(`[EMAIL FALLBACK] Body:\n${html}`);
    console.log("==========================================");
    return;
  }

  await transporter.sendMail({
    from: `"CoverDe" <${fromEmail}>`,
    to,
    subject,
    html,
  });
}

export async function sendResetPasswordEmail(to: string, name: string, url: string) {
  const html = getResetPasswordTemplate(name, url);
  await sendEmail({
    to,
    subject: "Reset your CoverDe password",
    html,
  });
}

export async function sendWelcomeEmail(to: string, name: string) {
  const html = getWelcomeTemplate(name);
  await sendEmail({
    to,
    subject: "Welcome to CoverDe",
    html,
  });
}

export async function sendRolePromotionEmail(to: string, name: string, newRole: string) {
  const html = getRolePromotionTemplate(name, newRole);
  await sendEmail({
    to,
    subject: "Your role has been upgraded",
    html,
  });
}
