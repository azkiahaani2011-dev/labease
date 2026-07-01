import { useState } from "react";
import { SeoPageLayout, useSEO, SectionHeading, InfoTable, FAQ, NormalRangeBox } from "./SeoLayout";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalWebPage",
      name: "Thyroid Profile Test – T3 T4 TSH | Normal Range | LabEase",
      description:
        "Book Thyroid Profile (T3, T4, TSH) from ₹399. Normal ranges, symptoms, what results mean.",
      medicalAudience: "Patient",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is TSH test fasting?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Thyroid tests including TSH, T3, and T4 do not require fasting.",
          },
        },
      ],
    },
  ],
};

export default function ThyroidTest({ navTo }) {
  useSEO({
    title: "Thyroid Profile Test – T3 T4 TSH | Normal Range | LabEase",
    description:
      "Book Thyroid Profile (T3, T4, TSH) from ₹399. Normal ranges, deficiency symptoms, what results mean. No fasting. Home collection available.",
    schema,
  });

  return (
    <SeoPageLayout navTo={navTo} breadcrumb="Thyroid Profile Test">
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
        Thyroid Profile Test (T3, T4, TSH) – Normal Range &amp; Results Explained
      </h1>
      <p style={{ color: "#6B7280", fontSize: "0.92rem", marginBottom: 20 }}>
        Starting from ₹399 · No fasting required · Home collection available
      </p>

      {/* Section 1 */}
      <SectionHeading>What Is a Thyroid Profile Test?</SectionHeading>
      <p style={{ color: "#374151", lineHeight: 1.7, marginBottom: 14 }}>
        The thyroid is a butterfly-shaped gland in your neck that produces hormones regulating
        metabolism, energy, heart rate, body temperature, and many other vital functions.
        A Thyroid Profile test measures the levels of three key hormones — TSH, T3, and T4 — to
        assess how well your thyroid is functioning. It is one of the most commonly ordered
        tests, especially for women, since thyroid disorders are significantly more prevalent
        in females.
      </p>
      <InfoTable
        rows={[
          ["Hormone", "Full Name", "Role"],
          ["TSH", "Thyroid Stimulating Hormone", "Pituitary hormone that controls thyroid activity"],
          ["T3", "Triiodothyronine", "Active thyroid hormone; regulates metabolism and energy"],
          ["T4", "Thyroxine", "Main thyroid hormone; converted to T3 in body tissues"],
        ]}
      />

      {/* Section 2 */}
      <SectionHeading>Normal Thyroid Range</SectionHeading>
      <NormalRangeBox
        title="Thyroid Hormone Reference Values (Adults)"
        rows={[
          ["TSH", "0.4 – 4.0 mIU/L"],
          ["Free T3 (FT3)", "2.3 – 4.2 pg/mL"],
          ["Free T4 (FT4)", "0.8 – 1.8 ng/dL"],
          ["Total T3", "80 – 200 ng/dL"],
          ["Total T4", "5.0 – 12.0 µg/dL"],
        ]}
      />
      <p style={{ color: "#6B7280", fontSize: "0.82rem", marginBottom: 20 }}>
        Note: Normal ranges may vary slightly between labs. Always interpret results with your
        doctor's guidance alongside your symptoms.
      </p>

      {/* Section 3 */}
      <SectionHeading>Signs You May Need a Thyroid Test</SectionHeading>
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
            flex: "1 1 260px",
            background: "#EFF6FF",
            border: "1px solid #BFDBFE",
            borderRadius: 12,
            padding: 16,
          }}
        >
          <p style={{ fontWeight: 700, color: "#1158A6", marginBottom: 10, fontSize: "0.93rem" }}>
            Hypothyroidism (Underactive Thyroid)
          </p>
          <ul style={{ color: "#374151", lineHeight: 1.8, paddingLeft: 18, margin: 0, fontSize: "0.9rem" }}>
            <li>Unexplained weight gain</li>
            <li>Constant fatigue and low energy</li>
            <li>Feeling cold all the time</li>
            <li>Hair loss and dry skin</li>
            <li>Depression or low mood</li>
            <li>Constipation</li>
            <li>Slow heart rate</li>
            <li>Puffy face or swollen neck</li>
          </ul>
        </div>
        <div
          style={{
            flex: "1 1 260px",
            background: "#FFF7ED",
            border: "1px solid #FED7AA",
            borderRadius: 12,
            padding: 16,
          }}
        >
          <p style={{ fontWeight: 700, color: "#C2410C", marginBottom: 10, fontSize: "0.93rem" }}>
            Hyperthyroidism (Overactive Thyroid)
          </p>
          <ul style={{ color: "#374151", lineHeight: 1.8, paddingLeft: 18, margin: 0, fontSize: "0.9rem" }}>
            <li>Unexplained weight loss</li>
            <li>Rapid or irregular heartbeat</li>
            <li>Excessive sweating</li>
            <li>Nervousness or anxiety</li>
            <li>Tremors in hands</li>
            <li>Diarrhoea or frequent stools</li>
            <li>Difficulty sleeping</li>
            <li>Bulging eyes (in Graves' disease)</li>
          </ul>
        </div>
      </div>

      {/* Section 4 */}
      <SectionHeading>Does Thyroid Test Require Fasting?</SectionHeading>
      <p style={{ color: "#374151", lineHeight: 1.7, marginBottom: 16 }}>
        <strong>No.</strong> Thyroid function tests (TSH, T3, T4) do not require fasting. You
        can eat, drink tea or coffee, and have meals as normal before the test. However, there
        is one important tip: <strong>if you are on thyroid medication (like Thyroxine /
        Eltroxin), take your blood test before your morning dose</strong>. Taking your medication
        first can temporarily raise T4 levels and give a misleading result. After the blood
        collection, take your tablet as usual.
      </p>

      {/* Section 5 */}
      <SectionHeading>Hypothyroidism vs Hyperthyroidism</SectionHeading>
      <InfoTable
        rows={[
          ["Feature", "Hypothyroidism", "Hyperthyroidism"],
          ["TSH level", "High (TSH ↑)", "Low (TSH ↓)"],
          ["T3/T4 levels", "Low (T3/T4 ↓)", "High (T3/T4 ↑)"],
          ["Metabolism", "Slow", "Fast"],
          ["Weight", "Weight gain", "Weight loss"],
          ["Heart rate", "Slow (bradycardia)", "Fast (tachycardia)"],
          ["Energy", "Fatigue, low energy", "Anxiety, restlessness"],
          ["Common cause", "Hashimoto's disease, iodine deficiency", "Graves' disease, nodules"],
          ["Treatment", "Levothyroxine (hormone replacement)", "Antithyroid drugs, radioiodine"],
        ]}
      />

      {/* Section 6 */}
      <SectionHeading>Frequently Asked Questions</SectionHeading>
      <FAQ
        items={[
          {
            q: "What is the difference between TSH and T3 T4 test?",
            a: "TSH is produced by the pituitary gland and acts as a signal that tells the thyroid gland how much hormone to produce. T3 and T4 are the actual thyroid hormones. TSH is the most sensitive marker — it rises when T3/T4 are low (hypothyroid) and falls when T3/T4 are high (hyperthyroid). Most doctors screen with TSH first, then add T3/T4 if TSH is abnormal.",
          },
          {
            q: "What is normal TSH level for women?",
            a: "The normal TSH range for adult women is 0.4–4.0 mIU/L. However, during pregnancy, the optimal range shifts lower (typically 0.1–2.5 mIU/L in the first trimester). Women planning pregnancy or who are pregnant should discuss thyroid levels specifically with their obstetrician.",
          },
          {
            q: "Can I take thyroid medicine before the test?",
            a: "No — if possible, take the blood test before your morning dose of thyroid medication. Taking Levothyroxine (Eltroxin) before the test can temporarily elevate T4 levels, giving a misleading result. After blood collection, take your medicine as usual. Always follow your doctor's specific instructions.",
          },
          {
            q: "Is TSH test fasting?",
            a: "No. TSH and the full thyroid profile (T3, T4) do not require fasting. You can eat normally, drink tea or coffee, and have your regular meals before the test. The only consideration is the timing of thyroid medication if you are on it.",
          },
          {
            q: "What does high TSH mean?",
            a: "A high TSH level (above 4.0 mIU/L) generally indicates hypothyroidism — your thyroid is underactive and the pituitary is sending strong signals to stimulate it. Symptoms include fatigue, weight gain, cold intolerance, and hair loss. Your doctor may start you on Levothyroxine therapy.",
          },
          {
            q: "How often should I get my thyroid tested?",
            a: "If you are on thyroid medication, testing every 3–6 months is typically recommended until levels stabilise, then annually. If you have a family history of thyroid disease or symptoms but no diagnosis, an annual screening is advisable. Pregnant women should test each trimester.",
          },
        ]}
      />
    </SeoPageLayout>
  );
}
