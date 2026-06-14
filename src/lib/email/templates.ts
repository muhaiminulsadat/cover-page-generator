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
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #ffffff; color: #18181b; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 560px; margin: 0 auto; padding: 48px 24px;">
          <!-- Header -->
          <tr>
            <td style="padding-bottom: 32px; border-bottom: 1px solid #e4e4e7;">
              <span style="font-size: 18px; font-weight: 700; color: #09090b; letter-spacing: -0.02em;">
                CoverDe
              </span>
            </td>
          </tr>
          <!-- Body Content -->
          <tr>
            <td style="padding: 32px 0;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding-top: 32px; border-top: 1px solid #e4e4e7; text-align: left;">
              <p style="margin: 0; font-size: 12px; color: #71717a; line-height: 1.5;">
                &copy; ${new Date().getFullYear()} CoverDe. All rights reserved.
              </p>
              <p style="margin: 4px 0 0 0; font-size: 11px; color: #a1a1aa; line-height: 1.4;">
                This is an automated transaction message. Please do not reply.
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
    <h2 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600; color: #09090b; letter-spacing: -0.01em;">Reset your password</h2>
    <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 22px; color: #3f3f46;">
      Hi ${name},
    </p>
    <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 22px; color: #3f3f46;">
      We received a request to reset the password for your CoverDe account. Click the button below to choose a new password. This link will expire in 1 hour.
    </p>
    <table border="0" cellpadding="0" cellspacing="0" style="margin: 28px 0;">
      <tr>
        <td>
          <a href="${url}" target="_blank" style="display: inline-block; padding: 10px 20px; font-size: 14px; font-weight: 500; color: #ffffff; background-color: #09090b; text-decoration: none; border-radius: 6px;">
            Reset password
          </a>
        </td>
      </tr>
    </table>
    <p style="margin: 24px 0 0 0; font-size: 13px; line-height: 20px; color: #71717a;">
      If you did not make this request, you can safely ignore this email.
    </p>
    <p style="margin: 24px 0 0 0; font-size: 12px; line-height: 18px; color: #a1a1aa; border-top: 1px solid #f4f4f5; padding-top: 16px; word-break: break-all;">
      Or copy and paste this URL into your browser:<br>
      <a href="${url}" target="_blank" style="color: #2563eb; text-decoration: none;">${url}</a>
    </p>
  `;
  return getBaseTemplate({ title: "Reset password", content });
}

export function getWelcomeTemplate(name: string): string {
  const content = `
    <h2 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600; color: #09090b; letter-spacing: -0.01em;">Welcome to CoverDe</h2>
    <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 22px; color: #3f3f46;">
      Hi ${name},
    </p>
    <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 22px; color: #3f3f46;">
      Your account is now ready. You can start creating cover pages, lab reports, and indexes immediately from your dashboard.
    </p>
    <table border="0" cellpadding="0" cellspacing="0" style="margin: 28px 0;">
      <tr>
        <td>
          <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://coverde.me'}/dashboard" target="_blank" style="display: inline-block; padding: 10px 20px; font-size: 14px; font-weight: 500; color: #ffffff; background-color: #09090b; text-decoration: none; border-radius: 6px;">
            Go to dashboard
          </a>
        </td>
      </tr>
    </table>
    <p style="margin: 24px 0 0 0; font-size: 13px; line-height: 20px; color: #71717a;">
      Thanks,<br>
      The CoverDe Team
    </p>
  `;
  return getBaseTemplate({ title: "Welcome to CoverDe", content });
}

export function getRolePromotionTemplate(name: string, newRole: string): string {
  const content = `
    <h2 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600; color: #09090b; letter-spacing: -0.01em;">Role updated</h2>
    <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 22px; color: #3f3f46;">
      Hi ${name},
    </p>
    <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 22px; color: #3f3f46;">
      Your CoverDe account role has been updated to <strong>${newRole}</strong>.
    </p>
    <table border="0" cellpadding="0" cellspacing="0" style="margin: 28px 0;">
      <tr>
        <td>
          <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://coverde.me'}/dashboard" target="_blank" style="display: inline-block; padding: 10px 20px; font-size: 14px; font-weight: 500; color: #ffffff; background-color: #09090b; text-decoration: none; border-radius: 6px;">
            Go to dashboard
          </a>
        </td>
      </tr>
    </table>
    <p style="margin: 24px 0 0 0; font-size: 13px; line-height: 20px; color: #71717a;">
      Thanks,<br>
      The CoverDe Team
    </p>
  `;
  return getBaseTemplate({ title: "Role updated", content });
}
