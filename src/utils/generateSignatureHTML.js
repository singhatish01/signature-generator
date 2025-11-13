export const generateSignatureHTML = (data) => {
  const { name, title, phone, email, images, accent } = data;
  const base = import.meta.env.BASE_URL;
  const left = images?.leftBlock || base + "left.gif";
  const icons = images?.icons || [ base + "icons/facebook.png", base + "icons/linkedin.png", base + "icons/youtube.png" ];
  const links = [ "https://www.facebook.com/watiglobal/","https://www.linkedin.com/company/watiglobal/","https://www.youtube.com/c/watiwhatsappteaminbox/" ];

  const iconHtml = icons.map((s,i)=>`<a href="${links[i]}" target="_blank" rel="noopener noreferrer"><img src="${s}" width="18" style="display:inline-block;margin-right:6px;" /></a>`).join('');

  return `<!doctype html>
<html>
  <body>
    <table cellpadding="0" cellspacing="0" border="0" style="font-family: 'DM Sans', Arial, sans-serif; font-size:14px; color:#222;">
      <tr>
        <td valign="top" style="padding-right:15px;">
          <img src="${left}" width="110" style="display:block;border:0;object-fit:cover;" alt="left" />
        </td>
        <td valign="middle" style="line-height:1.4;">
          <div style="font-weight:700; font-size:16px; color:#000;">${escapeHtml(name)}</div>
          <div style="color:#555; margin-top:2px;">${escapeHtml(title)}</div>
          <div style="margin-top:8px;">
            <a href="mailto:${escapeHtml(email)}" style="color:${accent}; text-decoration:none;">${escapeHtml(email)}</a>
            <span style="color:#ccc; margin:0 8px;">•</span>
            <span style="color:${accent}; text-decoration:none;">${escapeHtml(phone)}</span>
          </div>
          <div style="margin-top:10px;">
            ${iconHtml}
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};

function escapeHtml(str=''){ return String(str).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,"&#39;").replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
