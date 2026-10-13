
import dotenv from "dotenv";
import transporter from "./config/mailer.js";

dotenv.config();

try {
  const info = await transporter.sendMail({
    from: `"ShopSphere" <${process.env.SMTP_FROM}>`,
    to: process.env.SMTP_USER,
    subject: "ShopSphere SMTP Test",
    text: "Your ShopSphere email configuration is working.",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>ShopSphere</h2>
        <p>Your Gmail SMTP configuration is working.</p>
        <p>You can now integrate email OTP verification.</p>
      </div>
    `,
  });

  console.log("Test email sent:", info.messageId);
} catch (error) {
  console.error("Email sending failed:", error.message);
} finally {
  transporter.close();
}
