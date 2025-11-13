import React from "react";
import SignaturePreview from "./SignaturePreview";

export default function SignaturePreviewCard(props){
  const { images, name, title, phone, email, accent } = props;
  const base = import.meta.env.BASE_URL;
  const left = images?.leftBlock || base + "left.gif";
  const icons = images?.icons || [ base + "icons/facebook.png", base + "icons/linkedin.png", base + "icons/youtube.png" ];

  return (
    <div className="w-full max-w-[1200px] rounded-2xl border-4 border-black shadow-xl bg-white p-6">
      {/* Skeleton placeholder (top) */}
      <div className="animate-pulse mb-6">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded"></div>
        </div>
        <div className="h-3 bg-gray-200 rounded w-1/3 mt-6 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
      </div>

      {/* Bottom area: signature block aligned bottom-left */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-start gap-6">
          <div className="w-28 h-28 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
            <img src={left} alt="left" className="w-full h-full object-cover" />
          </div>

          <div className="w-0 border-l border-gray-300"></div>

          <div className="flex-1 pl-4">
            <div className="text-lg font-semibold">{name}</div>
            <div className="text-gray-600 mt-1">{title}</div>
            <div className="mt-3 text-sm text-gray-800">
              <span className="text-green-500">wati.io</span> <span className="mx-2 text-gray-400">|</span> <span className="text-green-500">{phone}</span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <a href="https://www.facebook.com/watiglobal/" target="_blank" rel="noreferrer"><img src={icons[0]} width="20" alt="fb" /></a>
              <a href="https://www.linkedin.com/company/watiglobal/" target="_blank" rel="noreferrer"><img src={icons[1]} width="20" alt="li" /></a>
              <a href="https://www.youtube.com/c/watiwhatsappteaminbox/" target="_blank" rel="noreferrer"><img src={icons[2]} width="20" alt="yt" /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
