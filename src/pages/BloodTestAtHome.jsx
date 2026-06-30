import { SeoPageLayout, useSEO, SectionHeading, InfoTable, FAQ, NormalRangeBox } from "./SeoLayout";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalWebPage",
      name: "Blood Test at Home – Easy, Safe & Affordable",
      description:
        "Book a blood test at home with LabEase. NABL-certified labs, trained phlebotomists, same-day reports.",
      url: typeof window !== "undefined" ? window.location.href : "",
      medicalAudience: "Patient",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is there any extra charge for home sample collection?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. LabEase offers free home sample collection for most tests. There are no hidden charges.",
          },
        },
        {
          "@type": "Question",
          name: "How early can I book a morning slot?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can book slots as early as 6:00 AM. Morning slots are recommended for fasting tests.",
          },
        },
      ],
    },
  ],
};

export default function BloodTestAtHome({ navTo }) {
  useSEO({
    title: "Blood Test at Home – Book Home Sample Collection | LabEase",
    description:
      "Book a blood test at home with LabEase. NABL-certified labs, trained phlebotomists, same-day reports. Easy online booking. No extra charges.",
    schema,
  });

  return (
    <SeoPageLayout navTo={navTo} breadcrumb="Blood Test at Home">
      <h1
        style={{
          fontWeight: 800,
          fontSize: "1.65rem",
          color: "#0D1117",
          marginBottom: 8,
          marginTop: 20,
          lineHeight: 1.25,
          fontFamily: "'Manrope', sans-serif",
        }}
      >
        Blood Test at Home – Easy, Safe &amp; Affordable
      </h1>
      <p style={{ color: "#6B7280", fontSize: "0.92rem", marginBottom: 20 }}>
        Home sample collection · NABL-certified labs · Same-day reports
      </p>

      {/* Section 1 */}
      <SectionHeading>What Is a Home Blood Test?</SectionHeading>
      <p style={{ color: "#374151", lineHeight: 1.7, marginBottom: 16 }}>
        A home blood test is exactly what it sounds like — a certified phlebotomist visits your
        home, collects a small blood sample, and the sample is transported to a NABL-accredited
        laboratory for analysis. You receive your report digitally, usually within a few hours.
        It eliminates hospital visits, long queues, and travel stress — making it ideal for
        working professionals, elderly patients, children, and anyone who values convenience.
      </p>

      {/* Section 2 */}
      <SectionHeading>How It Works</SectionHeading>
      <ol style={{ color: "#374151", lineHeight: 1.8, paddingLeft: 24, marginBottom: 16 }}>
        <li style={{ marginBottom: 10 }}>
          <strong>Choose your test</strong> — Browse CBC, thyroid, diabetes, vitamin panels and
          more. Add multiple tests to a single visit.
        </li>
        <li style={{ marginBottom: 10 }}>
          <strong>Pick a slot</strong> — Select a convenient time from 6 AM to 10 AM for fasting
          tests, or any time for non-fasting tests.
        </li>
        <li style={{ marginBottom: 10 }}>
          <strong>Confirm your address</strong> — Enter your home address. Our phlebotomist
          arrives on time with all sterile equipment.
        </li>
        <li style={{ marginBottom: 10 }}>
          <strong>Get your report</strong> — Receive a digital report via WhatsApp or email,
          usually within 4–6 hours of sample collection.
        </li>
      </ol>

      {/* Section 3 */}
      <SectionHeading>Which Tests Can Be Done at Home?</SectionHeading>
      <InfoTable
        rows={[
          ["Test Name", "Purpose", "Report Time"],
          ["CBC (Complete Blood Count)", "Anaemia, infections, blood disorders", "4–6 hours"],
          ["Blood Sugar (Fasting/PP)", "Diabetes screening and monitoring", "2–4 hours"],
          ["HbA1c", "3-month average blood sugar control", "6–8 hours"],
          ["Thyroid Profile (T3, T4, TSH)", "Thyroid function assessment", "6–8 hours"],
          ["Vitamin D (25-OH)", "Bone health, immunity, deficiency check", "24 hours"],
          ["Vitamin B12", "Nerve function, energy levels", "24 hours"],
          ["Lipid Profile", "Cholesterol and heart health", "6–8 hours"],
          ["Dengue NS1 Antigen", "Early dengue fever detection", "4–6 hours"],
        ]}
      />

      {/* Section 4 */}
      <SectionHeading>Is It Safe?</SectionHeading>
      <ul style={{ color: "#374151", lineHeight: 1.8, paddingLeft: 22, marginBottom: 16 }}>
        <li>All partner labs are <strong>NABL-accredited</strong>, ensuring the highest quality standards.</li>
        <li>Phlebotomists are <strong>trained, verified, and background-checked</strong> professionals.</li>
        <li>Only <strong>single-use, sterile needles and vacutainers</strong> are used — never reused.</li>
        <li>Samples are transported in <strong>temperature-controlled bio-safe containers</strong>.</li>
        <li>The entire process follows <strong>WHO blood collection guidelines</strong>.</li>
      </ul>

      {/* Section 5 */}
      <SectionHeading>How to Prepare for Your Blood Test</SectionHeading>
      <div
        style={{
          background: "#fff",
          border: "1px solid #E5E7EB",
          borderRadius: 14,
          padding: 18,
          marginBottom: 16,
        }}
      >
        <p style={{ fontWeight: 700, color: "#0D1117", marginBottom: 8, fontSize: "0.97rem" }}>
          🍽️ Fasting Tests (e.g., Blood Sugar, Lipid Profile, Thyroid)
        </p>
        <ul style={{ color: "#374151", lineHeight: 1.75, paddingLeft: 20, margin: 0 }}>
          <li>Fast for 10–12 hours before the test (only water allowed).</li>
          <li>Schedule a morning slot (6–9 AM) for best results.</li>
          <li>Avoid tea, coffee, juice, or any food during the fasting period.</li>
          <li>Take your regular medications only after the sample is collected, unless instructed otherwise.</li>
        </ul>
      </div>
      <div
        style={{
          background: "#fff",
          border: "1px solid #E5E7EB",
          borderRadius: 14,
          padding: 18,
          marginBottom: 16,
        }}
      >
        <p style={{ fontWeight: 700, color: "#0D1117", marginBottom: 8, fontSize: "0.97rem" }}>
          ☕ Non-Fasting Tests (e.g., CBC, Dengue, Vitamins)
        </p>
        <ul style={{ color: "#374151", lineHeight: 1.75, paddingLeft: 20, margin: 0 }}>
          <li>No special preparation needed — you can eat and drink normally.</li>
          <li>Stay hydrated; drink a glass of water before the collection.</li>
          <li>Wear loose-fitting clothes for easy arm access.</li>
          <li>Inform the phlebotomist of any medications you are currently taking.</li>
        </ul>
      </div>

      {/* Section 6 */}
      <SectionHeading>Frequently Asked Questions</SectionHeading>
      <FAQ
        items={[
          {
            q: "Is there any extra charge for home sample collection?",
            a: "No. LabEase offers free home sample collection for most tests. The price you see includes the lab test fee and home visit. There are no hidden charges or additional fees.",
          },
          {
            q: "How early can I book a morning slot?",
            a: "You can book slots as early as 6:00 AM. Morning slots are especially recommended for fasting blood tests like blood sugar, lipid profile, and thyroid. Booking a day in advance guarantees your preferred time.",
          },
          {
            q: "Is the phlebotomist trained and verified?",
            a: "Yes. All phlebotomists in the LabEase network are certified healthcare professionals with at least 2 years of experience. They undergo background verification and training before being onboarded.",
          },
          {
            q: "Can I book a home blood test for my elderly parent?",
            a: "Absolutely. Home blood collection is particularly beneficial for elderly patients who have difficulty travelling. Our phlebotomists are trained to work with elderly and differently-abled patients with care and patience.",
          },
          {
            q: "Can I book multiple tests in one visit?",
            a: "Yes. You can add multiple tests to a single booking. The phlebotomist will collect all required samples in one visit, saving you time and the discomfort of multiple needle pricks wherever possible.",
          },
          {
            q: "Are the labs NABL-certified?",
            a: "Yes. LabEase partners exclusively with NABL (National Accreditation Board for Testing and Calibration Laboratories) accredited labs. This ensures your reports meet national quality standards and are accepted by all major hospitals and doctors.",
          },
        ]}
      />
    </SeoPageLayout>
  );
}
