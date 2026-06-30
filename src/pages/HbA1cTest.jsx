import { SeoPageLayout, useSEO, SectionHeading, InfoTable, FAQ, NormalRangeBox } from "./SeoLayout";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalWebPage",
      name: "HbA1c Test – Diabetes Blood Test | Normal Range | LabEase",
      description:
        "Book HbA1c test from ₹329. 3-month average blood sugar. Normal range, what levels mean, how to lower HbA1c.",
      medicalAudience: "Patient",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Does HbA1c require fasting?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. HbA1c does not require fasting, which is its key advantage over fasting blood sugar tests.",
          },
        },
      ],
    },
  ],
};

export default function HbA1cTest({ navTo }) {
  useSEO({
    title: "HbA1c Test – Diabetes Blood Test | Normal Range | LabEase",
    description:
      "Book HbA1c test from ₹329. 3-month average blood sugar. Normal range, what levels mean, how to lower HbA1c. No fasting needed. Home collection.",
    schema,
  });

  return (
    <SeoPageLayout navTo={navTo} breadcrumb="HbA1c Test">
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
        HbA1c Test – What It Measures, Normal Range &amp; Diabetes Guide
      </h1>
      <p style={{ color: "#6B7280", fontSize: "0.92rem", marginBottom: 20 }}>
        Starting from ₹329 · No fasting required · Home collection available
      </p>

      {/* Section 1 */}
      <SectionHeading>What Is HbA1c?</SectionHeading>
      <p style={{ color: "#374151", lineHeight: 1.7, marginBottom: 16 }}>
        HbA1c stands for Glycated Haemoglobin — haemoglobin that has sugar (glucose) stuck to
        it. When blood sugar levels are high, glucose molecules attach to haemoglobin (the
        protein inside red blood cells that carries oxygen). Since red blood cells live for
        approximately 3 months, the HbA1c test measures the average blood sugar level over the
        past 2–3 months — unlike a fasting blood sugar test that only shows your glucose level
        at a single moment in time. This makes HbA1c the gold standard for diagnosing diabetes,
        monitoring long-term diabetes control, and assessing the risk of diabetes complications
        like neuropathy, retinopathy, and kidney disease.
      </p>

      {/* Section 2 */}
      <SectionHeading>HbA1c Normal Range</SectionHeading>
      <NormalRangeBox
        title="HbA1c Reference Values (Adults)"
        rows={[
          ["Below 5.7%", "Normal — No diabetes"],
          ["5.7% – 6.4%", "Prediabetes — Higher risk; lifestyle changes needed"],
          ["6.5% and above", "Diabetes — Diagnosis confirmed"],
          ["Below 7.0%", "Well-controlled diabetes (treatment target for most patients)"],
          ["7.0% – 8.0%", "Acceptable control — discuss with doctor"],
          ["Above 8.0%", "Poor control — increased risk of complications"],
        ]}
      />

      {/* Section 3 */}
      <SectionHeading>HbA1c vs Fasting Blood Sugar</SectionHeading>
      <InfoTable
        rows={[
          ["Feature", "HbA1c", "Fasting Blood Sugar (FBS)"],
          ["What it measures", "3-month average blood glucose", "Blood glucose at a single point"],
          ["Fasting required?", "No", "Yes (8–12 hours)"],
          ["Time of day", "Any time", "Morning preferred"],
          ["Affected by recent meals?", "No", "Yes"],
          ["Use for diagnosis", "Yes (≥6.5% = diabetes)", "Yes (≥126 mg/dL = diabetes)"],
          ["Use for monitoring", "Best for long-term control", "Best for day-to-day tracking"],
          ["Affected by stress or illness?", "Less affected", "Highly affected"],
          ["Recommended frequency", "Every 3–6 months in diabetics", "As advised by doctor"],
        ]}
      />

      {/* Section 4 */}
      <SectionHeading>Who Should Get an HbA1c Test?</SectionHeading>
      <ul style={{ color: "#374151", lineHeight: 1.8, paddingLeft: 22, marginBottom: 16 }}>
        <li>Anyone with known <strong>Type 1 or Type 2 diabetes</strong> — to monitor blood sugar control.</li>
        <li>People with <strong>prediabetes</strong> — to track progression and response to lifestyle changes.</li>
        <li>Those with <strong>family history of diabetes</strong> — for early detection screening.</li>
        <li>Individuals with <strong>obesity or overweight</strong> (BMI over 25), especially with abdominal fat.</li>
        <li>Women with a history of <strong>gestational diabetes</strong> (diabetes during pregnancy).</li>
        <li>Anyone with <strong>symptoms</strong> like excessive thirst, frequent urination, unexplained fatigue, or blurry vision.</li>
        <li>Adults above <strong>45 years</strong> — included in annual full body checkup.</li>
      </ul>

      {/* Section 5 */}
      <SectionHeading>How to Lower Your HbA1c</SectionHeading>
      <div
        style={{
          background: "#fff",
          border: "1px solid #E5E7EB",
          borderRadius: 14,
          padding: 18,
          marginBottom: 16,
        }}
      >
        <p style={{ fontWeight: 700, color: "#0D1117", marginBottom: 10, fontSize: "0.95rem" }}>
          🥗 Diet Changes
        </p>
        <ul style={{ color: "#374151", lineHeight: 1.75, paddingLeft: 20, margin: "0 0 14px" }}>
          <li>Replace white rice, bread, and maida with whole grains, millets (jowar, bajra, ragi), and oats.</li>
          <li>Reduce portion sizes and avoid second servings — portion control matters more than elimination.</li>
          <li>Eat more fibre-rich vegetables, legumes (dal, rajma, chickpeas), and low-glycaemic fruits (guava, berries).</li>
          <li>Avoid sugary drinks, packaged juices, sweets, and ultra-processed snack foods.</li>
          <li>Eat at consistent times — don't skip meals, which can cause blood sugar swings.</li>
        </ul>
        <p style={{ fontWeight: 700, color: "#0D1117", marginBottom: 10, fontSize: "0.95rem" }}>
          🏃 Exercise
        </p>
        <ul style={{ color: "#374151", lineHeight: 1.75, paddingLeft: 20, margin: "0 0 14px" }}>
          <li>Aim for at least 150 minutes of moderate exercise per week — brisk walking, cycling, or swimming.</li>
          <li>Resistance training (weights or resistance bands) twice a week improves insulin sensitivity significantly.</li>
          <li>Even a 10-minute walk after each meal helps lower post-meal glucose spikes.</li>
        </ul>
        <p style={{ fontWeight: 700, color: "#0D1117", marginBottom: 10, fontSize: "0.95rem" }}>
          😴 Sleep &amp; Stress
        </p>
        <ul style={{ color: "#374151", lineHeight: 1.75, paddingLeft: 20, margin: 0 }}>
          <li>Aim for 7–9 hours of quality sleep. Poor sleep raises cortisol, which increases blood sugar.</li>
          <li>Practice stress-reduction techniques: yoga, meditation, deep breathing, or spending time outdoors.</li>
          <li>Avoid staying up late — circadian rhythm disruption directly worsens insulin sensitivity.</li>
        </ul>
      </div>

      {/* Section 6 */}
      <SectionHeading>Does HbA1c Require Fasting?</SectionHeading>
      <p style={{ color: "#374151", lineHeight: 1.7, marginBottom: 16 }}>
        <strong>No.</strong> This is the key advantage of the HbA1c test. Because it reflects the
        average blood sugar over the past 2–3 months, it is not affected by what you ate today,
        whether you had breakfast, or the time of day. You can eat normally and get tested at
        any time — morning, afternoon, or evening. This makes it far more convenient than fasting
        blood sugar tests, and also more reliable as it cannot be manipulated by short-term
        fasting before the appointment.
      </p>

      {/* Section 7 */}
      <SectionHeading>Frequently Asked Questions</SectionHeading>
      <FAQ
        items={[
          {
            q: "What is HbA1c used for?",
            a: "HbA1c is used to diagnose diabetes (≥6.5%), identify prediabetes (5.7–6.4%), and monitor blood sugar control in people already diagnosed with diabetes. It reflects average blood glucose over 2–3 months and is the most reliable single test for diabetes management.",
          },
          {
            q: "What is the normal HbA1c level?",
            a: "Below 5.7% is normal. Between 5.7–6.4% indicates prediabetes. 6.5% or above confirms diabetes. For people already on diabetes treatment, the target is usually below 7% (or below 7.5–8% for the elderly or those with other conditions, as advised by their doctor).",
          },
          {
            q: "Does HbA1c require fasting?",
            a: "No. This is one of HbA1c's biggest advantages. You do not need to fast — you can eat, drink, and take medications normally before the test. The test measures your 3-month average, so a meal eaten that morning has no effect on the result.",
          },
          {
            q: "How often should HbA1c be tested?",
            a: "For people with diabetes: every 3 months if blood sugar is poorly controlled or medications were recently changed; every 6 months if well-controlled. For prediabetes: annually. For general screening in high-risk individuals (overweight, family history): once a year as part of an annual checkup.",
          },
          {
            q: "What is a dangerous HbA1c level?",
            a: "An HbA1c above 9% indicates very poor diabetes control and significant risk of complications including kidney damage, eye disease, nerve damage, and cardiovascular disease. Levels above 10–12% require urgent medical attention and likely hospitalisation to stabilise blood sugar safely.",
          },
          {
            q: "How quickly can HbA1c be reduced?",
            a: "Because HbA1c reflects 3 months of blood sugar history, it takes at least 3 months to see a significant improvement. With consistent diet changes, exercise, and medication adherence, most people can lower HbA1c by 1–2 percentage points in 3–6 months. A reduction of just 1% significantly reduces the risk of diabetes complications.",
          },
        ]}
      />
    </SeoPageLayout>
  );
}
