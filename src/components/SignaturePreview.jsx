import React from "react";

export default function SignaturePreview({ name, title, phone, email, images, accent }) {
  const base = import.meta.env.BASE_URL;

  const left = images.leftBlock || base + "left.gif";

  const icons = images.icons || [
    base + "icons/facebook.png",
    base + "icons/linkedin.png",
    base + "icons/youtube.png"
  ];

  const links = [
    "https://www.facebook.com/watiglobal/",
    "https://www.linkedin.com/company/watiglobal/",
    "https://www.youtube.com/c/watiwhatsappteaminbox/"
  ];

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "#222" }}>
      <table cellPadding="0" cellSpacing="0" border="0" style={{ width: "100%", maxWidth: 720 }}>
        <tbody>
          <tr>
            <td style={{ verticalAlign: "top", paddingRight: 16 }}>
              <img src={left} alt="left block" style={{ width: 110, display: "block" }} />
            </td>
            <td style={{ verticalAlign: "middle" }}>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{name}</div>
              <div style={{ color: "#555", marginTop: 4 }}>{title}</div>
              <div style={{ marginTop: 8 }}>
                <a href={"mailto:" + email} style={{ color: accent, textDecoration: "none" }}>
                  {email}
                </a>
                <span style={{ color: "#ccc", margin: "0 8px" }}>•</span>
                <span style={{ color: accent }}>{phone}</span>
              </div>

              <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                {icons.map((src, i) => (
                  <a key={i} href={links[i]} target="_blank" rel="noreferrer">
                    <img src={src} width="18" alt="icon" />
                  </a>
                ))}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
