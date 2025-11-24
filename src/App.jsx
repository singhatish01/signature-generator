import React from "react";
import SignaturePreview from "./SignaturePreview";

export default function SignaturePreviewCard({ name, title, phone, images }) {
  return (
    <div className="w-full max-w-[1200px] rounded-2xl border-4 border-black shadow-xl bg-white p-8">

      {/* -------------------- GREY SKELETON -------------------- */}
      <div className="mb-8">
        {/* Top short bar */}
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>

        {/* Long skeleton lines */}
        <div className="space-y-3">
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded"></div>
        </div>

        {/* Shorter bottom skeleton */}
        <div className="h-3 bg-gray-200 rounded w-1/4 mt-6 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/5"></div>
      </div>

      {/* -------------------- DIVIDER LINE -------------------- */}
      <div className="border-t border-gray-200 pt-6">
        <SignaturePreview
          name={name}
          title={title}
          phone={phone}
          images={images}
        />
      </div>
    </div>
  );
}
