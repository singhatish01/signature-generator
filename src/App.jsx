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

  const copyHtml = async () => {
    try {
      await navigator.clipboard.writeText(html);
      alert("Signature HTML copied to clipboard. Paste into Gmail signature editor.");
    } catch (e) {
      alert("Copy failed. Try selecting the HTML and copying manually.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-dmsans">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4">
          <SignatureForm data={data} onChange={patch} />
          <button
            onClick={copyHtml}
            className="mt-4 px-4 py-2 bg-brandgreen text-black font-semibold rounded"
          >
            Copy HTML Signature
          </button>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <div className="bg-white shadow p-6 rounded">
            <h3 className="font-semibold mb-4">Live Preview</h3>
            <SignaturePreview {...data} />
          </div>
          <div className="mt-3 text-sm text-gray-600">
            Tip: After copying the HTML, open Gmail → Settings → Signature → paste the HTML. If Gmail strips styles, open a compose window, paste, then copy that content into Signature settings.
          </div>
        </div>
      </div>
    </div>
  );
}
