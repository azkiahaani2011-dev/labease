import { SeoPageLayout, useSEO, SectionHeading, InfoTable, FAQ, NormalRangeBox } from "./SeoLayout";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalWebPage",
      name: "Dengue Test – NS1 Antigen & IgM IgG | Results | LabEase",
      description:
        "Book Dengue NS1 test from ₹499. Types of dengue tests, when to test, what results mean.",
      medicalAudience: "Patient",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Which dengue test is most accurate?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "NS1 antigen test is the most accurate for early detection (days 1–5 of fever). IgM antibody test is best from day 5 onwards.",
          },
        },
      ],
    },
  ],
};

export default function DengueTest({ navTo }) {
  useSEO({
    title: "Dengue Test – NS1 Antigen & IgM IgG | Results | LabEase",
    description:
      "Book Dengue NS1 test from ₹499. Types of dengue tests, when to test, what results mean. Fast 6-hour results. Home collection available.",
    schema,
  });

  return (
    <SeoPageLayout navTo={navTo} breadcrumb="Dengue Test">
      {/* Urgent Warning Banner */}
      <div
        style={{
          background: "#FFFBEB",
          border: "1px solid #FCD34D",
          borderRadius: 12,
          padding: "14px 16px",
          marginTop: 16,
          marginBottom: 4,
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
        }}
      >
        <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>⚠️</span>
        <p style={{ margin: 0, color: "#92400E", fontWeight: 600, fontSize: "0.93rem", lineHeight: 1.5 }}>
          If you have sudden high fever with severe headache or joint pain — book a dengue test
          immediately. Early detection can prevent serious complications.
        </p>
      </div>

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
        Dengue Test (NS1, IgM, IgG) – When to Test &amp; What Results Mean
      </h1>
      <p style={{ color: "#6B7280", fontSize: "0.92rem", marginBottom: 20 }}>
        Starting from ₹499 · 6-hour results · Home collection available
      </p>

      {/* Section 1 */}
      <SectionHeading>Types of Dengue Tests</SectionHeading>
      <InfoTable
        rows={[
          ["Test", "Detects", "Best Day to Test", "Report Time"],
          ["NS1 Antigen", "Dengue virus protein (early infection)", "Day 1–5 of fever", "4–6 hours"],
          ["IgM Antibody", "Early immune response to dengue", "Day 5–14 of fever", "6–8 hours"],
          ["IgG Antibody", "Past dengue infection / second infection", "Day 7 onwards", "6–8 hours"],
          ["Dengue NS1 + IgM + IgG (Combo)", "All phases — best for any stage", "Any day of fever", "6–8 hours"],
          ["CBC (Platelet Count)", "Platelet drop — dengue severity marker", "Throughout illness", "4–6 hours"],
        ]}
      />

      {/* Section 2 */}
      <SectionHeading>Which Dengue Test Should I Book?</SectionHeading>
      <ul style={{ color: "#374151", lineHeight: 1.8, paddingLeft: 22, marginBottom: 16 }}>
        <li>
          <strong>Fever for 1–5 days:</strong> Book the <strong>NS1 Antigen test</strong>. This
          detects the dengue virus protein at its peak concentration in the early phase and is
          the most accurate test during the first five days of symptoms.
        </li>
        <li>
          <strong>Fever for 5 days or more:</strong> Book the <strong>IgM + IgG Antibody test</strong>.
          By this time, NS1 levels drop and the body's immune response (antibodies) is detectable.
        </li>
        <li>
          <strong>Unsure how many days:</strong> Book the <strong>Dengue Combo test (NS1 + IgM + IgG)</strong>.
          This covers all stages and gives the most comprehensive result regardless of when symptoms started.
          Also book a <strong>CBC</strong> alongside to monitor your platelet count.
        </li>
      </ul>

      {/* Section 3 */}
      <SectionHeading>How to Interpret Dengue Test Results</SectionHeading>
      <div
        style={{
          background: "#EFF6FF",
          border: "1px solid #BFDBFE",
          borderRadius: 12,
          padding: 16,
          marginBottom: 20,
        }}
      >
        <p style={{ fontWeight: 800, color: "#1158A6", marginBottom: 10, fontSize: "0.95rem" }}>
          Result Interpretation Guide
        </p>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
          <tbody>
            {[
              ["NS1 Positive", "Active dengue infection — confirmed. Begin treatment protocol."],
              ["NS1 Negative", "Dengue unlikely in early phase OR test done too late. Do IgM test."],
              ["IgM Positive", "Current or recent dengue infection (within 3 months)."],
              ["IgM Negative + IgG Positive", "Past dengue infection (secondary exposure possible)."],
              ["IgM + IgG Both Positive", "Secondary dengue infection — monitor closely, higher risk."],
              ["All Negative", "Dengue unlikely, but retest if fever persists. Other causes to rule out."],
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: i < 5 ? "1px solid #BFDBFE" : "none" }}>
                <td style={{ padding: "7px 10px", color: "#1158A6", fontWeight: 700, whiteSpace: "nowrap" }}>
                  {row[0]}
                </td>
                <td style={{ padding: "7px 10px", color: "#374151" }}>{row[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 4 */}
      <SectionHeading>Symptoms – When to Get Tested</SectionHeading>
      <div
        style={{
          background: "#fff",
          border: "1px solid #E5E7EB",
          borderRadius: 14,
          padding: 16,
          marginBottom: 12,
        }}
      >
        <p style={{ fontWeight: 700, color: "#0D1117", marginBottom: 8, fontSize: "0.93rem" }}>
          🤒 Classic Dengue Symptoms
        </p>
        <ul style={{ color: "#374151", lineHeight: 1.75, paddingLeft: 20, margin: 0 }}>
          <li>Sudden high fever (39–40°C / 102–104°F)</li>
          <li>Severe headache, especially behind the eyes</li>
          <li>Intense joint and muscle pain ("breakbone fever")</li>
          <li>Skin rash (appears after 2–5 days of fever)</li>
          <li>Nausea, vomiting, and loss of appetite</li>
          <li>Fatigue and body weakness</li>
        </ul>
      </div>
      <div
        style={{
          background: "#FEF2F2",
          border: "1px solid #FECACA",
          borderRadius: 14,
          padding: 16,
          marginBottom: 16,
        }}
      >
        <p style={{ fontWeight: 700, color: "#DC2626", marginBottom: 8, fontSize: "0.93rem" }}>
          🚨 Warning Signs — Seek Hospital Care Immediately
        </p>
        <ul style={{ color: "#7F1D1D", lineHeight: 1.75, paddingLeft: 20, margin: 0 }}>
          <li>Severe abdominal pain or tenderness</li>
          <li>Persistent vomiting (3 or more times in 24 hours)</li>
          <li>Bleeding from nose, gums, or in urine/stool</li>
          <li>Rapid breathing or difficulty breathing</li>
          <li>Feeling of restlessness or severe fatigue/lethargy</li>
          <li>Blood in vomit or black tarry stools</li>
          <li>Platelet count below 50,000/µL</li>
        </ul>
      </div>

      {/* Section 5 */}
      <SectionHeading>Platelet Count in Dengue</SectionHeading>
      <InfoTable
        rows={[
          ["Platelet Count", "Status"],
          ["Above 1.5 lakh/µL (150,000)", "Normal — No concern"],
          ["1.0–1.5 lakh/µL", "Mildly low — Monitor daily"],
          ["50,000–1.0 lakh/µL", "Low — Home rest, strict monitoring, doctor review"],
          ["20,000–50,000/µL", "Critically low — Hospital admission likely needed"],
          ["Below 20,000/µL", "Severe — Emergency; platelet transfusion may be required"],
        ]}
      />

      {/* Section 6 */}
      <SectionHeading>Do's and Don'ts at Home</SectionHeading>
      <div
        style={{
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          marginBottom: 16,
        }}
      >
        <div
          style={{
            flex: "1 1 250px",
            background: "#F0FDF4",
            border: "1px solid #BBF7D0",
            borderRadius: 12,
            padding: 16,
          }}
        >
          <p style={{ fontWeight: 700, color: "#166534", marginBottom: 8, fontSize: "0.93rem" }}>
            ✅ Do
          </p>
          <ul style={{ color: "#374151", lineHeight: 1.8, paddingLeft: 18, margin: 0, fontSize: "0.9rem" }}>
            <li>Rest completely — avoid physical exertion</li>
            <li>Drink plenty of fluids: water, ORS, coconut water, fresh juices</li>
            <li>Take Paracetamol only for fever (as prescribed)</li>
            <li>Monitor platelet count daily from day 3–7</li>
            <li>Eat light, easily digestible meals</li>
            <li>Use mosquito repellent and sleep under a net</li>
          </ul>
        </div>
        <div
          style={{
            flex: "1 1 250px",
            background: "#FEF2F2",
            border: "1px solid #FECACA",
            borderRadius: 12,
            padding: 16,
          }}
        >
          <p style={{ fontWeight: 700, color: "#DC2626", marginBottom: 8, fontSize: "0.93rem" }}>
            ❌ Don't
          </p>
          <ul style={{ color: "#374151", lineHeight: 1.8, paddingLeft: 18, margin: 0, fontSize: "0.9rem" }}>
            <li>Take Aspirin or Ibuprofen (NSAIDS) — increases bleeding risk</li>
            <li>Ignore warning signs or delay hospitalisation</li>
            <li>Take antibiotics — dengue is viral, antibiotics don't help</li>
            <li>Exercise or do strenuous activity</li>
            <li>Eat heavy or oily foods</li>
            <li>Stop monitoring platelet count if fever subsides</li>
          </ul>
        </div>
      </div>

      {/* Section 7 */}
      <SectionHeading>Frequently Asked Questions</SectionHeading>
      <FAQ
        items={[
          {
            q: "Which dengue test is most accurate?",
            a: "NS1 antigen test is the most accurate for the first 5 days of fever — it detects the dengue virus protein directly and has very high sensitivity during this phase. From day 5 onwards, IgM antibody test is more accurate. The Dengue Combo test (NS1 + IgM + IgG) is the most comprehensive option covering all phases.",
          },
          {
            q: "When should I get a dengue test?",
            a: "Get tested as soon as you develop sudden high fever (above 38.5°C) along with any combination of: severe headache, eye pain, joint or muscle pain, or rash. Do not wait for all symptoms — early testing on day 1–2 allows for the NS1 test when it's most accurate.",
          },
          {
            q: "What is a safe platelet count in dengue?",
            a: "Normal platelet count is 1.5–4.0 lakh/µL. In dengue, a count above 1.0 lakh (100,000) is considered manageable with home care and daily monitoring. Below 50,000 is dangerous and below 20,000 is a medical emergency requiring immediate hospitalisation and possible platelet transfusion.",
          },
          {
            q: "Can dengue be treated at home?",
            a: "Mild dengue can be managed at home with rest, adequate hydration, Paracetamol for fever, and daily platelet monitoring. However, hospitalisation is required if platelet count drops below 50,000, warning signs appear (vomiting, bleeding, breathing difficulty), or the patient cannot maintain adequate oral fluid intake.",
          },
          {
            q: "How long does dengue fever last?",
            a: "Dengue fever typically lasts 5–7 days. Fever peaks in the first 2–3 days, then may temporarily subside before returning (the 'saddle-back' pattern). The critical phase for platelet drop usually occurs between days 4–6 when fever may actually decrease. Post-dengue fatigue and weakness can persist for 2–4 weeks.",
          },
          {
            q: "Can dengue spread from person to person?",
            a: "No. Dengue does not spread directly from person to person. It spreads only through the bite of the Aedes aegypti mosquito, which bites an infected person and then bites another person, transmitting the virus. Dengue cannot spread through touch, coughing, sneezing, or sharing food. Mosquito control is the key prevention measure.",
          },
        ]}
      />
    </SeoPageLayout>
  );
}
