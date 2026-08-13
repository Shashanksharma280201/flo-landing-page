# Landing Page Changes Made This Session

This document lists all changes made in the `landing-page` repo during this session.

## 1. Static Export Image Compatibility

File:
- [next.config.ts](/home/brijesh/code/flo/landing-page/next.config.ts)

Change:
- Added `images.unoptimized = true`.

Reason:
- `output: "export"` does not support the default `next/image` optimization path.

## 2. Removed Frontend Server Action Form Handling

Deleted file:
- [src/app/actions/form-actions.ts](/home/brijesh/code/flo/landing-page/src/app/actions/form-actions.ts)

Related file:
- [package.json](/home/brijesh/code/flo/landing-page/package.json)

Changes:
- Removed the frontend Server Action used for contact, careers, and channel-partner form submission.
- Removed `nodemailer` and `@types/nodemailer` from `package.json`.

Reason:
- Static export cannot use Server Actions.
- Email sending was moved to the backend (`mission-control`).

## 3. Contact Form Migrated To Client-Side Fetch

File:
- [src/components/sections/contact/contact-form.tsx](/home/brijesh/code/flo/landing-page/src/components/sections/contact/contact-form.tsx)

Changes:
- Removed `useActionState`, `useFormStatus`, and the `submitFormAction` import.
- Added client-side `fetch` submission to:
  - `${NEXT_PUBLIC_MISSION_CONTROL_API_URL}/api/public/forms/contact`
  - fallback: `/api/public/forms/contact`
- Kept the existing enquiry validation UI.
- Kept the existing success and error UI.
- Added local pending state for submit button behavior.
- Fixed async form handling by capturing the form element before `await`.
- Added a defensive check so `{ success: false }` in a `200` response is still treated as an error.

Reason:
- Remove Server Actions.
- Fix the frontend bug where a successful backend response could still fall into the generic failure state because `e.currentTarget.reset()` was used after an async boundary.

## 4. Careers Form Migrated To Client-Side Fetch

File:
- [src/app/careers/page.tsx](/home/brijesh/code/flo/landing-page/src/app/careers/page.tsx)

Changes:
- Removed `useActionState`, `useFormStatus`, and the `submitFormAction` import.
- Added local submission state:
  - `isSubmitting`
  - `successMessage`
  - `errorMessage`
- Switched form submission to client-side `fetch` using `FormData`.
- Endpoint used:
  - `${NEXT_PUBLIC_MISSION_CONTROL_API_URL}/api/public/forms/careers`
- Preserved the existing UI structure and success/error messaging.
- Uses `const form = event.currentTarget` before `await`, then `form.reset()`.
- Added a defensive check so `{ success: false }` in a `200` response is treated as an error.

Reason:
- Remove Server Actions and make careers submission static-export compatible.

## 5. Channel Partner Form Migrated To Client-Side Fetch

File:
- [src/app/channel-partner/page.tsx](/home/brijesh/code/flo/landing-page/src/app/channel-partner/page.tsx)

Changes:
- Removed `useActionState`, `useFormStatus`, and the `submitFormAction` import.
- Added local submission state:
  - `isSubmitting`
  - `successMessage`
  - `errorMessage`
- Switched form submission to client-side `fetch` using JSON.
- Endpoint used:
  - `${NEXT_PUBLIC_MISSION_CONTROL_API_URL}/api/public/forms/partner`
- Preserved the existing UI structure and success/error messaging.
- Uses `const form = event.currentTarget` before `await`, then `form.reset()`.
- Added a defensive check so `{ success: false }` in a `200` response is treated as an error.

Reason:
- Remove Server Actions and make partner submission static-export compatible.

## 6. Removed ISR From Blog Pages

Files:
- [src/app/blogs/page.tsx](/home/brijesh/code/flo/landing-page/src/app/blogs/page.tsx)
- [src/app/blogs/[slug]/page.tsx](/home/brijesh/code/flo/landing-page/src/app/blogs/%5Bslug%5D/page.tsx)

Changes:
- Removed `export const revalidate = 60` from both files.

Reason:
- ISR is not supported with `output: "export"`.
- Blog pages were kept as build-time static generation using Mongo during build.

## 7. Unified Frontend Backend Base URL

Files:
- [src/components/sections/contact/contact-form.tsx](/home/brijesh/code/flo/landing-page/src/components/sections/contact/contact-form.tsx)
- [src/app/careers/page.tsx](/home/brijesh/code/flo/landing-page/src/app/careers/page.tsx)
- [src/app/channel-partner/page.tsx](/home/brijesh/code/flo/landing-page/src/app/channel-partner/page.tsx)

Change:
- Standardized the public backend base URL env var to:
  - `NEXT_PUBLIC_MISSION_CONTROL_API_URL`

Reason:
- Different frontend files had drifted to different env var names during the initial migration.

## 8. Follow-Up Debugging Fixes

File:
- [src/components/sections/contact/contact-form.tsx](/home/brijesh/code/flo/landing-page/src/components/sections/contact/contact-form.tsx)

Changes:
- Fixed the async event object usage bug after debugging the case where:
  - backend returned `200 OK`
  - backend response body was success
  - frontend still showed the generic failure message

Root cause:
- The code used `e.currentTarget.reset()` after `await`.

Fix:
- Store `const form = e.currentTarget` before any async boundary and call `form.reset()` later.

Additional consistency fix:
- Added the same `success === false` defensive handling pattern to careers and channel-partner.

## 9. Backend Contract And Payload Shape

This section is written as if the form integration had to be recreated from scratch.

The landing page no longer sends email itself.
It sends HTTP requests to `mission-control`, and `mission-control` is responsible for:

- validating input
- accepting files where needed
- queueing email work
- returning a stable JSON response

### Backend Base URL

All frontend form requests are built from:

- `NEXT_PUBLIC_MISSION_CONTROL_API_URL`

Example:

```env
NEXT_PUBLIC_MISSION_CONTROL_API_URL=https://fleet.flomobility.com
```

The frontend then calls:

- `/api/public/forms/contact`
- `/api/public/forms/partner`
- `/api/public/forms/careers`

### General Response Contract

All form endpoints are expected to return JSON with this minimum shape:

```ts
type PublicFormResponse = {
  success: boolean;
  message: string;
};
```

Frontend handling rules:

1. If HTTP status is not `2xx`, treat it as failure.
2. Even if HTTP status is `2xx`, if `success === false`, still treat it as failure.
3. Use `message` for the user-facing success or error text.

### Contact Form Contract

#### Frontend endpoint

- `POST {NEXT_PUBLIC_MISSION_CONTROL_API_URL}/api/public/forms/contact`

#### Content type

- `application/json`

#### Request shape

```ts
type ContactFormPayload = {
  formType: "contact";
  name: string;
  email: string;
  phone: string;
  enquiryType: "mmr" | "fleet" | "lawn" | "other" | string;
  message: string;
};
```

#### Field notes

- `formType`
  - constant string: `"contact"`
  - not strictly required by the backend handler today, but included intentionally
- `name`
  - required
- `email`
  - required
  - must be valid email format
- `phone`
  - optional
- `enquiryType`
  - required by frontend UX
  - valid known values:
    - `"mmr"`
    - `"fleet"`
    - `"lawn"`
    - `"other"`
- `message`
  - required when `enquiryType === "other"`
  - optional for product-specific enquiries (`mmr`, `fleet`, `lawn`)

#### Example request

```json
{
  "formType": "contact",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+91 9876543210",
  "enquiryType": "fleet",
  "message": "We want to understand fleet monitoring for 12 robots."
}
```

#### Expected success response

```json
{
  "success": true,
  "message": "Thank you. Your message has been sent successfully."
}
```

#### Expected failure response

```json
{
  "success": false,
  "message": "Please fill in the required contact fields."
}
```

### Partner Form Contract

#### Frontend endpoint

- `POST {NEXT_PUBLIC_MISSION_CONTROL_API_URL}/api/public/forms/partner`

#### Content type

- `application/json`

#### Request shape

```ts
type PartnerFormPayload = {
  formType: "partner";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  partnerType: string;
  message: string;
};
```

#### Field notes

- `formType`
  - constant string: `"partner"`
- `firstName`
  - required
- `lastName`
  - required
- `email`
  - required
  - must be valid email format
- `phone`
  - optional
- `company`
  - currently sent by frontend
  - should be treated as required in practice because the form requires it
- `partnerType`
  - required
  - current frontend options:
    - `"Referral Partner"`
    - `"System Integrator"`
    - `"Reseller Partner"`
    - `"Other"`
- `message`
  - required by frontend UX

#### Example request

```json
{
  "formType": "partner",
  "firstName": "Ravi",
  "lastName": "Shah",
  "email": "ravi@partnerco.com",
  "phone": "+91 9123456789",
  "company": "PartnerCo",
  "partnerType": "System Integrator",
  "message": "We want to explore integrating Flo robots into our site automation offering."
}
```

#### Expected success response

```json
{
  "success": true,
  "message": "Thank you. Your application has been submitted successfully."
}
```

#### Expected failure response

```json
{
  "success": false,
  "message": "Please fill in the required partner fields."
}
```

### Careers Form Contract

#### Frontend endpoint

- `POST {NEXT_PUBLIC_MISSION_CONTROL_API_URL}/api/public/forms/careers`

#### Content type

- `multipart/form-data`

This is important:
- careers is not JSON
- it must be submitted as `FormData`
- the resume file must be attached under the field name `resume`

#### Request shape

Represented conceptually:

```ts
type CareersFormFields = {
  formType: "careers";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  message: string;
};

type CareersFormUpload = {
  resume: File;
};
```

Actual browser submission:

```ts
const formData = new FormData();
formData.append("formType", "careers");
formData.append("firstName", "Jane");
formData.append("lastName", "Doe");
formData.append("email", "jane@example.com");
formData.append("phone", "+91 9876543210");
formData.append("role", "Embedded Design Engineer");
formData.append("message", "I have worked on robotics firmware and embedded systems.");
formData.append("resume", fileInput.files[0]);
```

#### Field notes

- `formType`
  - constant string: `"careers"`
- `firstName`
  - required
- `lastName`
  - required
- `email`
  - required
  - must be valid email format
- `phone`
  - optional
- `role`
  - required
- `message`
  - required
- `resume`
  - required file field
  - current backend allows:
    - PDF
    - DOC
    - DOCX
  - current backend limit:
    - 10 MB

#### Example success response

```json
{
  "success": true,
  "message": "Thank you. Your application has been submitted successfully."
}
```

#### Example failure responses

Validation failure:

```json
{
  "success": false,
  "message": "Please fill in the required application fields."
}
```

Invalid file type:

```json
{
  "success": false,
  "message": "Invalid file type. Only PDF, DOC, and DOCX files are allowed."
}
```

### Frontend Submission Rules

If rebuilding this from scratch, follow these rules exactly:

#### Contact

```ts
const response = await fetch(`${API_BASE}/api/public/forms/contact`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),
});
```

#### Partner

```ts
const response = await fetch(`${API_BASE}/api/public/forms/partner`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),
});
```

#### Careers

```ts
const response = await fetch(`${API_BASE}/api/public/forms/careers`, {
  method: "POST",
  body: formData,
});
```

Do not manually set `Content-Type` for `FormData` requests.
The browser must set the multipart boundary automatically.

### Safe Frontend Handling Pattern

When implementing any of these form handlers:

1. Capture the form element before `await`

```ts
const form = event.currentTarget;
```

2. Build request payload from `form`
3. Await `fetch`
4. Parse JSON carefully
5. Treat both of these as failure:
   - `!response.ok`
   - `data.success === false`
6. Only call `form.reset()` after a confirmed success

### Backend Responsibilities

If recreating the backend side, each public handler should do the following:

1. Read request body or uploaded file
2. Normalize and trim strings
3. Validate required fields
4. Validate email format
5. Validate file type/size for careers
6. Build a subject/body/html payload
7. Queue an email job
8. Return JSON `{ success, message }`

### Backend Email Queue Contract

The public form controller queues jobs with this shape:

```ts
type PublicFormEmailJob = {
  to: string;
  subject: string;
  body: string;
  text: string;
  html: string;
  attachments?: Array<{
    filename: string;
    content: string;      // base64
    contentType: string;
    encoding: "base64";
  }>;
};
```

For careers:
- the uploaded resume file is converted to base64
- passed into the queue
- decoded back into `Buffer` in the email worker

### Environment Variables Involved

Frontend:

- `NEXT_PUBLIC_MISSION_CONTROL_API_URL`

Backend:

- `PUBLIC_FORMS_ALLOWED_ORIGINS`
- `PUBLIC_FORMS_RECEIVER_EMAIL`
- `RECEIVER_EMAIL`
- `GMAIL_SERVICE_CLIENT`
- `GMAIL_PRIVATE_KEY`

### Practical Build-From-Scratch Checklist

If someone had to redo this integration from zero, the minimum checklist is:

1. Add backend public routes under `/api/public/forms/*`
2. Return JSON with `success` and `message`
3. Use JSON for contact/partner
4. Use `FormData` for careers
5. Send careers resume under field name `resume`
6. On the frontend, do not use Server Actions
7. Capture the form before `await`
8. Treat `!response.ok` and `success === false` as failure
9. Reset the form only after success
10. Configure `NEXT_PUBLIC_MISSION_CONTROL_API_URL`

## Summary

Files changed in `landing-page` during this session:

- [next.config.ts](/home/brijesh/code/flo/landing-page/next.config.ts)
- [package.json](/home/brijesh/code/flo/landing-page/package.json)
- [src/app/blogs/page.tsx](/home/brijesh/code/flo/landing-page/src/app/blogs/page.tsx)
- [src/app/blogs/[slug]/page.tsx](/home/brijesh/code/flo/landing-page/src/app/blogs/%5Bslug%5D/page.tsx)
- [src/app/careers/page.tsx](/home/brijesh/code/flo/landing-page/src/app/careers/page.tsx)
- [src/app/channel-partner/page.tsx](/home/brijesh/code/flo/landing-page/src/app/channel-partner/page.tsx)
- [src/components/sections/contact/contact-form.tsx](/home/brijesh/code/flo/landing-page/src/components/sections/contact/contact-form.tsx)
- [src/app/actions/form-actions.ts](/home/brijesh/code/flo/landing-page/src/app/actions/form-actions.ts) (deleted)
