import React from "react";

export default function SignatureForm({ data, onChange }){
  return (
    <div className="bg-white shadow p-6 rounded">
      <h2 className="text-lg font-semibold mb-4">Signature Builder</h2>
      <div className="grid gap-3">
        <input className="border px-3 py-2 rounded" value={data.name} onChange={(e)=>onChange({name:e.target.value})} placeholder="Full name" />
        <input className="border px-3 py-2 rounded" value={data.title} onChange={(e)=>onChange({title:e.target.value})} placeholder="Designation" />
        <input className="border px-3 py-2 rounded" value={data.phone} onChange={(e)=>onChange({phone:e.target.value})} placeholder="Phone" />
        <input className="border px-3 py-2 rounded" value={data.email} onChange={(e)=>onChange({email:e.target.value})} placeholder="Email" />
      </div>
      <div className="text-xs text-gray-500 mt-3">Left GIF and social icons are fixed for all users.</div>
    </div>
  );
}
