import { SeoPageLayout, useSEO, SectionHeading, InfoTable, FAQ, NormalRangeBox } from "./SeoLayout";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalWebPage",
      name: "Blood Test at Home in Hyderabad | LabEase Home Collection",
      description:
        "Book blood test at home in Hyderabad from ₹249. Phlebotomist at your door. verified labs, same-day reports.",
      medicalAudience: "Patient",
    },
    {
      "@type": "LocalBusiness",
      name: "LabEase Hyderabad",
      areaServed: "Hyderabad, Telangana",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is home blood collection available in all areas of Hyderabad?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, LabEase covers most residential and commercial areas across Hyderabad and Secunderabad.",
          },
        },
      ],
    },
  ],
};

function AreaGroup({ title, areas }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <p style={{ fontWeight: 700, color: "#1158A6", marginBottom: 8, fontSize: "0.9rem" }}>{title}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {areas.map((area, i) => (
          <span
            key={i}
            style={{
              background: "#EFF6FF",
              border: "1px solid #BFDBFE",
              color: "#1158A6",
              borderRadius: 20,
              padding: "5px 12px",
              fontSize: "0.82rem",
              fontWeight: 600,
            }}
          >
            {area}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function BloodTestHyderabad({ navTo }) {
  useSEO({
    title: "Blood Test at Home in Hyderabad | LabEase Home Collection",
    description:
      "Book blood test at home in Hyderabad from ₹249. Phlebotomist at your door. verified labs, same-day reports. Banjara Hills, Jubilee Hills & all areas.",
    schema,
  });

  return (
    <SeoPageLayout navTo={navTo} breadcrumb="Blood Test at Home in Hyderabad">
      <h1
        style={{
          fontWeight: 800,
          fontSize: "1.6rem",
          color: "#0D1117",
          marginBottom: 8,
          marginTop: 20,
          lineHeight: 1.25,
          fontFamily: "'Manrope', sans-serif",
        }}
      >
        Blood Test at Home in Hyderabad – Book Home Sample Collection
      </h1>
      <p style={{ color: "#6B7280", fontSize: "0.92rem", marginBottom: 20 }}>
        Starting from ₹249 · Available across Hyderabad &amp; Secunderabad · Same-day reports
      </p>

      {/* Section 1 */}
      <SectionHeading>Why Choose LabEase in Hyderabad?</SectionHeading>
      <ul style={{ color: "#374151", lineHeight: 1.9, paddingLeft: 0, marginBottom: 16, listStyle: "none" }}>
        <li>✅ <strong>verified labs</strong> across Hyderabad with accurate, trusted reports</li>
        <li>✅ <strong>Trained, verified phlebotomists</strong> who arrive at your doorstep on time</li>
        <li>✅ <strong>Same-day reports</strong> delivered digitally via WhatsApp or email</li>
        <li>✅ <strong>No extra charges</strong> for home sample collection on most tests</li>
        <li>✅ <strong>Flexible slots</strong> from early morning to evening, 7 days a week</li>
      </ul>


      {/* Section 3 */}
      <SectionHeading>Available Tests in Hyderabad</SectionHeading>
      <InfoTable
        rows={[
          ["Test", "Purpose", "Report Time", "Price"],
          ["CBC (Complete Blood Count)", "Anaemia, infections, blood disorders", "4–6 hrs", "₹249"],
          ["Blood Sugar (Fasting/PP)", "Diabetes screening", "2–4 hrs", "₹149"],
          ["HbA1c", "3-month sugar average", "6–8 hrs", "₹329"],
          ["Thyroid Profile", "T3, T4, TSH thyroid function", "6–8 hrs", "₹399"],
          ["Vitamin D (25-OH)", "Bone health, immunity", "24 hrs", "₹699"],
          ["Vitamin B12", "Nerve and energy function", "24 hrs", "₹599"],
          ["Lipid Profile", "Cholesterol and heart health", "6–8 hrs", "₹449"],
          ["Dengue NS1", "Early dengue detection", "4–6 hrs", "₹499"],
          ["Liver Function Test (LFT)", "Liver health assessment", "6–8 hrs", "₹499"],
          ["Kidney Function Test (KFT)", "Kidney health assessment", "6–8 hrs", "₹499"],
        ]}
      />

      {/* Section 4 */}
      <SectionHeading>How to Book in Hyderabad</SectionHeading>
      <ol style={{ color: "#374151", lineHeight: 1.8, paddingLeft: 24, marginBottom: 16 }}>
        <li style={{ marginBottom: 10 }}>
          <strong>Select your test(s)</strong> and enter your Hyderabad address (Banjara Hills,
          Madhapur, Kukatpally, Dilsukhnagar — wherever you are, we cover it).
        </li>
        <li style={{ marginBottom: 10 }}>
          <strong>Choose a convenient slot</strong> — early morning slots from 6 AM are popular
          for fasting tests and IT professionals heading to work.
        </li>
        <li style={{ marginBottom: 10 }}>
          <strong>Phlebotomist arrives and collects your sample</strong>, then your report is
          delivered digitally — usually the same day.
        </li>
      </ol>

      {/* Section 5 */}
      <SectionHeading>Why Home Collection Is Popular in Hyderabad</SectionHeading>
      <p style={{ color: "#374151", lineHeight: 1.7, marginBottom: 16 }}>
        Hyderabad's rapid growth as a major IT hub — with corridors like Madhapur, Gachibowli,
        and HITEC City housing thousands of tech professionals — has created huge demand for
        convenient healthcare. Long working hours and demanding schedules make it difficult for
        IT employees to take time off for lab visits, so booking a blood test at home that fits
        around their day has become essential. Hyderabad's notorious traffic congestion,
        especially during peak hours on roads connecting Kukatpally, Ameerpet, and the outer
        ring road, can turn a simple diagnostic centre visit into an hour-long ordeal — home
        collection eliminates this entirely. The city also has a significant elderly population
        in established neighbourhoods like Himayatnagar and Secunderabad, for whom travelling
        to a lab is physically challenging; home collection brings safe, comfortable healthcare
        directly to their doorstep. Additionally, with Hyderabad's growing nuclear family
        households, having a reliable home healthcare service that doesn't require taking time
        off work to accompany elderly parents or children has become a genuine necessity for
        many families across the city.
      </p>

      {/* Section 6 */}
      <SectionHeading>Frequently Asked Questions</SectionHeading>
      <FAQ
        items={[
          {
            q: "Is home blood collection available in all areas of Hyderabad?",
            a: "Yes. LabEase covers all major areas of Hyderabad and Secunderabad including Banjara Hills, Jubilee Hills, Madhapur, Gachibowli, Kukatpally, Dilsukhnagar, Uppal, and surrounding localities. Enter your address while booking to confirm slot availability for your specific area.",
          },
          {
            q: "What is the earliest slot available?",
            a: "The earliest slot in Hyderabad starts at 6:00 AM, which is ideal for fasting tests like blood sugar and lipid profile. Slots continue through the day until 8:00 PM, seven days a week, including weekends and public holidays.",
          },
          {
            q: "Are the labs verified in Hyderabad?",
            a: "Yes. All LabEase partner labs in Hyderabad are verified, ensuring accurate and internationally recognised results trusted by hospitals and doctors across the city.",
          },
          {
            q: "Is there an extra charge for home collection in Hyderabad?",
            a: "No, home sample collection is included for most tests booked through LabEase in Hyderabad. The price displayed already includes the home visit — there are no hidden or surprise charges.",
          },
          {
            q: "Can I book a blood test for my parents in Hyderabad?",
            a: "Absolutely. Many families in Hyderabad use LabEase to book tests for elderly parents who find it difficult to travel to diagnostic centres. You can book on their behalf, provide their address, and our phlebotomist will visit them directly, with the report shared with you digitally.",
          },
          {
            q: "How do I get my report after the test?",
            a: "Once your sample is processed at the verified lab, your report is sent digitally via WhatsApp and email — typically the same day for most tests, and within 24 hours for specialised tests like Vitamin D or B12.",
          },
        ]}
      />
    </SeoPageLayout>
  );
}
