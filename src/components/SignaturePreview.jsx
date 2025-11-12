import React from "react";

/**
 * On-screen preview using inline styles that closely match the generated HTML.
 */
export default function SignaturePreview({ name, title, phone, email, website, images, accent }) {
  const { leftBlock, avatar, icons } = images || {};
  const accentColor = accent || "#00E785";

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#222", maxWidth: 760 }}>
      <table cellPadding="0" cellSpacing="0" border="0" style={{ width: "100%" }}>
        <tbody>
          <tr>
            <td style={{ verticalAlign: "top", paddingRight: 16, width: 120 }}>
              {leftBlock ? <img src={leftBlock} alt="left" style={{ width: 110, display: "block" }} /> : <div style={{ width: 110, height: 110, background: accentColor }} />}
            </td>

            <td style={{ verticalAlign: "middle" }}>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{name}</div>
              <div style={{ color: "#555", marginTop: 4 }}>{title}</div>

              <div style={{ marginTop: 8 }}>
                <a href={`mailto:${email}`} style={{ color: accentColor, textDecoration: "none", marginRight: 10 }}>{email}</a>
                <span style={{ color: "#ccc", margin: "0 8px" }}>•</span>
                <a href={`tel:${phone}`} style={{ color: accentColor, textDecoration: "none" }}>{phone}</a>
              </div>

              <div style={{ marginTop: 8 }}>
                <a href={website} style={{ color: accentColor, textDecoration: "none" }}>{website}</a>
              </div>

              <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                {icons && icons.map((src, i) => <img key={i} src={src} width="18" alt={`icon-${i}`} />)}
              </div>
            </td>

            <td style={{ verticalAlign: "middle", width: 90, textAlign: "right" }}>
              {avatar ? <img src={avatar} alt="avatar" style={{ width: 78, height: 78, objectFit: "cover", borderRadius: 8 }} /> : <div style={{ width: 78, height: 78, background: "#eee", borderRadius: 8 }} />}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
