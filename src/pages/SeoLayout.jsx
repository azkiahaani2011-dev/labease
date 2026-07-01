import { useEffect, useState } from "react";

// ─── useSEO hook ────────────────────────────────────────────────────────────
export function useSEO({ title, description, schema }) {
  useEffect(() => {
    const defaultTitle = "LabEase — Book Lab Tests Near You";

    // Title
    document.title = title;

    // Helper: get or create a meta tag
    function getOrCreate(selector, createElement) {
      let el = document.querySelector(selector);
      if (!el) {
        el = createElement();
        document.head.appendChild(el);
        el.dataset.seoInjected = "true";
      }
      return el;
    }

    // Meta description
    const metaDesc = getOrCreate(
      'meta[name="description"]',
      () => {
        const m = document.createElement("meta");
        m.name = "description";
        return m;
      }
    );
    metaDesc.content = description;

    // OG title
    const ogTitle = getOrCreate(
      'meta[property="og:title"]',
      () => {
        const m = document.createElement("meta");
        m.setAttribute("property", "og:title");
        return m;
      }
    );
    ogTitle.content = title;

    // OG description
    const ogDesc = getOrCreate(
      'meta[property="og:description"]',
      () => {
        const m = document.createElement("meta");
        m.setAttribute("property", "og:description");
        return m;
      }
    );
    ogDesc.content = description;

    // Canonical
    const canonical = getOrCreate(
      'link[rel="canonical"]',
      () => {
        const l = document.createElement("link");
        l.rel = "canonical";
        return l;
      }
    );
    canonical.href = window.location.href;

    // JSON-LD schema
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "seo-schema-injected";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.title = defaultTitle;
      const injected = document.getElementById("seo-schema-injected");
      if (injected) injected.remove();
    };
  }, [title, description, schema]);
}

// ─── SeoPageLayout ───────────────────────────────────────────────────────────
export function SeoPageLayout({ navTo, children, breadcrumb }) {
  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", background: "#F8FAFC", minHeight: "100vh", paddingBottom: 80 }}>
      {/* Breadcrumb */}
      <nav
        style={{
          maxWidth: 680,
          margin: "0 auto",
          padding: "10px 16px 0",
          fontSize: "0.8rem",
          color: "#6B7280",
        }}
        aria-label="Breadcrumb"
      >
        <span
          style={{ cursor: "pointer", textDecoration: "underline" }}
          onClick={() => navTo("home")}
        >
          Home
        </span>
        <span style={{ margin: "0 6px" }}>›</span>
        <span style={{ color: "#374151", fontWeight: 600 }}>{breadcrumb}</span>
      </nav>

      {/* Content */}
      <main style={{ maxWidth: 680, margin: "0 auto", padding: "16px 16px 32px" }}>
        {children}
        {/* Disclaimer */}
        <p style={{ fontSize: "0.75rem", color: "#9CA3AF", marginTop: 40, lineHeight: 1.6, borderTop: "1px solid #E5E7EB", paddingTop: 16 }}>
          LabEase provides lab booking services. All medical content is for informational purposes only. Always consult a qualified doctor for diagnosis and treatment.
        </p>
      </main>

      {/* Sticky Bottom CTA */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#fff",
          borderTop: "1px solid #E5E7EB",
          padding: "12px 16px",
          zIndex: 100,
        }}
      >
        <button
          onClick={() => navTo("labs")}
          style={{
            display: "block",
            width: "100%",
            maxWidth: 680,
            margin: "0 auto",
            background: "#1158A6",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: "1rem",
            padding: "14px 0",
            cursor: "pointer",
            fontFamily: "'Manrope', sans-serif",
            letterSpacing: "0.1px",
          }}
        >
          Book This Test at Home →
        </button>
      </div>
    </div>
  );
}

// ─── InfoTable ───────────────────────────────────────────────────────────────
export function InfoTable({ rows }) {
  if (!rows || rows.length === 0) return null;
  const headers = rows[0];
  const body = rows.slice(1);
  return (
    <div style={{ overflowX: "auto", marginBottom: 20 }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "0.9rem",
          fontFamily: "'Manrope', sans-serif",
          border: "1px solid #E5E7EB",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <thead>
          <tr style={{ background: "#1158A6", color: "#fff" }}>
            {headers.map((h, i) => (
              <th
                key={i}
                style={{
                  padding: "10px 14px",
                  textAlign: "left",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, ri) => (
            <tr key={ri} style={{ background: ri % 2 === 0 ? "#fff" : "#F8FAFC" }}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  style={{
                    padding: "9px 14px",
                    color: "#374151",
                    borderBottom: "1px solid #E5E7EB",
                    verticalAlign: "top",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
export function FAQ({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ marginBottom: 20 }}>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #E5E7EB",
            borderRadius: 10,
            marginBottom: 8,
            overflow: "hidden",
          }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: "100%",
              background: open === i ? "#EFF6FF" : "#fff",
              border: "none",
              padding: "14px 16px",
              textAlign: "left",
              fontWeight: 700,
              fontSize: "0.92rem",
              color: "#0D1117",
              cursor: "pointer",
              fontFamily: "'Manrope', sans-serif",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span>{item.q}</span>
            <span style={{ fontSize: "1.1rem", color: "#1158A6", flexShrink: 0 }}>
              {open === i ? "−" : "+"}
            </span>
          </button>
          {open === i && (
            <div
              style={{
                padding: "12px 16px 14px",
                background: "#EFF6FF",
                fontSize: "0.9rem",
                color: "#374151",
                lineHeight: 1.65,
                borderTop: "1px solid #BFDBFE",
              }}
            >
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── SectionHeading ──────────────────────────────────────────────────────────
export function SectionHeading({ children }) {
  return (
    <h2
      style={{
        fontWeight: 800,
        fontSize: "1.3rem",
        color: "#0D1117",
        marginTop: 32,
        marginBottom: 12,
        borderLeft: "4px solid #1158A6",
        paddingLeft: 12,
        fontFamily: "'Manrope', sans-serif",
      }}
    >
      {children}
    </h2>
  );
}

// ─── NormalRangeBox ──────────────────────────────────────────────────────────
export function NormalRangeBox({ title, rows }) {
  return (
    <div
      style={{
        background: "#EFF6FF",
        border: "1px solid #BFDBFE",
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
      }}
    >
      {title && (
        <p style={{ fontWeight: 800, color: "#1158A6", marginBottom: 10, fontSize: "0.95rem" }}>
          {title}
        </p>
      )}
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: i < rows.length - 1 ? "1px solid #BFDBFE" : "none" }}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  style={{
                    padding: "7px 10px",
                    color: ci === 0 ? "#1158A6" : "#374151",
                    fontWeight: ci === 0 ? 700 : 400,
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
