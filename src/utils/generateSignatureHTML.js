export const generateSignatureHTML = (data) => {
  const { name, title, phone, email, website, images, accent } = data;
  const { leftBlock, avatar, icons } = images || {};
  const accentColor = accent || "#00E785";

  const iconHtml = (icons || []).map((src) => `<img src="${src}" width="18" style="display:inline-block;margin-right:6px;" />`).join("");

  return `<!doctype html>
<html>
  <body>
    <table cellpadding="0" cellspacing="0" border="0" style="font-family: 'DM Sans', Arial, sans-serif; font-size:14px; color:#222;">
      <tr>
        <td valign="top" style="padding-right:15px;">
          ${leftBlock ? `<img src="${leftBlock}" width="110" style="display:block; border:0; object-fit:cover;" alt="">` : `<div style="width:110px;height:110px;background:${accentColor};"></div>`}
        </td>

        <td valign="middle" style="line-height:1.4;">
          <div style="font-weight:700; font-size:16px; color:#000;">${escapeHtml(name)}</div>
          <div style="color:#555; margin-top:2px;">${escapeHtml(title)}</div>

          <div style="margin-top:8px;">
            <a href="mailto:${escapeHtml(email)}" style="color:${accentColor}; text-decoration:none;">${escapeHtml(email)}</a>
            <span style="color:#ccc; margin:0 8px;">•</span>
            <a href="tel:${escapeHtml(phone)}" style="color:${accentColor}; text-decoration:none;">${escapeHtml(phone)}</a>
          </div>

          <div style="margin-top:8px;">
            <a href="${escapeHtml(website)}" style="color:${accentColor}; text-decoration:none;">${escapeHtml(website)}</a>
          </div>

          <div style="margin-top:10px;">
            ${iconHtml}
          </div>
        </td>

        <td valign="middle" style="text-align:right; padding-left:15px;">
          ${avatar ? `<img src="${avatar}" width="78" height="78" alt="" style="display:block; border:0; object-fit:cover; border-radius:6px;" />` : ""}
        </td>
      </tr>
    </table>
  </body>
</html>`; 
};

function escapeHtml(str = "") {
  return String(str).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}
