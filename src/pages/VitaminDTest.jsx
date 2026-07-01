import { SeoPageLayout, useSEO, SectionHeading, InfoTable, FAQ, NormalRangeBox } from "./SeoLayout";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalWebPage",
      name: "Vitamin D Test (25-OH) – Normal Range & Price | LabEase",
      description:
        "Book Vitamin D (25-OH) test from ₹699. Normal levels, deficiency symptoms, treatment guide.",
      medicalAudience: "Patient",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is fasting required for Vitamin D test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Vitamin D test does not require fasting. You can eat and drink normally before the test.",
          },
        },
      ],
    },
  ],
};

export default function VitaminDTest({ navTo }) {
  useSEO({
    title: "Vitamin D Test – 25-OH Normal Range & Price | LabEase",
    description:
      "Book Vitamin D (25-OH) test from ₹699. Normal levels, deficiency symptoms, treatment guide. No fasting required. Home collection available.",
    schema,
  });

  return (
    <SeoPageLayout navTo={navTo} breadcrumb="Vitamin D Test">
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
        Vitamin D Test (25-OH) – Normal Range, Deficiency Signs &amp; Treatment
      </h1>
      <p style={{ color: "#6B7280", fontSize: "0.92rem", marginBottom: 20 }}>
        Starting from ₹699 · No fasting required · Home collection available
      </p>

      {/* Section 1 */}
      <SectionHeading>What Is the Vitamin D Test?</SectionHeading>
      <p style={{ color: "#374151", lineHeight: 1.7, marginBottom: 14 }}>
        The Vitamin D test measures the level of 25-hydroxyvitamin D (25-OH Vitamin D) in your
        blood — the best indicator of your body's overall Vitamin D status. Vitamin D is a
        fat-soluble vitamin that your skin produces when exposed to sunlight, and it is also
        obtained in small amounts from food. It plays a crucial role in calcium absorption, bone
        strength, immune function, muscle health, and mood regulation.
      </p>
      <p style={{ color: "#374151", lineHeight: 1.7, marginBottom: 16 }}>
        There are two main forms of Vitamin D: <strong>D2 (ergocalciferol)</strong>, found in
        plant-based foods and fortified products, and <strong>D3 (cholecalciferol)</strong>,
        produced by the skin and found in animal-based foods. The 25-OH test measures the
        combined total of both, giving the most accurate picture of your Vitamin D stores.
      </p>

      {/* Section 2 */}
      <SectionHeading>Vitamin D Normal Range</SectionHeading>
      <NormalRangeBox
        title="25-OH Vitamin D Reference Values"
        rows={[
          ["Deficient", "Below 20 ng/mL — Requires supplementation"],
          ["Insufficient", "20–29 ng/mL — Borderline; monitor and supplement"],
          ["Normal / Optimal", "30–100 ng/mL — Healthy range"],
          ["Potentially Toxic", "Above 100 ng/mL — Excess; can cause hypercalcaemia"],
        ]}
      />

      {/* Section 3 */}
      <SectionHeading>Symptoms of Vitamin D Deficiency</SectionHeading>
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
            background: "#fff",
            border: "1px solid #E5E7EB",
            borderRadius: 14,
            padding: 16,
          }}
        >
          <p style={{ fontWeight: 700, color: "#0D1117", marginBottom: 8, fontSize: "0.93rem" }}>
            🦴 Physical Symptoms
          </p>
          <ul style={{ color: "#374151", lineHeight: 1.8, paddingLeft: 18, margin: 0, fontSize: "0.9rem" }}>
            <li>Bone pain and lower back pain</li>
            <li>Muscle weakness and cramps</li>
            <li>Frequent fractures or weak bones</li>
            <li>Joint pain and stiffness</li>
            <li>Hair thinning and hair loss</li>
            <li>Slow wound healing</li>
          </ul>
        </div>
        <div
          style={{
            flex: "1 1 250px",
            background: "#fff",
            border: "1px solid #E5E7EB",
            borderRadius: 14,
            padding: 16,
          }}
        >
          <p style={{ fontWeight: 700, color: "#0D1117", marginBottom: 8, fontSize: "0.93rem" }}>
            ⚡ Energy &amp; Immunity
          </p>
          <ul style={{ color: "#374151", lineHeight: 1.8, paddingLeft: 18, margin: 0, fontSize: "0.9rem" }}>
            <li>Chronic fatigue and tiredness</li>
            <li>Frequent colds and infections</li>
            <li>Depression and low mood</li>
            <li>Brain fog and poor concentration</li>
            <li>Impaired immune response</li>
            <li>Sleep disturbances</li>
          </ul>
        </div>
      </div>

      {/* Section 4 */}
      <SectionHeading>Why Are Indians So Vitamin D Deficient?</SectionHeading>
      <p style={{ color: "#374151", lineHeight: 1.7, marginBottom: 10 }}>
        Studies show that 70–90% of Indians are Vitamin D deficient despite abundant sunshine.
        Here's why:
      </p>
      <ol style={{ color: "#374151", lineHeight: 1.8, paddingLeft: 24, marginBottom: 16 }}>
        <li style={{ marginBottom: 8 }}>
          <strong>Skin pigmentation</strong> — Darker skin contains more melanin, which acts as
          a natural sunscreen and reduces Vitamin D synthesis by 90–99%.
        </li>
        <li style={{ marginBottom: 8 }}>
          <strong>Indoor lifestyle</strong> — Office jobs, long commutes, and air-conditioned
          environments mean most people get very little direct sunlight during peak UV hours.
        </li>
        <li style={{ marginBottom: 8 }}>
          <strong>Sunscreen and clothing</strong> — Full-body coverage in traditional dress or
          sunscreen use (SPF 15 reduces synthesis by 99%) blocks UV-B rays needed for Vitamin D.
        </li>
        <li style={{ marginBottom: 8 }}>
          <strong>Vegetarian diet</strong> — Most dietary Vitamin D comes from fish, eggs, and
          dairy. A largely vegetarian diet provides very little Vitamin D naturally.
        </li>
        <li style={{ marginBottom: 8 }}>
          <strong>Air pollution</strong> — Urban smog absorbs UV-B radiation before it reaches
          the skin, dramatically reducing effective sun exposure in cities.
        </li>
        <li style={{ marginBottom: 8 }}>
          <strong>Limited fortified foods</strong> — Unlike Western countries, India does not
          widely fortify staple foods like milk and bread with Vitamin D.
        </li>
      </ol>

      {/* Section 5 */}
      <SectionHeading>Foods Rich in Vitamin D</SectionHeading>
      <InfoTable
        rows={[
          ["Food", "Vitamin D Content (per serving)"],
          ["Salmon (100g, cooked)", "~360–800 IU"],
          ["Tuna (100g, canned)", "~150 IU"],
          ["Egg yolk (1 large)", "~40 IU"],
          ["Fortified milk (200mL)", "~80–100 IU"],
          ["Fortified orange juice (200mL)", "~100 IU"],
          ["Mushrooms (100g, UV-exposed)", "~400 IU"],
          ["Cod liver oil (1 tsp)", "~450 IU"],
          ["Fortified cereal (1 serving)", "~40–80 IU"],
        ]}
      />
      <p style={{ color: "#6B7280", fontSize: "0.82rem", marginBottom: 16 }}>
        Note: Food sources alone are rarely sufficient to correct Vitamin D deficiency. Doctors
        typically prescribe high-dose supplementation (60,000 IU weekly or higher) for 8–12 weeks.
      </p>

      {/* Section 6 */}
      <SectionHeading>Does Vitamin D Test Require Fasting?</SectionHeading>
      <p style={{ color: "#374151", lineHeight: 1.7, marginBottom: 16 }}>
        <strong>No.</strong> The Vitamin D (25-OH) blood test does not require fasting. You can
        eat, drink, and take your regular medications before the test. It can be done at any time
        of day, making it very convenient to combine with a morning fasting test in the same visit.
      </p>

      {/* Section 7 */}
      <SectionHeading>Frequently Asked Questions</SectionHeading>
      <FAQ
        items={[
          {
            q: "What is the normal Vitamin D level?",
            a: "The optimal Vitamin D range is 30–100 ng/mL. Levels below 20 ng/mL are considered deficient and require treatment. Levels between 20–29 ng/mL are insufficient. Levels above 100 ng/mL may be toxic, causing excessive calcium absorption (hypercalcaemia).",
          },
          {
            q: "What are symptoms of low Vitamin D?",
            a: "Common symptoms include bone pain (especially lower back and knees), muscle weakness and cramps, chronic fatigue, frequent illness, depression, hair loss, and slow wound healing. Many people have no symptoms until levels are severely low, which is why testing is important.",
          },
          {
            q: "How much does a Vitamin D test cost?",
            a: "LabEase offers the Vitamin D (25-OH) test starting from ₹699. Home collection is included at no extra charge. The test uses a single blood sample. Results are available within 24 hours.",
          },
          {
            q: "Is fasting required for a Vitamin D test?",
            a: "No. Vitamin D testing does not require fasting. You can eat and drink normally before your appointment. This makes it easy to add to any routine blood draw or health checkup.",
          },
          {
            q: "How is Vitamin D deficiency treated?",
            a: "Treatment depends on severity. For deficiency (below 20 ng/mL), doctors typically prescribe high-dose Vitamin D3 supplements — often 60,000 IU weekly for 8–12 weeks, followed by maintenance dosing. Increased safe sun exposure (15–20 minutes of mid-morning sun) and dietary changes also help. A re-test after 3 months measures treatment response.",
          },
          {
            q: "Does Vitamin D deficiency cause hair loss?",
            a: "Yes, research links Vitamin D deficiency to alopecia (hair loss) and thinning. Vitamin D receptors are present in hair follicles and play a role in the hair growth cycle. Correcting deficiency through supplementation may help reduce hair loss, though results vary and other causes of hair loss should also be ruled out.",
          },
        ]}
      />
    </SeoPageLayout>
  );
}
