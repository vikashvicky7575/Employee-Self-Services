import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Rnd } from "react-rnd";
import { toast } from "react-toastify";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const DocumentEditor = ({ signature, onContinue }) => {
  const [pdfFile, setPdfFile] = useState(null);
  const [numPages, setNumPages] = useState(null);

  const [signatureFields, setSignatureFields] = useState([]);

  const [selectedSignature, setSelectedSignature] = useState(null);

  const [pageWidth] = useState(700);

  // Upload Pdf

  const handlePdfUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file.");
      return;
    }

    setPdfFile(file);
    // Remove previously placed signatures
    setSignatureFields([]);
    setSelectedSignature(null);
  };

  //PDF Load
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  //Drag Signature toolbar
  const handleDragStart = (event) => {
    if (!signature) {
      event.preventDefault();
      return;
    }

    event.dataTransfer.effectAllowed = "copy";
    event.dataTransfer.setData("signature", "true");
  };

  // Drop signature on PDF
  const handleDrop = (event, pageNumber) => {
    event.preventDefault();

    if (!signature) {
      toast.error("Please create your signature first.");
      return;
    }

    const isSignature = event.dataTransfer.getData("signature");

    if (isSignature !== "true") return;

    // const pageElement = event.currentTarget;

    const rect = event.currentTarget.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newSignature = {
      id: crypto.randomUUID(),
      page: pageNumber,

      x: Math.max(0, x - 70),
      y: Math.max(0, y - 25),

      width: 140,
      height: 50,

      image: signature,
    };

    setSignatureFields((prev) => [...prev, newSignature]);

    setSelectedSignature(newSignature.id);
  };

  //Allow Drop

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  //Move Signature
  const handleSignatureDragStop = (id, position) => {
    setSignatureFields((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              x: position.x,
              y: position.y,
            }
          : item,
      ),
    );
  };

  //  Resize Signature
  const handleSignatureResizeStop = (id, ref, position) => {
    setSignatureFields((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              width: ref.offsetWidth,
              height: ref.offsetHeight,
              x: position.x,
              y: position.y,
            }
          : item,
      ),
    );
  };

  // Delete Signature
  const deleteSignature = (id) => {
    setSignatureFields((prev) => prev.filter((item) => item.id !== id));

    setSelectedSignature(null);
  };

  //selectSignature
  const selectSignature = (id) => {
    setSelectedSignature(id);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Top Bar */}
      <div className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div className="flex h-16 items-center justify-between px-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Document Editor
            </h2>

            <p className="text-xs text-slate-500">
              Upload your document and place signatures
            </p>
          </div>
        </div>
      </div>

      {/* Edit Layout */}
      <div className="flex">
        {/* Left Toolbar */}

        <aside className="sticky top-16 h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-slate-200 bg-white">
          <div className="p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              E-Sign Tools
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              Drag a field onto the document
            </p>

            {/* Signature Tool */}

            <div
              draggable={Boolean(signature)}
              onDragStart={handleDragStart}
              className={`mt-5 rounded-xl border p-4 transition ${
                signature
                  ? "cursor-grab border-indigo-200 bg-indigo-50 hover:border-indigo-400 hover:bg-indigo-100 active:cursor-grabbing"
                  : "cursor-not-allowed border-slate-200 bg-slate-50 opacity-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-lg shadow-sm">
                  ✍
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Signature
                  </p>

                  <p className="text-xs text-slate-500">Drag to document</p>
                </div>
              </div>
            </div>

            {/* Future tools */}

            <div className="mt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                More Fields
              </p>

              <div className="space-y-2">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 opacity-60">
                  <p className="text-sm font-medium text-slate-600">Aa Text</p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 opacity-60">
                  <p className="text-sm font-medium text-slate-600">👤 Name</p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 opacity-60">
                  <p className="text-sm font-medium text-slate-600">📅 Date</p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 opacity-60">
                  <p className="text-sm font-medium text-slate-600">
                    ☑ Checkbox
                  </p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 opacity-60">
                  <p className="text-sm font-medium text-slate-600">
                    A Initials
                  </p>
                </div>
              </div>
            </div>

            {/* Signature count */}

            <div className="mt-8 rounded-xl bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Signatures placed
                </span>

                <span className="text-sm font-semibold text-slate-900">
                  {signatureFields.length}
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Edit */}

        {/* PDf Area */}
        <main className="flex-1 overflow-auto">
          {!pdfFile ? (
            // Upload Screen
            <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-10">
              <div className="w-full max-w-xl">
                <label
                  htmlFor="pdf-upload"
                  className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white px-8 py-20 text-center transition hover:border-indigo-400 hover:bg-indigo-50/30"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
                    📄
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-slate-900">
                    Upload your PDF
                  </h3>

                  <p className="mt-2 max-w-sm text-sm text-slate-500">
                    Upload the document you want to sign. You can place multiple
                    signatures across multiple pages.
                  </p>

                  <span className="mt-6 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white">
                    Upload PDF
                  </span>

                  <p className="mt-4 text-xs text-slate-400">PDF files only</p>
                </label>

                <input
                  id="pdf-upload"
                  type="file"
                  accept="application/pdf"
                  onChange={handlePdfUpload}
                  className="hidden"
                />
              </div>
            </div>
          ) : (
            //  Pdf View

            <div className="p-8">
              {/* Document info */}

              {/* Pdf tilte header */}
              <div className="mx-auto mb-6 flex max-w-3xl items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-500">
                    PDF
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {pdfFile.name}
                    </p>

                    <p className="text-xs text-slate-400">
                      {numPages || 0} pages
                    </p>
                  </div>
                </div>

                <label
                  htmlFor="replace-pdf"
                  className="cursor-pointer rounded-lg border border-slate-300 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
                >
                  Replace PDF
                </label>

                <input
                  id="replace-pdf"
                  type="file"
                  accept="application/pdf"
                  onChange={handlePdfUpload}
                  className="hidden"
                />
              </div>

              {/* PDF */}
              <Document
                file={pdfFile}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                  <div className="py-20 text-center text-sm text-slate-500">
                    Loading PDF...
                  </div>
                }
                error={
                  <div className="py-20 text-center text-sm text-red-500">
                    Failed to load PDF.
                  </div>
                }
              >
                {Array.from(new Array(numPages || 0), (_, index) => {
                  const pageNumber = index + 1;

                  const pageSignatures = signatureFields.filter(
                    (item) => item.page === pageNumber,
                  );

                  return (
                    <div
                      key={`page_${pageNumber}`}
                      className="mb-8 flex justify-center"
                    >
                      <div
                        className="relative bg-white shadow-lg"
                        style={{
                          width: pageWidth,
                        }}
                        onDrop={(event) => handleDrop(event, pageNumber)}
                        onDragOver={handleDragOver}
                        onClick={() => setSelectedSignature(null)}
                      >
                        {/* PDF Page */}

                        <Page
                          pageNumber={pageNumber}
                          width={pageWidth}
                          renderTextLayer={true}
                          renderAnnotationLayer={true}
                        />

                        {/* Page Number */}

                        <div className="absolute -left-16 top-2 rounded-md bg-slate-800 px-2 py-1 text-xs text-white">
                          Page {pageNumber}
                        </div>

                        {/* Signatures */}

                        {pageSignatures.map((item) => {
                          const isSelected = selectedSignature === item.id;

                          return (
                            <Rnd
                              key={item.id}
                              size={{
                                width: item.width,
                                height: item.height,
                              }}
                              position={{
                                x: item.x,
                                y: item.y,
                              }}
                              bounds="parent"
                              minWidth={80}
                              minHeight={30}
                              enableResizing={{
                                top: true,
                                right: true,
                                bottom: true,
                                left: true,
                                topRight: true,
                                bottomRight: true,
                                bottomLeft: true,
                                topLeft: true,
                              }}
                              style={{
                                zIndex: isSelected ? 100 : 20,
                              }}
                              onMouseDown={(event) => {
                                event.stopPropagation();
                                setSelectedSignature(item.id);
                              }}
                              onDragStart={(event) => {
                                event.stopPropagation();
                                setSelectedSignature(item.id);
                              }}
                              onDragStop={(event, data) => {
                                event.stopPropagation();

                                handleSignatureDragStop(item.id, {
                                  x: data.x,
                                  y: data.y,
                                });
                              }}
                              onResizeStart={(event) => {
                                event.stopPropagation();
                                setSelectedSignature(item.id);
                              }}
                              onResizeStop={(
                                event,
                                direction,
                                ref,
                                delta,
                                position,
                              ) => {
                                event.stopPropagation();

                                handleSignatureResizeStop(
                                  item.id,
                                  ref,
                                  position,
                                );
                              }}
                              className={`group ${
                                selectedSignature === item.id
                                  ? "ring-2 ring-indigo-500"
                                  : "ring-1 ring-indigo-200"
                              }`}
                            >
                              <div className="relative flex h-full w-full items-center justify-center bg-white/80">
                                <img
                                  src={item.image}
                                  alt="Signature"
                                  className="h-full w-full object-contain"
                                  draggable={false}
                                />

                                {/* Delete */}

                                {selectedSignature === item.id && (
                                  <button
                                    type="button"
                                    onClick={(event) => {
                                      event.stopPropagation();

                                      deleteSignature(item.id);
                                    }}
                                    className="absolute -right-3 -top-3 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white shadow hover:bg-red-600"
                                  >
                                    ×
                                  </button>
                                )}
                              </div>
                            </Rnd>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </Document>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DocumentEditor;
