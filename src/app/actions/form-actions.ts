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

  // Support both single `name` (contact form) and `firstName` / `lastName` (careers / partner)
  const name      = formData.get("name") as string;
  const firstName = formData.get("firstName") as string;
  const lastName  = formData.get("lastName") as string;
  const fullName  = name || [firstName, lastName].filter(Boolean).join(" ");

  const email        = formData.get("email") as string;
  const phone        = formData.get("phone") as string;
  const message      = formData.get("message") as string;
  const role         = formData.get("role") as string;
  const company      = formData.get("company") as string;
  const partnerType  = formData.get("partnerType") as string;
  const resume       = formData.get("resume") as File | null;
  const enquiryType  = formData.get("enquiryType") as string;
  const enquirySubject = formData.get("enquirySubject") as string;

  // Basic Validation
  // For contact form: message is optional when a specific product is selected
  const isContact = formType === "contact";
  const productSelected = isContact && ["mmr", "fleet", "lawn"].includes(enquiryType);
  const messageRequired = !productSelected;

  if (!fullName || !email || (messageRequired && !message)) {
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

  const ENQUIRY_LABELS: Record<string, string> = {
    mmr:   "Material Mover (AMR)",
    fleet: "Fleet Control",
    lawn:  "Lawn Mower",
    other: "Other",
  };
  const enquiryLabel = enquiryType ? (ENQUIRY_LABELS[enquiryType] ?? enquiryType) : "General";

  const subject = isCareers
    ? `New Job Application: ${role} — ${fullName}`
    : isPartner
      ? `New Partner Application: ${partnerType || "General"} — ${fullName} (${company || "N/A"})`
      : `New Contact: ${enquiryLabel} — ${fullName}`;

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
      ${isCareers ? "New Job Application" : isPartner ? "New Partner Application" : "New Contact Enquiry"} from Flo Mobility Landing Page:

      Name: ${fullName}
      Email: ${email}
      Phone: ${phone || "N/A"}
      ${isCareers ? `Role: ${role}` : ""}
      ${isPartner ? `Company: ${company || "N/A"}` : ""}
      ${isPartner ? `Partner Type: ${partnerType || "N/A"}` : ""}
      ${!isCareers && !isPartner && enquiryType ? `Enquiring About: ${enquiryLabel}` : ""}

      Message:
      ${message || "(No additional message provided)"}
    `,
    html: `
      <h3>${isCareers ? "New Job Application" : isPartner ? "New Partner Application" : "New Contact Enquiry"} from Flo Mobility Landing Page</h3>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "N/A"}</p>
      ${isCareers ? `<p><strong>Role:</strong> ${role}</p>` : ""}
      ${isPartner ? `<p><strong>Company:</strong> ${company || "N/A"}</p>` : ""}
      ${isPartner ? `<p><strong>Partner Type:</strong> ${partnerType || "N/A"}</p>` : ""}
      ${!isCareers && !isPartner && enquiryType ? `<p><strong>Enquiring About:</strong> ${enquiryLabel}</p>` : ""}
      <br />
      <p><strong>Message:</strong></p>
      <p>${message ? message.replace(/\n/g, "<br>") : "<em>(No additional message provided)</em>"}</p>
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
