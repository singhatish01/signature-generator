import React, { useState } from "react";
import SignatureForm from "./components/SignatureForm";
import SignaturePreview from "./components/SignaturePreview";
import { saveState, loadState } from "./utils/storage";
import { generateSignatureHTML } from "./utils/generateSignatureHTML";

export default function App() {
  const [data, setData] = useState(null);

  React.useEffect(() => {
    loadState().then((saved) => {
      const base = import.meta.env.BASE_URL;
      const initial = saved || {
        name: "Full Name",
        title: "Designation",
        phone: "+91 123456789",
        images: {
          leftBlock: base + "left.gif",
          icons: [
            base + "icons/facebook.png",
            base + "icons/linkedin.png",
            base + "icons/youtube.png",
          ],
        },
      };
      setData(initial);
    });
  }, []);

  const patch = (p) => {
    setData((prev) => {
      const updated = { ...prev, ...p };
      saveState(updated);
      return updated;
    });
  };

  if (!data) return <div className="p-6">Loading…</div>;

  const html = generateSignatureHTML(data);

  const copyHtml = () => {
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.left = "-99999px";
    container.style.top = "-99999px";
    container.innerHTML = html;
    document.body.appendChild(container);
    const range = document.createRange();
    range.selectNodeContents(container);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    try {
      document.execCommand("copy");
      alert("Signature copied! Paste into Gmail → Settings → Signature.");
    } catch (e) {
      alert("Copy failed.");
    }
    sel.removeAllRanges();
    document.body.removeChild(container);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-[95%] mx-auto grid grid-cols-12 gap-6 items-start">
        <div className="col-span-12 lg:col-span-8 flex justify-center lg:justify-start">
          <SignaturePreview name={data.name} title={data.title} phone={data.phone} images={data.images} />
        </div>

        <div className="col-span-12 lg:col-span-4">
          <SignatureForm data={data} onChange={patch} />
          <button onClick={copyHtml} className="mt-6 px-5 py-3 bg-black text-white rounded-md inline-flex items-center gap-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 1H4a2 2 0 0 0-2 2v14" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="8" y="5" width="13" height="13" rx="2" stroke="#ffffff" strokeWidth="2"/></svg>
            <span className="text-sm font-semibold">Copy Signature to Clipboard</span>
          </button>
        </div>
      </div>
    </div>
  );
}
