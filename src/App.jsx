import React, { useState } from "react";
import SignatureForm from "./components/SignatureForm";
import SignaturePreview from "./components/SignaturePreview";
import { generateSignatureHTML } from "./utils/generateSignatureHTML";

export default function App() {
  const [data, setData] = useState({
    name: "Full Name",
    title: "Designation",
    phone: "+91 123456789",
    email: "you@company.com",
    website: "https://wati.io",
    images: { avatar: null, leftBlock: null, icons: [] },
    accent: "#00E785",
  });

  const patch = (p) => setData((d) => ({ ...d, ...p }));

  const html = generateSignatureHTML(data);

  // ------------------------------
  // RICH HTML COPY FOR GMAIL
  // ------------------------------
  const copyHtml = () => {
    // Create temporary hidden container
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.left = "-99999px";
    container.style.top = "-99999px";
    container.style.opacity = "0";
    container.innerHTML = html;

    document.body.appendChild(container);

    const range = document.createRange();
    range.selectNodeContents(container);

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    try {
      const success = document.execCommand("copy");
      if (success) {
        alert("Signature copied! Now go to Gmail → Settings → Signature and paste it.");
      } else {
        alert("Copy failed. Try again.");
      }
    } catch (err) {
      alert("Copy not supported on this browser.");
    }

    selection.removeAllRanges();
    document.body.removeChild(container);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-dmsans">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        
        {/* LEFT SIDE — FORM */}
        <div className="col-span-12 lg:col-span-4">
          <SignatureForm data={data} onChange={patch} />

          <button
            onClick={copyHtml}
            className="mt-4 px-4 py-2 bg-brandgreen text-black font-semibold rounded"
          >
            Copy HTML Signature
          </button>
        </div>

        {/* RIGHT SIDE — LIVE PREVIEW */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-white shadow p-6 rounded">
            <h3 className="font-semibold mb-4">Live Preview</h3>
            <SignaturePreview {...data} />
          </div>

          <div className="mt-3 text-sm text-gray-600">
            After copying, paste the signature here:  
            <br />
            <b>Gmail → Settings → See all settings → Signature</b>
          </div>
        </div>

      </div>
    </div>
  );
}
