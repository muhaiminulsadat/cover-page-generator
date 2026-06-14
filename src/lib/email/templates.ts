interface BaseTemplateProps {
  title: string;
  content: string;
}

export function getBaseTemplate({ title, content }: BaseTemplateProps): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #09090b; color: #fafafa;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #09090b; border: 1px solid #27272a; border-radius: 12px; overflow: hidden; margin-top: 40px; margin-bottom: 40px;">
          <tr>
            <td style="padding: 40px 32px; border-bottom: 1px solid #27272a; text-align: center;">
              <span style="font-size: 20px; font-weight: 700; tracking: -0.05em; color: #ffffff;">
                Cover Page Generator
              </span>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 32px;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="padding: 32px; background-color: #18181b; border-top: 1px solid #27272a; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #a1a1aa; line-height: 1.5;">
                &copy; ${new Date().getFullYear()} Cover Page Generator. All rights reserved.
              </p>
              <p style="margin: 8px 0 0 0; font-size: 11px; color: #71717a;">
                This is an automated academic system message.
              </p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

export function getResetPasswordTemplate(name: string, url: string): string {
  const content = `
    <h2 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 600; color: #ffffff;">Reset Your Password</h2>
    <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 24px; color: #a1a1aa;">
      Hi ${name},
    </p>
    <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 24px; color: #a1a1aa;">
      We received a request to reset the password for your account. Click the button below to complete the process. This link is valid for 1 hour.
    </p>
    <table border="0" cellpadding="0" cellspacing="0" style="margin: 32px 0;">
      <tr>
        <td align="center" style="border-radius: 6px; background-color: #ffffff;">
          <a href="${url}" target="_blank" style="display: inline-block; padding: 12px 24px; font-size: 14px; font-weight: 600; color: #09090b; text-decoration: none; border-radius: 6px;">
            Reset Password
          </a>
        </td>
      </tr>
    </table>
    <p style="margin: 24px 0 0 0; font-size: 12px; line-height: 20px; color: #71717a;">
      If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged.
    </p>
  `;
  return getBaseTemplate({ title: "Reset Password", content });
}

export function getWelcomeTemplate(name: string): string {
  const content = `
    <h2 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 600; color: #ffffff;">Welcome!</h2>
    <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 24px; color: #a1a1aa;">
      Hi ${name},
    </p>
    <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 24px; color: #a1a1aa;">
      Welcome to Cover Page Generator. Your account has been successfully created. You can now design and generate professional lab reports, cover pages, and indexes in seconds.
    </p>
    <table border="0" cellpadding="0" cellspacing="0" style="margin: 32px 0;">
      <tr>
        <td align="center" style="border-radius: 6px; background-color: #ffffff;">
          <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://coverde.me'}/dashboard" target="_blank" style="display: inline-block; padding: 12px 24px; font-size: 14px; font-weight: 600; color: #09090b; text-decoration: none; border-radius: 6px;">
            Go to Dashboard
          </a>
        </td>
      </tr>
    </table>
  `;
  return getBaseTemplate({ title: "Welcome to Cover Page Generator", content });
}

export function getRolePromotionTemplate(name: string, newRole: string): string {
  const content = `
    <h2 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 600; color: #ffffff;">Role Upgraded</h2>
    <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 24px; color: #a1a1aa;">
      Hi ${name},
    </p>
    <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 24px; color: #a1a1aa;">
      Your account permissions have been upgraded. Your new role is now <strong>${newRole}</strong>.
    </p>
    <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 24px; color: #a1a1aa;">
      Log in to see your updated privileges and access administrative options.
    </p>
  `;
  return getBaseTemplate({ title: "Account Role Upgraded", content });
}
