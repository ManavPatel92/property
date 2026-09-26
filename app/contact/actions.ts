"use server";

import nodemailer from "nodemailer";

export type ContactFormState = { status: "idle" | "success" | "error"; message: string };

export async function sendContactEmail(_: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const name = String(formData.get("name") || "").trim().slice(0, 120);
  const email = String(formData.get("email") || "").trim().slice(0, 200);
  const message = String(formData.get("message") || "").trim().slice(0, 3000);

  if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please complete all fields with a valid email address." };
  }

  const recipient = process.env.CONTACT_EMAIL;
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  const sender = process.env.SMTP_FROM_EMAIL || user;
  if (!recipient || !host || !user || !password || !sender) {
    console.error("Contact email is not configured.");
    return { status: "error", message: "The contact service is not configured yet." };
  }

  try {
    const transporter = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass: password } });
    await transporter.sendMail({
      from: sender,
      to: recipient,
      replyTo: email,
      subject: `New website enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });
  } catch (error) {
    console.error("Contact email error:", error);
    return { status: "error", message: "We could not send your message. Please try again." };
  }

  return { status: "success", message: "Thanks, your message has been sent." };
}