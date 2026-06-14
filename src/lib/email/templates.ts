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
      <body style="margin: 0; padding: 0; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #09090b; color: #e4e4e7; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 560px; margin: 40px auto; background-color: #121214; border: 1px solid #27272a; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);">
          <!-- Top Accent Line -->
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #6366f1 0%, #a855f7 100%); background-color: #6366f1;"></td>
          </tr>
          <!-- Header -->
          <tr>
            <td style="padding: 32px 32px 24px 32px; border-bottom: 1px solid #1f1f23; text-align: center;">
              <span style="font-size: 24px; font-weight: 800; letter-spacing: -0.04em; color: #ffffff;">
                Cover<span style="color: #6366f1;">De</span>
              </span>
            </td>
          </tr>
          <!-- Body Content -->
          <tr>
            <td style="padding: 40px 32px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 32px; background-color: #09090b; border-top: 1px solid #1f1f23; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #71717a; line-height: 1.5;">
                &copy; ${new Date().getFullYear()} CoverDe. All rights reserved.
              </p>
              <p style="margin: 8px 0 0 0; font-size: 11px; color: #52525b; line-height: 1.4;">
                This is an automated system message from CoverDe. Please do not reply directly to this email.
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
    <div style="margin-bottom: 24px;">
      <span style="display: inline-block; padding: 4px 12px; font-size: 12px; font-weight: 500; color: #6366f1; background-color: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.2); border-radius: 9999px;">
        Security Notice
      </span>
    </div>
    <h2 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em;">Reset Your Password</h2>
    <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 24px; color: #a1a1aa;">
      Hi ${name},
    </p>
    <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 24px; color: #a1a1aa;">
      We received a request to reset the password for your <strong>CoverDe</strong> account. Click the button below to secure your account and set a new password. This link is valid for <strong>1 hour</strong>.
    </p>
    <table border="0" cellpadding="0" cellspacing="0" style="margin: 32px 0; width: 100%;">
      <tr>
        <td align="center">
          <a href="${url}" target="_blank" style="display: inline-block; padding: 14px 32px; font-size: 14px; font-weight: 600; color: #ffffff; background-color: #6366f1; text-decoration: none; border-radius: 8px; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);">
            Reset Password
          </a>
        </td>
      </tr>
    </table>
    <div style="margin: 24px 0; padding: 16px; background-color: #18181b; border: 1px solid #27272a; border-radius: 8px;">
      <p style="margin: 0; font-size: 12px; line-height: 18px; color: #71717a;">
        <strong>If you did not request this:</strong> You can safely ignore this email. Your password will remain unchanged, and your account is secure.
      </p>
    </div>
    <p style="margin: 24px 0 0 0; font-size: 12px; line-height: 20px; color: #52525b; border-top: 1px solid #1f1f23; padding-top: 24px;">
      Button not working? Copy and paste this link into your browser:<br>
      <a href="${url}" target="_blank" style="color: #6366f1; text-decoration: none; word-break: break-all;">${url}</a>
    </p>
  `;
  return getBaseTemplate({ title: "Reset Password - CoverDe", content });
}

export function getWelcomeTemplate(name: string): string {
  const content = `
    <div style="margin-bottom: 24px;">
      <span style="display: inline-block; padding: 4px 12px; font-size: 12px; font-weight: 500; color: #a855f7; background-color: rgba(168, 85, 247, 0.1); border: 1px solid rgba(168, 85, 247, 0.2); border-radius: 9999px;">
        Welcome onboard
      </span>
    </div>
    <h2 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em;">Welcome to CoverDe!</h2>
    <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 24px; color: #a1a1aa;">
      Hi ${name},
    </p>
    <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 24px; color: #a1a1aa;">
      Your account has been successfully created. With <strong>CoverDe</strong>, you can now design and generate professional lab reports, cover pages, and indexes in seconds.
    </p>
    <table border="0" cellpadding="0" cellspacing="0" style="margin: 32px 0; width: 100%;">
      <tr>
        <td align="center">
          <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://coverde.me'}/dashboard" target="_blank" style="display: inline-block; padding: 14px 32px; font-size: 14px; font-weight: 600; color: #ffffff; background-color: #6366f1; text-decoration: none; border-radius: 8px; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);">
            Go to Dashboard
          </a>
        </td>
      </tr>
    </table>
    <p style="margin: 24px 0 0 0; font-size: 12px; line-height: 20px; color: #71717a;">
      We're excited to help you save time and create stunning documents.
    </p>
  `;
  return getBaseTemplate({ title: "Welcome to CoverDe", content });
}

export function getRolePromotionTemplate(name: string, newRole: string): string {
  const content = `
    <div style="margin-bottom: 24px;">
      <span style="display: inline-block; padding: 4px 12px; font-size: 12px; font-weight: 500; color: #10b981; background-color: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 9999px;">
        Account Update
      </span>
    </div>
    <h2 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em;">Role Upgraded</h2>
    <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 24px; color: #a1a1aa;">
      Hi ${name},
    </p>
    <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 24px; color: #a1a1aa;">
      Your account permissions have been upgraded. Your new role is now <strong style="color: #10b981;">${newRole}</strong>.
    </p>
    <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 24px; color: #a1a1aa;">
      Log in to see your updated privileges and access administrative options.
    </p>
    <table border="0" cellpadding="0" cellspacing="0" style="margin: 32px 0; width: 100%;">
      <tr>
        <td align="center">
          <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://coverde.me'}/dashboard" target="_blank" style="display: inline-block; padding: 14px 32px; font-size: 14px; font-weight: 600; color: #ffffff; background-color: #6366f1; text-decoration: none; border-radius: 8px; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);">
            Go to Dashboard
          </a>
        </td>
      </tr>
    </table>
  `;
  return getBaseTemplate({ title: "Account Role Upgraded - CoverDe", content });
}
