export const generateEmailTemplate = (resetPasswordUrl: string) => {
  return `
<!DOCTYPE html>
<html>
<body style="margin:0; padding:0; background-color:#f4f4f4;">
  <div style="max-width:600px; margin:30px auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1); font-family:Arial, sans-serif;">

    <!-- Header -->
    <div style="background:#111; padding:20px; text-align:center;">
      <h2 style="color:#ffffff; margin:0;">🔐 Reset Your Password</h2>
    </div>

    <!-- Body -->
    <div style="padding:25px; color:#333;">
      <p style="font-size:16px;">Hi there 👋</p>

      <p style="font-size:15px; line-height:1.6;">
        You requested a password reset. Click the button below to create a new password.
        This link will expire in <strong>15 minutes</strong>.
      </p>

      <!-- Button -->
      <div style="text-align:center; margin:30px 0;">
        <a href="${resetPasswordUrl}"
           style="background:#111; color:#ffffff; padding:12px 28px; text-decoration:none; font-size:16px; font-weight:bold; border-radius:6px; display:inline-block;">
          Reset Password
        </a>
      </div>

      <p style="font-size:14px; color:#666;">
        If you didn’t request this, you can safely ignore this email.
      </p>

      <p style="font-size:14px; color:#666;">
        If the button doesn’t work, copy and paste this link into your browser:
      </p>

      <p style="font-size:13px; color:#111; word-break:break-all; background:#f8f8f8; padding:10px; border-radius:6px;">
        ${resetPasswordUrl}
      </p>
    </div>

    <!-- Footer -->
    <div style="background:#f8f8f8; padding:15px; text-align:center; font-size:13px; color:#888;">
      <p style="margin:0;">— Ecommerce Team</p>
      <p style="margin:5px 0 0;">This is an automated message. Please do not reply.</p>
    </div>

  </div>
</body>
</html>
`;
};
