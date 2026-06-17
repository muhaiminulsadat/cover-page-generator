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
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #fafafa; color: #171717; -webkit-font-smoothing: antialiased;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 560px; margin: 40px auto; padding: 32px 24px; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px;">
          <tr>
            <td style="padding-bottom: 24px; border-bottom: 1px solid #f5f5f5;">
              <span style="font-size: 18px; font-weight: 700; color: #09090b; letter-spacing: -0.02em;">
                CoverDe
              </span>
            </td>
          </tr>
          <tr>
            <td style="padding: 28px 0;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="padding-top: 24px; border-top: 1px solid #f5f5f5; text-align: left;">
              <p style="margin: 0; font-size: 12px; color: #737373; line-height: 1.5;">
                &copy; ${new Date().getFullYear()} CoverDe. All rights reserved.
              </p>
              <p style="margin: 4px 0 0 0; font-size: 11px; color: #a3a3a3; line-height: 1.4;">
                This is a transactional message sent regarding your CoverDe account.
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
    <h1 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600; color: #09090b; letter-spacing: -0.01em;">Reset your password</h1>
    <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 20px; color: #404040;">
      Hi ${name},
    </p>
    <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 20px; color: #404040;">
      A request was made to reset the password for your CoverDe account. Click the button below to set a new password. This link will expire in 1 hour.
    </p>
    <table border="0" cellpadding="0" cellspacing="0" style="margin: 24px 0;">
      <tr>
        <td align="center" bgcolor="#09090b" style="border-radius: 6px;">
          <a href="${url}" target="_blank" style="display: inline-block; padding: 12px 24px; font-size: 14px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 6px; background-color: #09090b; border: 1px solid #09090b; letter-spacing: -0.01em;">
            Reset Password
          </a>
        </td>
      </tr>
    </table>
    <p style="margin: 24px 0 0 0; font-size: 13px; line-height: 20px; color: #737373;">
      If you did not make this request, you can safely ignore this email.
    </p>
    <p style="margin: 24px 0 0 0; font-size: 12px; line-height: 18px; color: #a3a3a3; border-top: 1px solid #e5e5e5; padding-top: 16px; word-break: break-all;">
      Or copy and paste this URL into your browser:<br>
      <a href="${url}" target="_blank" style="color: #2563eb; text-decoration: none;">${url}</a>
    </p>
  `;
  return getBaseTemplate({ title: "Reset password", content });
}

export function getWelcomeTemplate(name: string): string {
  const content = `
    <h1 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600; color: #09090b; letter-spacing: -0.01em;">Your CoverDe profile is ready</h1>
    <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 20px; color: #404040;">
      Hi ${name},
    </p>
    <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 20px; color: #404040;">
      Your student profile setup is complete. You can now use the dashboard to generate cover sheets, lab report pages, and indexes for your courses.
    </p>
    <table border="0" cellpadding="0" cellspacing="0" style="margin: 24px 0;">
      <tr>
        <td align="center" bgcolor="#09090b" style="border-radius: 6px;">
          <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://coverde.me'}/dashboard" target="_blank" style="display: inline-block; padding: 12px 24px; font-size: 14px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 6px; background-color: #09090b; border: 1px solid #09090b; letter-spacing: -0.01em;">
            Go to Dashboard
          </a>
        </td>
      </tr>
    </table>
    <p style="margin: 24px 0 0 0; font-size: 14px; line-height: 20px; color: #404040;">
      If you need assistance or encounter issues, feel free to contact support.
    </p>
    <p style="margin: 16px 0 0 0; font-size: 13px; line-height: 20px; color: #737373;">
      Thanks,<br>
      The CoverDe Team
    </p>
  `;
  return getBaseTemplate({ title: "Welcome to CoverDe", content });
}

export function getRolePromotionTemplate(name: string, newRole: string): string {
  const content = `
    <h1 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600; color: #09090b; letter-spacing: -0.01em;">Your role was updated</h1>
    <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 20px; color: #404040;">
      Hi ${name},
    </p>
    <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 20px; color: #404040;">
      Your CoverDe account role has been updated to <strong>${newRole}</strong>.
    </p>
    <table border="0" cellpadding="0" cellspacing="0" style="margin: 24px 0;">
      <tr>
        <td align="center" bgcolor="#09090b" style="border-radius: 6px;">
          <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://coverde.me'}/dashboard" target="_blank" style="display: inline-block; padding: 12px 24px; font-size: 14px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 6px; background-color: #09090b; border: 1px solid #09090b; letter-spacing: -0.01em;">
            Go to Dashboard
          </a>
        </td>
      </tr>
    </table>
    <p style="margin: 24px 0 0 0; font-size: 13px; line-height: 20px; color: #737373;">
      Thanks,<br>
      The CoverDe Team
    </p>
  `;
  return getBaseTemplate({ title: "Role updated", content });
}
