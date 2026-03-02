import { ContactForm } from "@/components/sections/contact/contact-form";

export const metadata = {
  title: "Contact | Flo Mobility",
  description:
    "Get in touch with Flo Mobility for autonomous robotic solutions and partnerships.",
};

const CONTACT_DETAILS = [
  {
    label: "Call or WhatsApp",
    value: "+91 8446614346",
    href: "https://wa.me/918446614346",
  },
  {
    label: "Email Us",
    value: "contact@flomobility.com",
    href: "mailto:contact@flomobility.com",
  },
  {
    label: "Headquarters",
    value: "HSR Layout, Bengaluru, Karnataka, India",
    href: "https://maps.google.com/?q=HSR+Layout,+Bengaluru,+India",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#fdfcf0] py-24 lg:py-32">
      <div className="container mx-auto px-4 max-w-6xl">

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-stretch">

          {/* Left — cream, 2/5 */}
          <div className="lg:col-span-2 space-y-10">

            {/* Badge */}
            <div className="inline-block rounded-full bg-white px-4 py-1.5 text-xs font-semibold tracking-wider text-gray-600 border border-gray-200 uppercase shadow-sm">
              Contact Us
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1
                className="text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl text-balance"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Get in Touch
              </h1>
              <p className="text-gray-600 text-sm leading-relaxed">
                Whether you have questions about our autonomous solutions or want
                to discuss a partnership, our team is ready to help.
              </p>
            </div>

            {/* Prefer to talk first */}
            <div className="space-y-2">
              <p
                className="text-sm font-medium text-gray-900"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Prefer to talk first?
              </p>
              <p className="text-gray-500 text-xs leading-relaxed">
                Reach our team directly — we&apos;re happy to answer your
                questions before you fill out the form.
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-0 divide-y divide-gray-100 border-y border-gray-100">
              {CONTACT_DETAILS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-5 group"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                    {item.label}
                  </p>
                  <p className="text-sm font-medium text-gray-900 group-hover:text-[#5ba83d] transition-colors duration-200">
                    {item.value}
                  </p>
                </a>
              ))}
            </div>

          </div>

          {/* Right — dark green form, 3/5 */}
          <div className="lg:col-span-3 flex flex-col">
            <ContactForm />
          </div>

        </div>
      </div>
    </main>
  );
}
