import { Resend } from "resend";

export async function sendEmail(subject, htmlContent, text) {
  // Fail closed: preview and local forms must never send real messages.
  if (process.env.VERCEL_ENV !== "production") {
    return { success: false, error: "Email delivery is disabled in this working environment." };
  }
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: "mm@mouniamikou.com",
      subject: subject,
      text: text,
      html: htmlContent,
    });

    if (error) {
      console.error("Error sending email:", error);
      return { success: false, error: error.message };
    }

    console.log("Message sent: %s", data.id);
    return { success: true, messageId: data.id };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
}
