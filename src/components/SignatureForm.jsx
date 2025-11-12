import React, { useState } from "react";
import ImageCropper from "./ImageCropper";

/**
 * Uploads: leftBlock (square), avatar (crop), icons (multiple).
 * GIFs bypass cropping to preserve animation.
 */
export default function SignatureForm({ data, onChange }) {
  const [cropFile, setCropFile] = useState(null);
  const [target, setTarget] = useState(null);

  const handleUpload = (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const isGif = file.type && file.type.toLowerCase().includes("gif");

    if (isGif) {
      const reader = new FileReader();
      reader.onload = () => {
        if (field === "icons") {
          onChange({ images: { ...data.images, icons: [...data.images.icons, reader.result] } });
        } else {
          onChange({ images: { ...data.images, [field]: reader.result } });
        }
      };
      reader.readAsDataURL(file);
      return;
    }

    // For static images, open cropper
    setTarget(field);
    setCropFile(file);
  };

  const applyCrop = (url) => {
    if (target === "icons") {
      onChange({ images: { ...data.images, icons: [...data.images.icons, url] } });
    } else {
      onChange({ images: { ...data.images, [target]: url } });
    }
    setCropFile(null);
    setTarget(null);
  };

  return (
    <div className="bg-white shadow p-6 rounded">
      <h2 className="text-lg font-semibold mb-4">Signature Builder</h2>

      <label className="text-sm font-medium">Left Block Image</label>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
          {data.images.leftBlock ? <img src={data.images.leftBlock} alt="left" className="w-full h-full object-cover" /> : <div className="text-xs text-gray-400">Empty</div>}
        </div>
        <input type="file" accept="image/*" onChange={(e) => handleUpload(e, "leftBlock")} />
      </div>

      <label className="text-sm font-medium">Profile / Avatar</label>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
          {data.images.avatar ? <img src={data.images.avatar} alt="avatar" className="w-full h-full object-cover" /> : <div className="text-xs text-gray-400">Empty</div>}
        </div>
        <input type="file" accept="image/*" onChange={(e) => handleUpload(e, "avatar")} />
      </div>

      <label className="text-sm font-medium">Social Icons (upload multiple)</label>
      <div className="flex items-center gap-3 mb-3">
        <div className="flex gap-2">
          {data.images.icons.map((src, i) => (
            <img key={i} src={src} width="28" alt={`icon-${i}`} />
          ))}
        </div>
        <input type="file" accept="image/*" onChange={(e) => handleUpload(e, "icons")} />
      </div>

      <div className="grid gap-3 mt-4">
        <input className="border px-3 py-2 rounded" value={data.name} onChange={(e) => onChange({ name: e.target.value })} placeholder="Full name" />
        <input className="border px-3 py-2 rounded" value={data.title} onChange={(e) => onChange({ title: e.target.value })} placeholder="Designation" />
        <input className="border px-3 py-2 rounded" value={data.phone} onChange={(e) => onChange({ phone: e.target.value })} placeholder="Phone" />
        <input className="border px-3 py-2 rounded" value={data.email} onChange={(e) => onChange({ email: e.target.value })} placeholder="Email" />
        <input className="border px-3 py-2 rounded" value={data.website} onChange={(e) => onChange({ website: e.target.value })} placeholder="Website" />
      </div>

      {cropFile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-white p-4 rounded w-full max-w-2xl">
            <ImageCropper file={cropFile} onComplete={applyCrop} onCancel={() => { setCropFile(null); setTarget(null); }} />
          </div>
        </div>
      )}
    </div>
  );
}
