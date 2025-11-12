import React, { useCallback, useState, useEffect } from "react";
import Cropper from "react-easy-crop";

/**
 * Crop static images. Animated GIFs bypass cropping in the uploader to preserve frames.
 */

function createImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.setAttribute("crossOrigin", "anonymous");
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = url;
  });
}

async function getCroppedImg(imageSrc, pixelCrop) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d");

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        resolve(reader.result);
      };
    }, "image/png");
  });
}

export default function ImageCropper({ file, onComplete, onCancel }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result);
    reader.readAsDataURL(file);
  }, [file]);

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const apply = async () => {
    const cropped = await getCroppedImg(imageSrc, croppedAreaPixels);
    onComplete(cropped);
  };

  return (
    <div>
      <div className="w-full h-80 relative bg-black">
        {imageSrc && (
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        )}
      </div>

      <div className="flex items-center gap-3 mt-3">
        <label className="text-sm">Zoom</label>
        <input type="range" min={1} max={3} step={0.01} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className="w-full" />
      </div>

      <div className="mt-3 flex gap-2">
        <button onClick={apply} className="px-3 py-2 bg-brandgreen text-black rounded">Apply</button>
        <button onClick={onCancel} className="px-3 py-2 bg-gray-300 rounded">Cancel</button>
      </div>
    </div>
  );
}
