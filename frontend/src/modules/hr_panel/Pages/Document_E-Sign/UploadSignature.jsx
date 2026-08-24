import React, { useRef, useState } from "react";

const UploadSignature = ({ onSave, onCancel }) => {
  const fileInputRef = useRef(null);

  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // File type validation
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a PNG or JPG image.");
      return;
    }

    // File size validation
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      alert("File size should not exceed 5 MB.");
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();

    reader.onload = () => {
      setPreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleBrowse = () => {
    fileInputRef.current?.click();
  };

  const removeSignature = () => {
    setPreview(null);
    setFileName("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const saveSignature = () => {
    if (!preview) {
      alert("Please upload your signature first.");
      return;
    }

    onSave(preview);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-slate-900">
          Upload your signature
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Upload an image of your handwritten signature.
        </p>
      </div>

      {!preview ? (
        <>
          {/* Upload Area */}
          <button
            type="button"
            onClick={handleBrowse}
            className="flex min-h-64 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 transition hover:border-indigo-400 hover:bg-indigo-50/30"
          >
            {/* Upload Icon */}
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <svg
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M12 16V4m0 0L8 8m4-4 4 4M4 16.5v1A2.5 2.5 0 006.5 20h11a2.5 2.5 0 002.5-2.5v-1"
                />
              </svg>
            </div>

            <p className="mt-4 text-sm font-semibold text-slate-700">
              Upload your signature
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Click to browse from your computer
            </p>

            <span className="mt-5 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white">
              Browse File
            </span>

            <p className="mt-4 text-xs text-slate-400">
              PNG or JPG • Maximum 5 MB
            </p>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            onChange={handleFileChange}
            className="hidden"
          />
        </>
      ) : (
        /* Preview */
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Signature Preview
              </p>

              <p className="mt-1 text-xs text-slate-500">{fileName}</p>
            </div>

            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
              Ready
            </span>
          </div>

          {/* Image */}
          <div className="flex min-h-64 items-center justify-center rounded-xl border border-slate-200 bg-white p-8">
            <img
              src={preview}
              alt="Uploaded signature"
              className="max-h-40 max-w-full object-contain"
            />
          </div>

          {/* Actions */}
          <div className="mt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={removeSignature}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Remove
            </button>

            <button
              type="button"
              onClick={handleBrowse}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Replace
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={saveSignature}
          disabled={!preview}
          className={`rounded-lg px-5 py-2.5 text-sm font-semibold ${
            preview
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "cursor-not-allowed bg-slate-200 text-slate-400"
          }`}
        >
          Save Signature
        </button>
      </div>
    </div>
  );
};

export default UploadSignature;
