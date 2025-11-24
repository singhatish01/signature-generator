import React from "react";

export default function SignatureForm({ data, onChange }) {
  const update = (k, v) => onChange({ [k]: v });

  return (
    <div className="bg-white shadow p-6 rounded">
      <h2 className="text-lg font-semibold mb-4">Signature Builder</h2>

      <div className="grid gap-3">
        <input className="border px-3 py-2 rounded" value={data.name} onChange={(e)=>update('name', e.target.value)} placeholder="Full name" />
        <input className="border px-3 py-2 rounded" value={data.title} onChange={(e)=>update('title', e.target.value)} placeholder="Designation" />
        <input className="border px-3 py-2 rounded" value={data.phone} onChange={(e)=>update('phone', e.target.value)} placeholder="Phone" />
      </div>

      <div className="text-xs text-gray-500 mt-3">Left GIF and social icons are fixed.</div>
    </div>
  );
}
