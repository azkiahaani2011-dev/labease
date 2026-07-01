import { SeoPageLayout, useSEO, SectionHeading, InfoTable, FAQ, NormalRangeBox } from "./SeoLayout";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalWebPage",
      name: "CBC Test – Complete Blood Count | Price & Normal Range | LabEase",
      description:
        "Book CBC blood test from ₹249. Know CBC normal range, what it measures, and when doctors order it.",
      medicalAudience: "Patient",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is fasting required for CBC?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. CBC does not require fasting. You can eat and drink normally before the test.",
          },
        },
        {
          "@type": "Question",
          name: "What is CBC test used for?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "CBC is used to detect anaemia, infections, dengue, blood disorders, and for routine health monitoring.",
          },
        },
      ],
    },
  ],
};

export default function CbcTest({ navTo }) {
  useSEO({
    title: "CBC Test – Complete Blood Count | Price & Normal Range | LabEase",
    description:
      "Book CBC blood test from ₹249. Know CBC normal range, what it measures, and when doctors order it. Home collection available. verified labs.",
    schema,
  });

  return (
    <SeoPageLayout navTo={navTo} breadcrumb="CBC Test">
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
        CBC Test (Complete Blood Count) – Normal Range, What It Measures
      </h1>
      <p style={{ color: "#6B7280", fontSize: "0.92rem", marginBottom: 20 }}>
        Starting from ₹249 · No fasting required · Home collection available
      </p>

      {/* Section 1 */}
      <SectionHeading>What Is a CBC Test?</SectionHeading>
      <p style={{ color: "#374151", lineHeight: 1.7, marginBottom: 16 }}>
        A Complete Blood Count (CBC) is one of the most common blood tests ordered by doctors
        worldwide. It provides a comprehensive snapshot of your blood — measuring the three major
        types of cells: red blood cells (which carry oxygen), white blood cells (which fight
        infections), and platelets (which help blood clot). A CBC helps diagnose a wide range of
        conditions from anaemia and infections to blood cancers and dengue fever. It is often the
        first test ordered during a routine health checkup or when you are feeling unwell.
      </p>

      {/* Section 2 */}
      <SectionHeading>What Does CBC Measure?</SectionHeading>
      <InfoTable
        rows={[
          ["Parameter", "What It Measures", "Normal Range"],
          ["Haemoglobin (Hb)", "Oxygen-carrying protein in RBCs", "Men: 13–17 g/dL | Women: 12–15 g/dL"],
          ["RBC Count", "Number of red blood cells", "4.5–5.9 million/µL (men); 4.1–5.1 (women)"],
          ["WBC Count", "Immune cell count (infection marker)", "4,500–11,000 cells/µL"],
          ["Platelet Count", "Blood clotting cells", "1.5–4.0 lakh/µL"],
          ["MCV", "Mean corpuscular volume (RBC size)", "80–100 fL"],
          ["MCH", "Mean corpuscular haemoglobin", "27–33 pg"],
          ["MCHC", "Haemoglobin concentration in RBCs", "32–36 g/dL"],
          ["Neutrophils %", "Main infection-fighting white cells", "40–70% of WBC"],
        ]}
      />

      {/* Section 3 */}
      <SectionHeading>Haemoglobin Normal Range</SectionHeading>
      <NormalRangeBox
        title="Haemoglobin Reference Values"
        rows={[
          ["Men", "13–17 g/dL"],
          ["Women", "12–15 g/dL"],
          ["Children (6–12 yrs)", "11.5–15.5 g/dL"],
          ["Pregnant women", "≥11 g/dL (WHO minimum)"],
        ]}
      />

      {/* Section 4 */}
      <SectionHeading>Why Do Doctors Order CBC?</SectionHeading>
      <ul style={{ color: "#374151", lineHeight: 1.8, paddingLeft: 22, marginBottom: 16 }}>
        <li>
          <strong>Anaemia diagnosis</strong> — Low haemoglobin or RBC count indicates iron
          deficiency, B12 deficiency, or other forms of anaemia.
        </li>
        <li>
          <strong>Infections</strong> — Elevated WBC count signals bacterial or viral infections;
          a differential count identifies the type.
        </li>
        <li>
          <strong>Dengue fever</strong> — A falling platelet count is a hallmark of dengue and
          is tracked daily during the illness.
        </li>
        <li>
          <strong>Blood disorders</strong> — Abnormal cell sizes (MCV/MCH) and counts can
          indicate thalassemia, leukaemia, or bone marrow disorders.
        </li>
        <li>
          <strong>Routine health checkup</strong> — CBC is included in all standard annual
          health packages as a baseline blood profile.
        </li>
      </ul>

      {/* Section 5 */}
      <SectionHeading>Does CBC Require Fasting?</SectionHeading>
      <p style={{ color: "#374151", lineHeight: 1.7, marginBottom: 16 }}>
        <strong>No.</strong> CBC does not require fasting. You can eat and drink normally before
        your blood sample is collected. This makes CBC one of the most convenient tests to do at
        any time of the day. If you are getting CBC along with fasting tests (like blood sugar or
        lipid profile), your phlebotomist will collect all samples together during the morning
        fasting slot.
      </p>

      {/* Section 6 */}
      <SectionHeading>Frequently Asked Questions</SectionHeading>
      <FAQ
        items={[
          {
            q: "What is CBC test used for?",
            a: "CBC is used to evaluate overall health and detect a wide range of disorders including anaemia, infection, dengue fever, blood cancers, clotting problems, and immune system conditions. It is also part of most routine annual health checkups.",
          },
          {
            q: "Is fasting required for CBC?",
            a: "No. You do not need to fast for a CBC test. You can have food, tea, coffee, or any beverage before the test. Only if CBC is combined with fasting glucose or lipid profile will you need to fast.",
          },
          {
            q: "What is the normal CBC range?",
            a: "Key normal values: Haemoglobin 12–17 g/dL (varies by sex), WBC 4,500–11,000/µL, Platelet Count 1.5–4.0 lakh/µL, RBC 4.1–5.9 million/µL. Your lab report will show your personal values alongside reference ranges.",
          },
          {
            q: "How long does it take to get CBC results?",
            a: "CBC results are typically available within 4–6 hours of sample collection when done through home collection with LabEase. In some cases, reports arrive within 2–3 hours. You will receive them via WhatsApp or email.",
          },
          {
            q: "What does low haemoglobin mean?",
            a: "Low haemoglobin (below 12 g/dL in women, below 13 g/dL in men) indicates anaemia. Common causes include iron deficiency, Vitamin B12 or folate deficiency, chronic disease, blood loss, or inherited conditions like thalassemia. A doctor will review your full CBC to identify the cause.",
          },
          {
            q: "Can I book a CBC test at home?",
            a: "Yes. CBC is one of the most commonly done home collection tests. A trained phlebotomist visits your home, collects a small blood sample (usually from your arm vein), and your report is delivered digitally within hours.",
          },
        ]}
      />
    </SeoPageLayout>
  );
}
