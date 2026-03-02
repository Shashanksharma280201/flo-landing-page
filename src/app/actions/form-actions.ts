"use server";

import nodemailer from "nodemailer";

interface FormState {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

export async function submitFormAction(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const formType = (formData.get("formType") as string) || "contact";
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;
  const role = formData.get("role") as string;
  const company = formData.get("company") as string;
  const partnerType = formData.get("partnerType") as string;
  const resume = formData.get("resume") as File | null;

  // Basic Validation
  if (!firstName || !lastName || !email || !message) {
    return {
      success: false,
      message: "Please fill in all required fields.",
    };
  }

  // 2. Setup Nodemailer Transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const receiverEmail = process.env.RECEIVER_EMAIL || "contact@flomobility.com";
  const senderEmail = process.env.SENDER_EMAIL || process.env.SMTP_USER;

  const isCareers = formType === "careers";
  const isPartner = formType === "partner";
  const subject = isCareers
    ? `New Job Application: ${role} - ${firstName} ${lastName}`
    : isPartner
      ? `New Partner Application: ${partnerType || "General"} - ${firstName} ${lastName} (${company || "N/A"})`
      : `New Contact Form Submission: ${firstName} ${lastName}`;

  const attachments = [];
  if (isCareers && resume && resume.size > 0) {
    try {
      const arrayBuffer = await resume.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      attachments.push({
        filename: resume.name,
        content: buffer,
      });
    } catch (err) {
      console.error("Error processing resume attachment:", err);
    }
  }

  const mailOptions: any = {
    from: `"Flo Mobility ${isCareers ? "Careers" : isPartner ? "Partners" : "Contact"}" <${senderEmail}>`,
    to: receiverEmail,
    replyTo: email,
    subject: subject,
    text: `
      ${isCareers ? "New Job Application" : isPartner ? "New Partner Application" : "New Message"} from Flo Mobility Landing Page:

      Name: ${firstName} ${lastName}
      Email: ${email}
      Phone: ${phone || "N/A"}
      ${isCareers ? `Role: ${role}` : ""}
      ${isPartner ? `Company: ${company || "N/A"}` : ""}
      ${isPartner ? `Partner Type: ${partnerType || "N/A"}` : ""}

      Message:
      ${message}
    `,
    html: `
      <h3>${isCareers ? "New Job Application" : isPartner ? "New Partner Application" : "New Message"} from Flo Mobility Landing Page</h3>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "N/A"}</p>
      ${isCareers ? `<p><strong>Role:</strong> ${role}</p>` : ""}
      ${isPartner ? `<p><strong>Company:</strong> ${company || "N/A"}</p>` : ""}
      ${isPartner ? `<p><strong>Partner Type:</strong> ${partnerType || "N/A"}</p>` : ""}
      <br />
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
    attachments: attachments,
  };

  try {
    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: isCareers
        ? "Thank you! Your application has been submitted successfully. Our team will review it and get back to you."
        : "Thank you! Your message has been sent successfully. Our team will get back to you soon.",
    };
  } catch (error: unknown) {
    console.error("Form Action Error (Nodemailer):", error);
    return {
      success: false,
      message: "Failed to send. Please try again later or contact us directly.",
    };
  }
}
