// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import { useDropzone } from "react-dropzone";
// import { PDFDocument } from "pdf-lib";
// import { Rnd } from "react-rnd";

// import {
//   FiFileText,
//   FiCheckCircle,
//   FiUploadCloud,
//   FiDownload,
//   FiSave,
//   FiEdit3,
//   FiTrash2,
//   FiX,
//   FiMove,
// } from "react-icons/fi";

// import "react-pdf/dist/Page/AnnotationLayer.css";
// import "react-pdf/dist/Page/TextLayer.css";

// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

// // Signature Pad
// const SignaturePad = ({ onSave, onClose }) => {
//   const canvasRef = useRef(null);

//   //   const fileInputRef = useRef(null);

//   const isDrawing = useRef(false);

//   const lastPoint = useRef({
//     x: 0,
//     y: 0,
//   });

//   useEffect(() => {
//     const canvas = canvasRef.current;

//     if (!canvas) return;

//     const rect = canvas.getBoundingClientRect();

//     const dpr = window.devicePixelRatio || 1;

//     canvas.width = rect.width * dpr;
//     canvas.height = rect.height * dpr;

//     const ctx = canvas.getContext("2d");

//     ctx.scale(dpr, dpr);

//     ctx.lineWidth = 2.5;
//     ctx.lineCap = "round";
//     ctx.lineJoin = "round";
//     ctx.strokeStyle = "#111827";
//   }, []);

//   const getPoint = (event) => {
//     const canvas = canvasRef.current;

//     const rect = canvas.getBoundingClientRect();

//     return {
//       x: event.clientX - rect.left,
//       y: event.clientY - rect.top,
//     };
//   };

//   const startDrawing = (event) => {
//     const point = getPoint(event);

//     isDrawing.current = true;

//     lastPoint.current = point;
//   };

//   const draw = (event) => {
//     if (!isDrawing.current) return;

//     const canvas = canvasRef.current;

//     const ctx = canvas.getContext("2d");

//     const point = getPoint(event);

//     ctx.beginPath();

//     ctx.moveTo(lastPoint.current.x, lastPoint.current.y);

//     ctx.lineTo(point.x, point.y);

//     ctx.stroke();

//     lastPoint.current = point;
//   };

//   const stopDrawing = () => {
//     isDrawing.current = false;
//   };

//   const clearSignature = () => {
//     const canvas = canvasRef.current;

//     const ctx = canvas.getContext("2d");

//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//   };

//   const saveSignature = () => {
//     const canvas = canvasRef.current;

//     if (!canvas) return;

//     const image = canvas.toDataURL("image/png");

//     onSave(image);

//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
//       <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
//         {/* Header */}
//         {/* Drwaing signature tab */}
//         <div className="flex items-center justify-between border-b px-6 py-4">
//           <div>
//             <h2 className="text-xl font-semibold text-gray-800">
//               Draw Your Signature
//             </h2>

//             <p className="mt-1 text-sm text-gray-500">
//               Draw your signature inside the box below.
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={onClose}
//             className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
//           >
//             <FiX size={22} />
//           </button>
//         </div>

//         {/* Canvas */}

//         <div className="p-6">
//           <div className="overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50">
//             <canvas
//               ref={canvasRef}
//               className="h-56 w-full cursor-crosshair touch-none bg-white"
//               onPointerDown={startDrawing}
//               onPointerMove={draw}
//               onPointerUp={stopDrawing}
//               onPointerLeave={stopDrawing}
//             />
//           </div>

//           <p className="mt-2 text-xs text-gray-400">
//             Use your mouse or touchpad to draw your signature.
//           </p>
//         </div>

//         {/* Actions */}

//         <div className="flex justify-between border-t bg-gray-50 px-6 py-4">
//           <button
//             type="button"
//             onClick={clearSignature}
//             className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
//           >
//             <FiTrash2 size={17} />
//             Clear
//           </button>

//           <div className="flex gap-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
//             >
//               Cancel
//             </button>

//             <button
//               type="button"
//               onClick={saveSignature}
//               className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
//             >
//               <FiCheckCircle size={17} />
//               Use Signature
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // main ui page

// const DocumentEsign1 = () => {
//   // Pdf State or document
//   const [documentFile, setDocumentFile] = useState(null);

//   // Signature UseState

//   const [signatureImage, setSignatureImage] = useState(null);

//   const [showSignaturePad, setShowSignaturePad] = useState(false);

//   // Signature Position
//   const [signaturePosition, setSignaturePosition] = useState({
//     x: 100,
//     y: 400,
//   });

//   // Signature Size
//   const [signatureSize, setSignatureSize] = useState({
//     width: 180,
//     height: 80,
//   });

//   // Pdf Container
//   const pdfContainerRef = useRef(null);

//   //Pdf Display
//   const [pdfDisplaySize, setPdfDisplaySize] = useState({
//     width: 0,
//     height: 0,
//   });

//   //Pdf Load
//   const onDocumentLoadSuccess = ({ numPages }) => {
//     console.log("PDF loaded successfully");
//   };

//   // Document Upload
//   const onDropDocument = useCallback((acceptedFiles) => {
//     if (!acceptedFiles || acceptedFiles.length === 0) {
//       return;
//     }

//     const file = acceptedFiles[0];

//     if (file.type !== "application/pdf") {
//       alert("Please upload a PDF file.");
//       return;
//     }

//     if (file.size > 20 * 1024 * 1024) {
//       alert("PDF size must be less than 20MB.");
//       return;
//     }

//     setDocumentFile(file);

//     setSignatureImage(null);

//     setSignaturePosition({
//       x: 100,
//       y: 400,
//     });
//   }, []);

//   //Dropzone
//   const {
//     getRootProps: getDocumentRootProps,
//     getInputProps: getDocumentInputProps,
//   } = useDropzone({
//     onDrop: onDropDocument,
//     multiple: false,
//     accept: {
//       "application/pdf": [".pdf"],
//     },
//   });

//   //FileSize
//   const formatFileSize = (size) => {
//     if (!size) {
//       return "0 KB";
//     }

//     return `${(size / 1024).toFixed(1)} KB`;
//   };

//   //Signature Created
//   const handleSignatureSave = (image) => {
//     setSignatureImage(image);

//     setSignaturePosition({
//       x: 100,
//       y: 400,
//     });
//   };

//   //  Signature Drag

//   const handleSignatureDragStop = (event, data) => {
//     setSignaturePosition({
//       x: data.x,
//       y: data.y,
//     });
//   };

//   const handleSignatureResizeStop = (
//     event,
//     direction,
//     ref,
//     delta,
//     position,
//   ) => {
//     setSignatureSize({
//       width: ref.offsetWidth,
//       height: ref.offsetHeight,
//     });

//     setSignaturePosition({
//       x: position.x,
//       y: position.y,
//     });
//   };

//   const removeSignature = () => {
//     setSignatureImage(null);
//   };

//   //Pdf Upload
//   const handlePageLoadSuccess = (page) => {
//     const viewport = page.getViewport({
//       scale: 1,
//     });

//     setPdfDisplaySize({
//       width: viewport.width,
//       height: viewport.height,
//     });
//   };

//   //Download Signed Pdf
//   const downloadSignedPdf = async () => {
//     try {
//       if (!documentFile) {
//         alert("Please upload a PDF document.");
//         return;
//       }

//       if (!signatureImage) {
//         alert("Please create your signature.");
//         return;
//       }

//       const pdfBytes = await documentFile.arrayBuffer();

//       const pdfDoc = await PDFDocument.load(pdfBytes);

//       const pages = pdfDoc.getPages();

//       const firstPage = pages[0];

//       const { width: pdfWidth, height: pdfHeight } = firstPage.getSize();

//       const scaleX = pdfWidth / pdfDisplaySize.width;

//       const scaleY = pdfHeight / pdfDisplaySize.height;

//       const pdfX = signaturePosition.x * scaleX;

//       const pdfSignatureWidth = signatureSize.width * scaleX;

//       const pdfSignatureHeight = signatureSize.height * scaleY;

//       const pdfY =
//         pdfHeight - signaturePosition.y * scaleY - pdfSignatureHeight;

//       const signatureBytes = await fetch(signatureImage).then((res) =>
//         res.arrayBuffer(),
//       );

//       const signature = await pdfDoc.embedPng(signatureBytes);

//       // Draw Signature

//       firstPage.drawImage(signature, {
//         x: pdfX,
//         y: pdfY,
//         width: pdfSignatureWidth,
//         height: pdfSignatureHeight,
//       });

//       //Save Pdf
//       const signedPdfBytes = await pdfDoc.save();

//       const blob = new Blob([signedPdfBytes], {
//         type: "application/pdf",
//       });

//       const url = URL.createObjectURL(blob);

//       const link = document.createElement("a");

//       link.href = url;

//       link.download = `signed-${documentFile.name}`;

//       document.body.appendChild(link);

//       link.click();

//       link.remove();

//       URL.revokeObjectURL(url);

//       //success popup
//       alert("Signed PDF downloaded successfully!");

//       //clear Editor
//       const clearEditor = () => {
//         setDocumentFile(null);

//         setSignaturePosition({
//           x: 400,
//           y: 500,
//         });

//         setSignatureSize({
//           width: 180,
//           height: 80,
//         });
//       };

//       clearEditor();
//     } catch (error) {
//       console.error("Error downloading signed PDF:", error);

//       alert("Something went wrong while generating the signed PDF.");
//     }
//   };

//   //Save

//   const handleSave = async () => {
//     await downloadSignedPdf();
//   };

//   return (
//     <div className="h-screen overflow-hidden bg-gray-100 p-4">
//       <div className="mx-auto flex h-full max-w-7xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
//         <div className="shrink-0 border-b px-8 py-5">
//           <h1 className="text-2xl font-bold text-gray-800">E-Sign Document</h1>

//           <p className="mt-1 text-sm text-gray-500">
//             Upload your document, create your signature, place it on the
//             document and download the signed PDF.
//           </p>
//         </div>

//         <div className="grid min-h-0 flex-1 grid-cols-12">
//           {/* Left Panel */}

//           <div className="col-span-4 overflow-y-auto border-r p-6">
//             <div className="mb-6 flex items-start gap-3">
//               <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
//                 1
//               </div>

//               <div>
//                 <h2 className="text-lg font-semibold text-gray-800">
//                   Upload Document
//                 </h2>

//                 <p className="mt-1 text-sm text-gray-500">
//                   Upload the PDF document that needs to be signed.
//                 </p>
//               </div>
//             </div>

//             {/* Upload */}

//             <div
//               {...getDocumentRootProps()}
//               className="flex h-44 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/20 transition hover:border-blue-500 hover:bg-blue-50"
//             >
//               <input {...getDocumentInputProps()} />

//               <FiFileText className="mb-3 text-blue-600" size={45} />

//               <p className="text-center text-base font-medium text-gray-700">
//                 Click to upload or drag and drop
//               </p>

//               <p className="mt-1 text-xs text-gray-500">
//                 PDF only • Maximum 20MB
//               </p>
//             </div>

//             {/* File */}

//             {documentFile && (
//               <div className="mt-4 flex items-center justify-between rounded-xl border bg-gray-50 p-4">
//                 <div className="flex min-w-0 items-center gap-3">
//                   <div className="shrink-0 text-red-500">
//                     <FiFileText size={35} />
//                   </div>

//                   <div className="min-w-0">
//                     <h3 className="truncate text-sm font-semibold text-gray-800">
//                       {documentFile.name}
//                     </h3>

//                     <p className="mt-1 text-xs text-gray-500">
//                       {formatFileSize(documentFile.size)}
//                     </p>
//                   </div>
//                 </div>

//                 <FiCheckCircle className="shrink-0 text-green-500" size={22} />
//               </div>
//             )}

//             {/* Onces the document is submitted second procees signature */}
//             {documentFile && (
//               <div className="mt-8">
//                 <div className="mb-4 flex items-start gap-3">
//                   <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
//                     2
//                   </div>

//                   <div>
//                     <h2 className="text-lg font-semibold text-gray-800">
//                       Add Signature
//                     </h2>

//                     <p className="mt-1 text-sm text-gray-500">
//                       Create your signature and place it on the PDF.
//                     </p>
//                   </div>
//                 </div>

//                 {/* Draw Button */}

//                 <button
//                   type="button"
//                   onClick={() => setShowSignaturePad(true)}
//                   className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-blue-200 bg-blue-50 px-4 py-3 font-medium text-blue-700 transition hover:border-blue-400 hover:bg-blue-100"
//                 >
//                   <FiEdit3 size={19} />

//                   {signatureImage ? "Redraw Signature" : "Draw Signature"}
//                 </button>

//                 {/* Signature Preview  */}

//                 {signatureImage && (
//                   <div className="mt-4 rounded-xl border bg-gray-50 p-4">
//                     <div className="mb-2 flex items-center justify-between">
//                       <span className="text-sm font-medium text-gray-700">
//                         Signature
//                       </span>

//                       <button
//                         type="button"
//                         onClick={removeSignature}
//                         className="text-red-500 hover:text-red-700"
//                       >
//                         <FiTrash2 size={17} />
//                       </button>
//                     </div>

//                     <div className="flex h-24 items-center justify-center rounded-lg border bg-white">
//                       <img
//                         src={signatureImage}
//                         alt="Signature"
//                         className="max-h-20 max-w-full object-contain"
//                       />
//                     </div>

//                     <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
//                       <FiMove size={15} />
//                       Drag the signature on the PDF to position it.
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Right Panel */}

//           <div className="col-span-8 flex min-h-0 flex-col p-6">
//             {/* Editor header */}

//             <div className="flex shrink-0 items-center justify-between">
//               <div>
//                 <h2 className="text-xl font-semibold text-gray-800">
//                   Document Editor
//                 </h2>

//                 <p className="mt-1 text-sm text-gray-500">
//                   Place your signature anywhere on the document
//                 </p>
//               </div>

//               {signatureImage && (
//                 <div className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
//                   <FiCheckCircle size={16} />
//                   Signature ready
//                 </div>
//               )}
//             </div>

//             {/* Toolbar */}

//             {documentFile && (
//               <div className="mt-4 flex shrink-0 items-center gap-2 rounded-xl border bg-gray-50 p-2">
//                 <button
//                   type="button"
//                   onClick={() => setShowSignaturePad(true)}
//                   className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100"
//                 >
//                   <FiEdit3 size={17} />
//                   Draw Signature
//                 </button>

//                 {signatureImage && (
//                   <button
//                     type="button"
//                     onClick={removeSignature}
//                     className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-red-600 shadow-sm hover:bg-red-50"
//                   >
//                     <FiTrash2 size={17} />
//                     Remove
//                   </button>
//                 )}
//               </div>
//             )}

//             {/* Pdf Preview */}

//             <div className="mt-4 flex min-h-0 flex-1 items-start justify-center overflow-auto rounded-xl border bg-gray-700 p-6">
//               {!documentFile ? (
//                 <div className="flex h-full min-h-[400px] items-center justify-center">
//                   <div className="text-center text-white">
//                     <FiUploadCloud
//                       className="mx-auto text-gray-400"
//                       size={65}
//                     />

//                     <h2 className="mt-5 text-xl font-semibold">PDF Preview</h2>

//                     <p className="mt-2 text-sm text-gray-400">
//                       Upload a PDF document to start signing.
//                     </p>
//                   </div>
//                 </div>
//               ) : (
//                 <div
//                   ref={pdfContainerRef}
//                   className="relative mx-auto w-fit shrink-0 bg-white shadow-2xl"
//                 >
//                   {/* PDF */}

//                   <Document
//                     file={documentFile}
//                     onLoadSuccess={onDocumentLoadSuccess}
//                     loading={
//                       <div className="flex h-96 w-[600px] items-center justify-center bg-white">
//                         <p className="text-gray-500">Loading PDF...</p>
//                       </div>
//                     }
//                     error={
//                       <div className="flex h-96 w-[600px] items-center justify-center bg-white">
//                         <p className="text-red-500">Failed to load PDF.</p>
//                       </div>
//                     }
//                   >
//                     <Page
//                       pageNumber={1}
//                       width={600}
//                       onLoadSuccess={handlePageLoadSuccess}
//                     />
//                   </Document>

//                   {/* Siognature Overlay */}

//                   {signatureImage && (
//                     <Rnd
//                       bounds="parent"
//                       size={{
//                         width: signatureSize.width,
//                         height: signatureSize.height,
//                       }}
//                       position={{
//                         x: signaturePosition.x,
//                         y: signaturePosition.y,
//                       }}
//                       minWidth={80}
//                       minHeight={40}
//                       maxWidth={400}
//                       maxHeight={250}
//                       lockAspectRatio={true}
//                       enableResizing={{
//                         top: false,
//                         right: true,
//                         bottom: true,
//                         left: false,
//                         topRight: false,
//                         bottomRight: true,
//                         bottomLeft: false,
//                         topLeft: false,
//                       }}
//                       onDragStop={handleSignatureDragStop}
//                       onResizeStop={handleSignatureResizeStop}
//                       className="z-50"
//                     >
//                       <div className="relative h-full w-full rounded-lg border-2 border-dashed border-blue-500 bg-white/40 p-1">
//                         <img
//                           src={signatureImage}
//                           alt="Signature"
//                           draggable={false}
//                           className="h-full w-full select-none object-contain pointer-events-none"
//                         />

//                         <div className="absolute -top-7 left-0 flex items-center gap-1 rounded bg-blue-600 px-2 py-1 text-[10px] font-medium text-white">
//                           <FiMove size={10} />
//                           Drag
//                         </div>
//                       </div>
//                     </Rnd>
//                   )}
//                 </div>
//               )}
//             </div>

//             <div className="mt-4 flex shrink-0 justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={handleSave}
//                 disabled={!documentFile || !signatureImage}
//                 className="flex items-center gap-2 rounded-lg bg-gray-800 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-40"
//               >
//                 <FiSave size={18} />
//                 Save
//               </button>

//               <button
//                 type="button"
//                 onClick={downloadSignedPdf}
//                 disabled={!documentFile || !signatureImage}
//                 className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
//               >
//                 <FiDownload size={18} />
//                 Download Signed PDF
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* signature Pad Modal */}
//       {showSignaturePad && (
//         <SignaturePad
//           onSave={handleSignatureSave}
//           onClose={() => setShowSignaturePad(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default DocumentEsign1;

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useDropzone } from "react-dropzone";
import { PDFDocument } from "pdf-lib";
import { Rnd } from "react-rnd";

import {
  FiFileText,
  FiCheckCircle,
  FiUploadCloud,
  FiDownload,
  FiSave,
  FiEdit3,
  FiTrash2,
  FiX,
  FiMove,
} from "react-icons/fi";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

// Signature Pad
const SignaturePad = ({ onSave, onClose }) => {
  const canvasRef = useRef(null);

  //   const fileInputRef = useRef(null);

  const isDrawing = useRef(false);

  const lastPoint = useRef({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();

    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext("2d");

    ctx.scale(dpr, dpr);

    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#111827";
  }, []);

  const getPoint = (event) => {
    const canvas = canvasRef.current;

    const rect = canvas.getBoundingClientRect();

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const startDrawing = (event) => {
    const point = getPoint(event);

    isDrawing.current = true;

    lastPoint.current = point;
  };

  const draw = (event) => {
    if (!isDrawing.current) return;

    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    const point = getPoint(event);

    ctx.beginPath();

    ctx.moveTo(lastPoint.current.x, lastPoint.current.y);

    ctx.lineTo(point.x, point.y);

    ctx.stroke();

    lastPoint.current = point;
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const image = canvas.toDataURL("image/png");

    onSave(image);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        {/* Drwaing signature tab */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Draw Your Signature
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Draw your signature inside the box below.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Canvas */}

        <div className="p-6">
          <div className="overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50">
            <canvas
              ref={canvasRef}
              className="h-56 w-full cursor-crosshair touch-none bg-white"
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
            />
          </div>

          <p className="mt-2 text-xs text-gray-400">
            Use your mouse or touchpad to draw your signature.
          </p>
        </div>

        {/* Actions */}

        <div className="flex justify-between border-t bg-gray-50 px-6 py-4">
          <button
            type="button"
            onClick={clearSignature}
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            <FiTrash2 size={17} />
            Clear
          </button>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={saveSignature}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              <FiCheckCircle size={17} />
              Use Signature
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// main ui page

const DocumentEsign1 = () => {
  // Pdf State or document
  const [documentFile, setDocumentFile] = useState(null);

  // Signature UseState

  const [signatureImage, setSignatureImage] = useState(null);

  const [showSignaturePad, setShowSignaturePad] = useState(false);

  // Signature Position
  const [signaturePosition, setSignaturePosition] = useState({
    x: 100,
    y: 400,
  });

  // Signature Size
  const [signatureSize, setSignatureSize] = useState({
    width: 180,
    height: 80,
  });

  // Pdf Container
  const pdfContainerRef = useRef(null);

  //Pdf Display
  const [pdfDisplaySize, setPdfDisplaySize] = useState({
    width: 0,
    height: 0,
  });

  //Pdf Load
  const onDocumentLoadSuccess = ({ numPages }) => {
    console.log("PDF loaded successfully");
  };

  // Document Upload
  const onDropDocument = useCallback((acceptedFiles) => {
    if (!acceptedFiles || acceptedFiles.length === 0) {
      return;
    }

    const file = acceptedFiles[0];

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      alert("PDF size must be less than 20MB.");
      return;
    }

    setDocumentFile(file);

    setSignatureImage(null);

    setSignaturePosition({
      x: 100,
      y: 400,
    });
  }, []);

  //Dropzone
  const {
    getRootProps: getDocumentRootProps,
    getInputProps: getDocumentInputProps,
  } = useDropzone({
    onDrop: onDropDocument,
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
    },
  });

  //FileSize
  const formatFileSize = (size) => {
    if (!size) {
      return "0 KB";
    }

    return `${(size / 1024).toFixed(1)} KB`;
  };

  //Signature Created
  const handleSignatureSave = (image) => {
    setSignatureImage(image);

    setSignaturePosition({
      x: 100,
      y: 400,
    });
  };

  //  Signature Drag

  const handleSignatureDragStop = (event, data) => {
    setSignaturePosition({
      x: data.x,
      y: data.y,
    });
  };

  const handleSignatureResizeStop = (
    event,
    direction,
    ref,
    delta,
    position,
  ) => {
    setSignatureSize({
      width: ref.offsetWidth,
      height: ref.offsetHeight,
    });

    setSignaturePosition({
      x: position.x,
      y: position.y,
    });
  };

  const removeSignature = () => {
    setSignatureImage(null);
  };

  //Pdf Upload
  const handlePageLoadSuccess = (page) => {
    const viewport = page.getViewport({
      scale: 1,
    });

    setPdfDisplaySize({
      width: viewport.width,
      height: viewport.height,
    });
  };

  //Download Signed Pdf
  const downloadSignedPdf = async () => {
    try {
      if (!documentFile) {
        alert("Please upload a PDF document.");
        return;
      }

      if (!signatureImage) {
        alert("Please create your signature.");
        return;
      }

      const pdfBytes = await documentFile.arrayBuffer();

      const pdfDoc = await PDFDocument.load(pdfBytes);

      const pages = pdfDoc.getPages();

      const firstPage = pages[0];

      const { width: pdfWidth, height: pdfHeight } = firstPage.getSize();

      const scaleX = pdfWidth / pdfDisplaySize.width;

      const scaleY = pdfHeight / pdfDisplaySize.height;

      const pdfX = signaturePosition.x * scaleX;

      const pdfSignatureWidth = signatureSize.width * scaleX;

      const pdfSignatureHeight = signatureSize.height * scaleY;

      const pdfY =
        pdfHeight - signaturePosition.y * scaleY - pdfSignatureHeight;

      const signatureBytes = await fetch(signatureImage).then((res) =>
        res.arrayBuffer(),
      );

      const signature = await pdfDoc.embedPng(signatureBytes);

      // Draw Signature

      firstPage.drawImage(signature, {
        x: pdfX,
        y: pdfY,
        width: pdfSignatureWidth,
        height: pdfSignatureHeight,
      });

      //Save Pdf
      const signedPdfBytes = await pdfDoc.save();

      const blob = new Blob([signedPdfBytes], {
        type: "application/pdf",
      });

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = `signed-${documentFile.name}`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      URL.revokeObjectURL(url);

      //success popup
      alert("Signed PDF downloaded successfully!");

      //clear Editor
      const clearEditor = () => {
        setDocumentFile(null);

        setSignaturePosition({
          x: 400,
          y: 500,
        });

        setSignatureSize({
          width: 180,
          height: 80,
        });
      };

      clearEditor();
    } catch (error) {
      console.error("Error downloading signed PDF:", error);

      alert("Something went wrong while generating the signed PDF.");
    }
  };

  //Save

  const handleSave = async () => {
    await downloadSignedPdf();
  };

  return (
    <div className="h-screen overflow-hidden bg-gray-100 p-4">
      <div className="mx-auto flex h-full max-w-7xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="shrink-0 border-b px-8 py-5">
          <h1 className="text-2xl font-bold text-gray-800">E-Sign Document</h1>

          <p className="mt-1 text-sm text-gray-500">
            Upload your document, create your signature, place it on the
            document and download the signed PDF.
          </p>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-12">
          {/* Left Panel */}

          <div className="col-span-4 overflow-y-auto border-r p-6">
            <div className="mb-6 flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                1
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Upload Document
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Upload the PDF document that needs to be signed.
                </p>
              </div>
            </div>

            {/* Upload */}

            <div
              {...getDocumentRootProps()}
              className="flex h-44 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/20 transition hover:border-blue-500 hover:bg-blue-50"
            >
              <input {...getDocumentInputProps()} />

              <FiFileText className="mb-3 text-blue-600" size={45} />

              <p className="text-center text-base font-medium text-gray-700">
                Click to upload or drag and drop
              </p>

              <p className="mt-1 text-xs text-gray-500">
                PDF only • Maximum 20MB
              </p>
            </div>

            {/* File */}

            {documentFile && (
              <div className="mt-4 flex items-center justify-between rounded-xl border bg-gray-50 p-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="shrink-0 text-red-500">
                    <FiFileText size={35} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-gray-800">
                      {documentFile.name}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      {formatFileSize(documentFile.size)}
                    </p>
                  </div>
                </div>

                <FiCheckCircle className="shrink-0 text-green-500" size={22} />
              </div>
            )}

            {/* Onces the document is submitted second procees signature */}
            {documentFile && (
              <div className="mt-8">
                <div className="mb-4 flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                    2
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      Add Signature
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Create your signature and place it on the PDF.
                    </p>
                  </div>
                </div>

                {/* Draw Button */}

                <button
                  type="button"
                  onClick={() => setShowSignaturePad(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-blue-200 bg-blue-50 px-4 py-3 font-medium text-blue-700 transition hover:border-blue-400 hover:bg-blue-100"
                >
                  <FiEdit3 size={19} />

                  {signatureImage ? "Redraw Signature" : "Draw Signature"}
                </button>

                {/* Signature Preview  */}

                {signatureImage && (
                  <div className="mt-4 rounded-xl border bg-gray-50 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Signature
                      </span>

                      <button
                        type="button"
                        onClick={removeSignature}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 size={17} />
                      </button>
                    </div>

                    <div className="flex h-24 items-center justify-center rounded-lg border bg-white">
                      <img
                        src={signatureImage}
                        alt="Signature"
                        className="max-h-20 max-w-full object-contain"
                      />
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                      <FiMove size={15} />
                      Drag the signature on the PDF to position it.
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Panel */}

          <div className="col-span-8 flex min-h-0 flex-col p-6">
            {/* Editor header */}

            <div className="flex shrink-0 items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Document Editor
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Place your signature anywhere on the document
                </p>
              </div>

              {signatureImage && (
                <div className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
                  <FiCheckCircle size={16} />
                  Signature ready
                </div>
              )}
            </div>

            {/* Toolbar */}

            {documentFile && (
              <div className="mt-4 flex shrink-0 items-center gap-2 rounded-xl border bg-gray-50 p-2">
                <button
                  type="button"
                  onClick={() => setShowSignaturePad(true)}
                  className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100"
                >
                  <FiEdit3 size={17} />
                  Draw Signature
                </button>

                {signatureImage && (
                  <button
                    type="button"
                    onClick={removeSignature}
                    className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-red-600 shadow-sm hover:bg-red-50"
                  >
                    <FiTrash2 size={17} />
                    Remove
                  </button>
                )}
              </div>
            )}

            {/* Pdf Preview */}

            <div className="mt-4 flex min-h-0 flex-1 items-start justify-center overflow-auto rounded-xl border bg-gray-700 p-6">
              {!documentFile ? (
                <div className="flex h-full min-h-[400px] items-center justify-center">
                  <div className="text-center text-white">
                    <FiUploadCloud
                      className="mx-auto text-gray-400"
                      size={65}
                    />

                    <h2 className="mt-5 text-xl font-semibold">PDF Preview</h2>

                    <p className="mt-2 text-sm text-gray-400">
                      Upload a PDF document to start signing.
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  ref={pdfContainerRef}
                  className="relative mx-auto w-fit shrink-0 bg-white shadow-2xl"
                >
                  {/* PDF */}

                  <Document
                    file={documentFile}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={
                      <div className="flex h-96 w-[600px] items-center justify-center bg-white">
                        <p className="text-gray-500">Loading PDF...</p>
                      </div>
                    }
                    error={
                      <div className="flex h-96 w-[600px] items-center justify-center bg-white">
                        <p className="text-red-500">Failed to load PDF.</p>
                      </div>
                    }
                  >
                    <Page
                      pageNumber={1}
                      width={600}
                      onLoadSuccess={handlePageLoadSuccess}
                    />
                  </Document>

                  {/* Siognature Overlay */}

                  {signatureImage && (
                    <Rnd
                      bounds="parent"
                      size={{
                        width: signatureSize.width,
                        height: signatureSize.height,
                      }}
                      position={{
                        x: signaturePosition.x,
                        y: signaturePosition.y,
                      }}
                      minWidth={80}
                      minHeight={40}
                      maxWidth={400}
                      maxHeight={250}
                      lockAspectRatio={true}
                      enableResizing={{
                        top: false,
                        right: true,
                        bottom: true,
                        left: false,
                        topRight: false,
                        bottomRight: true,
                        bottomLeft: false,
                        topLeft: false,
                      }}
                      onDragStop={handleSignatureDragStop}
                      onResizeStop={handleSignatureResizeStop}
                      className="z-50"
                    >
                      <div className="relative h-full w-full rounded-lg border-2 border-dashed border-blue-500 bg-white/40 p-1">
                        <img
                          src={signatureImage}
                          alt="Signature"
                          draggable={false}
                          className="h-full w-full select-none object-contain pointer-events-none"
                        />

                        <div className="absolute -top-7 left-0 flex items-center gap-1 rounded bg-blue-600 px-2 py-1 text-[10px] font-medium text-white">
                          <FiMove size={10} />
                          Drag
                        </div>
                      </div>
                    </Rnd>
                  )}
                </div>
              )}
            </div>

            <div className="mt-4 flex shrink-0 justify-end gap-3">
              <button
                type="button"
                onClick={handleSave}
                disabled={!documentFile || !signatureImage}
                className="flex items-center gap-2 rounded-lg bg-gray-800 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FiSave size={18} />
                Save
              </button>

              <button
                type="button"
                onClick={downloadSignedPdf}
                disabled={!documentFile || !signatureImage}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FiDownload size={18} />
                Download Signed PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* signature Pad Modal */}
      {showSignaturePad && (
        <SignaturePad
          onSave={handleSignatureSave}
          onClose={() => setShowSignaturePad(false)}
        />
      )}
    </div>
  );
};

export default DocumentEsign1;
