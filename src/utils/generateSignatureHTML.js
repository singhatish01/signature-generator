export const generateSignatureHTML = (data) => {
  const { name, title, phone, images } = data;

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

  const iconHtml = icons
    .map(
      (src, i) =>
        `<a href="${links[i]}" target="_blank" rel="noopener noreferrer"><img src="${src}" width="18" height="18" style="display:inline-block;margin-right:10px;border:0;" /></a>`
    )
    .join('');

  return `<!doctype html>
<html>
  <body>
    <table cellpadding="0" cellspacing="0" border="0" style="font-family:'DM Sans', Arial, sans-serif; font-size:14px; color:#222;">
      <tr>
        <td valign="top" style="padding-right:24px;">
          <img src="${left}" width="120" style="display:block;border:0;object-fit:cover;" alt="left" />
        </td>
        <td valign="middle" style="line-height:1.4;">
          <div style="font-weight:700; font-size:16px; color:#000;">${escapeHtml(name)}</div>
          <div style="color:#555; margin-top:4px;">${escapeHtml(title)}</div>
          <div style="margin-top:8px;">
            <a href="https://wati.io" style="color:#000; text-decoration:underline; display:inline-block;">wati.io</a>
            <span style="color:#ccc; margin:0 6px;">|</span>
            <a href="tel:${escapeHtml(phone)}" style="color:#000; text-decoration:underline; display:inline-block;">${escapeHtml(phone)}</a>
          </div>
          <div style="margin-top:10px;">${iconHtml}</div>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
