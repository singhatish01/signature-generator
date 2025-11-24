import React from "react";

export default function SignaturePreview({ name, title, phone, images }) {
  const base = import.meta.env.BASE_URL;
  const left = images?.leftBlock || base + "left.gif";

  const icons =
    images?.icons || [
      base + "icons/facebook.png",
      base + "icons/linkedin.png",
      base + "icons/youtube.png",
    ];

  const links = [
    "https://www.facebook.com/watiglobal/",
    "https://www.linkedin.com/company/watiglobal/",
    "https://www.youtube.com/c/watiwhatsappteaminbox/",
  ];

  return (
    <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 14, color: "#222" }}>
      <table cellPadding="0" cellSpacing="0" border="0" style={{ width: "100%", maxWidth: 1200 }}>
        <tbody>
          <tr>
            <td style={{ verticalAlign: "top", paddingRight: 24 }}>
              <img src={left} width={120} style={{ display: "block", border: 0, objectFit: "cover" }} alt="left" />
            </td>

            <td style={{ verticalAlign: "middle", lineHeight: 1.4 }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: "#000" }}>{name}</div>
              <div style={{ color: "#555", marginTop: 4 }}>{title}</div>

              <div style={{ marginTop: 8 }}>
                <a href="https://wati.io" target="_blank" rel="noopener noreferrer" style={{ color: "#000", textDecoration: "underline", display: "inline-block" }}>wati.io</a>
                <span style={{ color: "#ccc", margin: "0 6px" }}>|</span>
                <a href={`tel:${phone}`} style={{ color: "#000", textDecoration: "underline", display: "inline-block" }}>{phone}</a>
              </div>

              <div style={{ marginTop: 10 }}>
                {icons.map((src, i) => (
                  <a key={i} href={links[i]} target="_blank" rel="noopener noreferrer" style={{ marginRight: 10 }}>
                    <img src={src} width={18} height={18} style={{ display: "inline-block", border: 0 }} alt="icon" />
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
