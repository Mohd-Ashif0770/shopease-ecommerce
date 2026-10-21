
import transporter from "../config/mailer.js";

export const sendOtpEmail = async ({ to, otp, purpose }) => {
  const isRegistration = purpose === "registration";

  const subject = isRegistration
    ? "Verify your ShopEase account"
    : "Reset your ShopEase password";

  const heading = isRegistration
    ? "Verify your email address"
    : "Reset your password";

  const message = isRegistration
    ? "Use the OTP below to verify your email and activate your account."
    : "Use the OTP below to continue resetting your password.";

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 520px; margin: auto; padding: 24px; color: #222;">
      <h2 style="margin-bottom: 24px;">ShopEase</h2>

      <h3>${heading}</h3>

      <p>${message}</p>

      <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px;
                  background: #f4f4f4; padding: 18px; text-align: center;">
        ${otp}
      </div>

      <p>This OTP expires in 5 minutes.</p>

      <p style="color: #666; font-size: 13px;">
        If you did not request this, you can ignore this email.
        Never share this code with anyone.
      </p>
    </div>
  `;

  return transporter.sendMail({
    from: `"ShopEase" <${process.env.SMTP_FROM}>`,
    to,
    subject,
    text: `${heading}. ${message} Your OTP is ${otp}. It expires in 5 minutes.`,
    html,
  });
};
