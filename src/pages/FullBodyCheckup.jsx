import { SeoPageLayout, useSEO, SectionHeading, InfoTable, FAQ, NormalRangeBox } from "./SeoLayout";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalWebPage",
      name: "Full Body Checkup – 60+ Tests | Book Health Package | LabEase",
      description:
        "Book Full Body Checkup from ₹999. 60+ tests: CBC, thyroid, diabetes, liver, kidney & vitamins.",
      medicalAudience: "Patient",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is fasting required for full body checkup?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. A 10–12 hour fast is required before a full body checkup since it includes fasting blood sugar and lipid profile tests.",
          },
        },
      ],
    },
  ],
};

export default function FullBodyCheckup({ navTo }) {
  useSEO({
    title: "Full Body Checkup – 60+ Tests | Book Health Package | LabEase",
    description:
      "Book Full Body Checkup from ₹999. 60+ tests: CBC, thyroid, diabetes, liver, kidney & vitamins. Home collection. verified labs. Same-day reports.",
    schema,
  });

  const testGroup = (label, items) => (
    <div style={{ marginBottom: 12 }}>
      <p style={{ fontWeight: 700, color: "#1158A6", marginBottom: 4, fontSize: "0.9rem" }}>{label}</p>
      <ul style={{ color: "#374151", lineHeight: 1.7, paddingLeft: 20, margin: 0, fontSize: "0.9rem" }}>
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  );

  return (
    <SeoPageLayout navTo={navTo} breadcrumb="Full Body Checkup">
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
        Full Body Checkup – Complete Health Package with 60+ Tests
      </h1>
      <p style={{ color: "#6B7280", fontSize: "0.92rem", marginBottom: 20 }}>
        Starting from ₹999 · 60+ parameters · Home collection · verified labs
      </p>

      {/* Section 1 */}
      <SectionHeading>What Is a Full Body Checkup?</SectionHeading>
      <p style={{ color: "#374151", lineHeight: 1.7, marginBottom: 16 }}>
        A Full Body Checkup is a comprehensive health screening package that evaluates your
        blood, organs, and vital systems through 60 or more laboratory tests. Unlike single
        tests that check one aspect of health, a full body checkup gives you a 360-degree view
        — covering blood health, diabetes, cholesterol, liver function, kidney function, thyroid,
        vitamins, and urine analysis in a single visit. It is the most efficient way to catch
        potential health issues early, before symptoms appear. Annual full body checkups are
        recommended for all adults above 30, and for those with chronic conditions or family
        history of lifestyle diseases.
      </p>

      {/* Section 2 */}
      <SectionHeading>Tests Included in a Full Body Checkup</SectionHeading>
      <div
        style={{
          background: "#fff",
          border: "1px solid #E5E7EB",
          borderRadius: 14,
          padding: 20,
          marginBottom: 16,
        }}
      >
        {testGroup("🩸 Blood Health", [
          "Complete Blood Count (CBC) — Haemoglobin, RBC, WBC, Platelets",
          "ESR (Erythrocyte Sedimentation Rate) — Inflammation marker",
          "Peripheral Blood Smear — Cell morphology",
        ])}
        {testGroup("🍬 Diabetes", [
          "Fasting Blood Glucose (FBS)",
          "Post-Prandial Blood Sugar (PPBS)",
          "HbA1c — 3-month average blood sugar",
          "Insulin (Fasting) — Insulin resistance assessment",
        ])}
        {testGroup("❤️ Heart Health", [
          "Lipid Profile — Total cholesterol, LDL, HDL, Triglycerides, VLDL",
          "hsCRP — High-sensitivity C-Reactive Protein (cardiac inflammation)",
          "Homocysteine (in advanced packages)",
        ])}
        {testGroup("🫀 Liver Function", [
          "LFT — Bilirubin, SGOT, SGPT, Alkaline Phosphatase, GGT",
          "Total Protein, Albumin, Globulin",
        ])}
        {testGroup("🫘 Kidney Function", [
          "KFT — Urea, Creatinine, Uric Acid",
          "eGFR — Estimated Glomerular Filtration Rate",
          "Electrolytes — Sodium, Potassium, Chloride",
        ])}
        {testGroup("🦋 Thyroid", [
          "TSH (Thyroid Stimulating Hormone)",
          "Free T3 and Free T4 (in Standard and above packages)",
        ])}
        {testGroup("☀️ Vitamins & Minerals", [
          "Vitamin D (25-OH)",
          "Vitamin B12",
          "Iron Profile — Serum Iron, TIBC, Ferritin",
          "Calcium, Phosphorus, Magnesium",
        ])}
        {testGroup("🔬 Urine Analysis", [
          "Urine Routine & Microscopy — Colour, specific gravity, protein, sugar, cells",
        ])}
      </div>

      {/* Section 3 */}
      <SectionHeading>Who Should Get a Full Body Checkup?</SectionHeading>
      <InfoTable
        rows={[
          ["Age Group", "Frequency", "Key Tests to Watch"],
          ["20–30 years", "Every 2 years (or annually if symptomatic)", "CBC, Blood Sugar, Lipid Profile"],
          ["30–40 years", "Annually", "Above + Thyroid, Vitamin D, B12"],
          ["40–50 years", "Every 6–12 months", "Above + Liver, Kidney, HbA1c"],
          ["50+ years", "Every 6 months", "All + Iron Profile, PSA/PAP smear"],
          ["Diabetics", "Every 3–6 months", "HbA1c, Kidney, Eye, Foot exams"],
          ["Hypertension patients", "Every 6 months", "Kidney, Electrolytes, Lipid Profile"],
        ]}
      />

      {/* Section 4 */}
      <SectionHeading>Package Tiers &amp; Pricing</SectionHeading>
      <InfoTable
        rows={[
          ["Package", "Tests Included", "Price"],
          ["Basic", "30 parameters — CBC, Blood Sugar, Lipid Profile, Urine", "₹599"],
          ["Standard", "60+ parameters — All Basic + Thyroid, Liver, Kidney, Vitamins D & B12", "₹999"],
          ["Comprehensive", "80+ parameters — All Standard + Iron Profile, HbA1c, Electrolytes, hsCRP", "₹1,799"],
          ["Premium", "100+ parameters — All Comprehensive + Hormone panel, Tumour markers, Cardiac risk", "₹2,999"],
        ]}
      />

      {/* Section 5 */}
      <SectionHeading>How to Prepare for Your Full Body Checkup</SectionHeading>
      <div
        style={{
          background: "#fff",
          border: "1px solid #E5E7EB",
          borderRadius: 14,
          padding: 18,
          marginBottom: 16,
        }}
      >
        <ul style={{ color: "#374151", lineHeight: 1.8, paddingLeft: 22, margin: 0 }}>
          <li>
            <strong>Fast for 10–12 hours</strong> before the test. Only plain water is allowed
            during the fasting period.
          </li>
          <li>
            <strong>Book a morning slot</strong> (6–9 AM) — this makes it easy to fast overnight
            and get the test done first thing in the morning.
          </li>
          <li>
            <strong>Avoid alcohol</strong> for 24–48 hours before the test, as it can alter
            liver enzyme and sugar readings.
          </li>
          <li>
            <strong>Bring previous reports</strong> if available — your doctor can compare
            trends over time, which is more meaningful than a single reading.
          </li>
          <li>
            <strong>Continue regular medications</strong> unless your doctor has specifically
            asked you to stop them. Note: thyroid medication should ideally be taken after the
            blood draw.
          </li>
          <li>
            <strong>Stay hydrated</strong> — drink 1–2 glasses of water before the phlebotomist
            arrives to make vein access easier.
          </li>
        </ul>
      </div>

      {/* Section 6 */}
      <SectionHeading>Frequently Asked Questions</SectionHeading>
      <FAQ
        items={[
          {
            q: "What is included in a full body checkup?",
            a: "A standard full body checkup includes 60+ tests covering: Complete Blood Count (CBC), blood sugar (fasting + HbA1c), lipid profile (cholesterol), liver function tests (LFT), kidney function tests (KFT), thyroid profile (TSH), Vitamin D, Vitamin B12, and urine routine analysis. Premium packages add hormone panels, tumour markers, and cardiac risk markers.",
          },
          {
            q: "How much does a full body checkup cost?",
            a: "LabEase offers full body checkup packages starting from ₹599 (Basic, 30 parameters) to ₹2,999 (Premium, 100+ parameters). The Standard package at ₹999 (60+ tests) is the most popular and covers all essential parameters for most adults.",
          },
          {
            q: "Is fasting required for a full body checkup?",
            a: "Yes. A 10–12 hour overnight fast is required because the package includes fasting blood glucose and lipid profile, both of which require fasting for accurate results. Only plain water is allowed. Schedule your morning slot for 6–9 AM so you fast during sleep.",
          },
          {
            q: "How often should I get a full body checkup?",
            a: "For adults aged 20–30 with no known conditions, every 2 years is sufficient. From age 30 onwards, annual checkups are recommended. If you have diabetes, hypertension, or a family history of heart disease, get checked every 6 months or as advised by your doctor.",
          },
          {
            q: "Can a full body checkup be done at home?",
            a: "Yes. LabEase's home collection service covers full body checkups. A qualified and experienced phlebotomist visits your home in the morning, collects all required blood and urine samples, and your comprehensive report is delivered digitally, usually within 24 hours.",
          },
          {
            q: "Which full body checkup package is best for me?",
            a: "For healthy adults under 40: the Standard package (₹999) covers all essentials. For those above 40, with lifestyle diseases, or wanting comprehensive screening: the Comprehensive package (₹1,799) is ideal. For corporate health or advanced risk assessment: Premium (₹2,999). Our team can help you choose based on your health history.",
          },
        ]}
      />
    </SeoPageLayout>
  );
}
