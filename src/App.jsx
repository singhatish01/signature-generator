import React, { useState } from "react";
import SignatureForm from "./components/SignatureForm";
import SignaturePreview from "./components/SignaturePreview";
import { generateSignatureHTML } from "./utils/generateSignatureHTML";
import { saveState, loadState } from "./utils/storage";

export default function App(){
  const [data, setData] = useState(null);

  React.useEffect(()=>{
    loadState().then(saved=>{
      if(saved) setData(saved);
      else setData({
        name: "Full Name",
        title: "Designation",
        phone: "+91 123456789",
        email: "you@company.com",
        images: { leftBlock: "/left.gif", icons: ["/icons/facebook.png","/icons/linkedin.png","/icons/youtube.png"] },
        accent: "#00E785"
      });
    });
  },[]);

  const patch = (p)=> {
    setData(prev=>{
      const updated = { ...prev, ...p };
      saveState(updated);
      return updated;
    });
  };

  if(!data) return <div className="p-6">Loading…</div>;

  const html = generateSignatureHTML(data);

  const copyHtml = () => {
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.left = "-99999px";
    container.style.top = "-99999px";
    container.style.opacity = "0";
    container.innerHTML = html;
    document.body.appendChild(container);
    const range = document.createRange();
    range.selectNodeContents(container);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    try{
      document.execCommand("copy");
      alert("Signature copied! Paste into Gmail → Settings → Signature.");
    }catch(e){
      alert("Copy failed.");
    }
    sel.removeAllRanges();
    document.body.removeChild(container);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-dmsans">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4">
          <SignatureForm data={data} onChange={patch} />
          <button onClick={copyHtml} className="mt-4 px-4 py-2 bg-brandgreen text-black font-semibold rounded">Copy HTML Signature</button>
        </div>
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-white shadow p-6 rounded">
            <h3 className="font-semibold mb-4">Live Preview</h3>
            <SignaturePreview {...data} />
          </div>
        </div>
      </div>
    </div>
  );
}
