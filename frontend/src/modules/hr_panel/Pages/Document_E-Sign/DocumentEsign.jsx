import React, { useState } from "react";
import DrawSignature from "./DrawSignature";
import UploadSignature from "./UploadSignature";
import DocumentEditor from "./DocumentEditor";
import { toast } from "react-toastify";

const DocumentEsign = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [signatureMode, setSignatureMode] = useState(null);
  const [signature, setSignature] = useState(null);
  const [documentData, setDocumentData] = useState(null);

  //HandleSignature
  const handleSaveSignature = (signatureData) => {
    setSignature(signatureData);

    setSignatureMode(null);
  };

  // handleDocumentContinue

  const handleDocumentContinue = (data) => {
    setDocumentData(data);

    console.log("Document data:", data);

    setCurrentStep(3);
  };

  // handleStepContinue
  const handleContinue = () => {
    //1st process signature
    if (currentStep === 1) {
      if (!signature) {
        toast.error("Please draw or upload your signature first.");
        return;
      }
      setCurrentStep(2);
      return;
    }

    //2nd Process upload PDF
    if (currentStep === 2) {
      if (!documentData) {
        toast.error("Please upload and edit your document first");
        return;
      }

      setCurrentStep(3);
      return;
    }
  };

  const steps = [
    {
      id: 1,
      title: "Signature",
      description: "Create your signature",
    },
    {
      id: 2,
      title: "Document",
      description: "Upload & edit document",
    },
    {
      id: 3,
      title: "Finish",
      description: "Review & download",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">
              E-Sign Document
            </h1>

            <p className="text-xs text-slate-500">
              Create and sign your document
            </p>
          </div>

          <button
            type="button"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Save & Exit
          </button>
        </div>
      </header>

      {/* Steeper */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-7">
          <div className="flex items-center">
            {steps.map((step, index) => {
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              const isLast = index === steps.length - 1;

              return (
                <React.Fragment key={step.id}>
                  {/* Step */}
                  <div className="flex items-center gap-3">
                    {/* Number */}
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                        isCompleted
                          ? "bg-emerald-500 text-white"
                          : isActive
                            ? "bg-indigo-600 text-white ring-4 ring-indigo-100"
                            : "border border-slate-300 bg-white text-slate-400"
                      }`}
                    >
                      {isCompleted ? "✓" : step.id}
                    </div>

                    {/* Text */}
                    <div className="hidden sm:block">
                      <p
                        className={`text-sm font-semibold ${
                          isActive || isCompleted
                            ? "text-slate-900"
                            : "text-slate-400"
                        }`}
                      >
                        {step.title}
                      </p>

                      <p className="text-xs text-slate-400">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Connector */}
                  {!isLast && (
                    <div className="mx-4 flex-1">
                      <div
                        className={`h-px w-full transition-all ${
                          currentStep > step.id
                            ? "bg-emerald-500"
                            : "bg-slate-200"
                        }`}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-6 py-10">
        {/* Page Heading */}
        <div className="mb-8">
          <p className="text-sm font-medium text-indigo-600">
            Step {currentStep} of 3
          </p>

          <h2 className="mt-1 text-2xl font-semibold text-slate-900">
            {currentStep === 1 && "Create your signature"}
            {currentStep === 2 && "Upload your document"}
            {currentStep === 3 && "Review your document"}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {currentStep === 1 &&
              "Draw your signature or upload an existing signature."}

            {currentStep === 2 &&
              "Upload your PDF and place your signature and fields."}

            {currentStep === 3 &&
              "Review your document before saving or downloading."}
          </p>
        </div>

        {/* Content Card */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Step 1 Signature Process */}
          {currentStep === 1 && (
            <div className="p-8">
              <div className="mx-auto max-w-2xl">
                <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                    <span className="text-2xl">✍</span>
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-slate-900">
                    Create your signature
                  </h3>

                  <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                    Draw your signature or upload an existing signature image to
                    use on your document.
                  </p>

                  {!signatureMode && (
                    <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={() => setSignatureMode("draw")}
                        className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                      >
                        Draw Signature
                      </button>

                      <button
                        type="button"
                        onClick={() => setSignatureMode("upload")}
                        className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        Upload Signature
                      </button>
                    </div>
                  )}

                  {/* Draw */}
                  {signatureMode === "draw" && (
                    <DrawSignature
                      onSave={handleSaveSignature}
                      onCancel={() => setSignatureMode(null)}
                    />
                  )}

                  {/* Upload */}
                  {signatureMode === "upload" && (
                    <UploadSignature
                      onSave={handleSaveSignature}
                      onCancel={() => setSignatureMode(null)}
                    />
                  )}

                  {/* Saved Signature */}
                  {signature && (
                    <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-emerald-800">
                            Signature saved
                          </p>

                          <p className="mt-1 text-xs text-emerald-600">
                            Your signature is ready to use.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => setSignatureMode("draw")}
                          className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
                        >
                          Change
                        </button>
                      </div>

                      <div className="mt-4 flex min-h-32 items-center justify-center rounded-lg border border-emerald-100 bg-white p-5">
                        <img
                          src={signature}
                          alt="Saved signature"
                          className="max-h-24 max-w-xs object-contain"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2 Upload a PDF Document */}
          {currentStep === 2 && (
            <DocumentEditor
              signature={signature}
              onBack={() => setCurrentStep(1)}
              onContinue={handleDocumentContinue}
            />
          )}

          {/* STEP 3 */}
          {currentStep === 3 && (
            <div className="p-8">
              <div className="mx-auto max-w-2xl">
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-8 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    ✓
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-slate-900">
                    Document is ready
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Review your signed document and download the final PDF.
                  </p>

                  <div className="mt-6 flex justify-center gap-3">
                    <button
                      type="button"
                      className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Save Draft
                    </button>

                    <button
                      type="button"
                      className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                    >
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-8 py-4">
            {/* Back */}
            <button
              type="button"
              disabled={currentStep === 1}
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                currentStep === 1
                  ? "cursor-not-allowed text-slate-300"
                  : "text-slate-600 hover:bg-white hover:text-slate-900"
              }`}
            >
              ← Back
            </button>

            {/* Continue */}
            {currentStep < 3 && (
              <button
                type="button"
                onClick={handleContinue}
                className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Continue →
              </button>
            )}

            {/* Finish */}
            {currentStep === 3 && (
              <button
                type="button"
                className="rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Complete
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DocumentEsign;
