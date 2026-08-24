import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

const DrawSignature = ({ onSave, onCancel }) => {
  const signatureRef = useRef(null);

  const clearSignature = () => {
    signatureRef.current?.clear();
  };

  const saveSignature = () => {
    if (signatureRef.current?.isEmpty()) {
      alert("Please draw your signature first.");
      return;
    }

    const signatureData = signatureRef.current
      .getCanvas()
      .toDataURL("image/png");

    onSave(signatureData);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-slate-900">
          Draw your signature
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Use your mouse, trackpad, or touchscreen to draw your signature.
        </p>
      </div>

      {/* Signature Area */}
      <div className="overflow-hidden rounded-xl border border-slate-300 bg-white">
        <div className="relative h-64 w-full">
          {/* Placeholder */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="text-sm text-slate-300">Sign here</span>
          </div>

          <SignatureCanvas
            ref={signatureRef}
            penColor="#111827"
            minWidth={1}
            maxWidth={2.5}
            canvasProps={{
              className: "h-full w-full",
            }}
          />
        </div>

        {/* Bottom Line */}
        <div className="border-t border-slate-200 px-4 py-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Signature</span>

            <button
              type="button"
              onClick={clearSignature}
              className="text-xs font-medium text-slate-500 hover:text-slate-900"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={saveSignature}
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Save Signature
        </button>
      </div>
    </div>
  );
};

export default DrawSignature;
