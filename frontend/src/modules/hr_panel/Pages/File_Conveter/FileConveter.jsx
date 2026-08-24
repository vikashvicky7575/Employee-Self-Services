import React, { useState } from "react";
import api from "../../../../api/axios";
import { toast } from "react-toastify";

const FileConveter = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jsonData, setJsonData] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      toast.warning("Select a File First");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("pdf", file);

      const { data } = await api.post("/fileconveter", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setJsonData(data);
    } catch (error) {
      console.log(error);
      alert("Upload Failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* HEADER */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">PDF Extractor</h1>
            <p className="text-gray-500 mt-1">
              Upload PDF and extract structured invoice data
            </p>
          </div>

          {/* UPLOAD CARD */}
          <div className="bg-white shadow-lg rounded-2xl p-6 space-y-4">
            {/* Dropzone */}
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-8 cursor-pointer hover:border-blue-500 transition bg-gray-50">
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
              />

              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 8v4m0 0l4-4m-4 4l-4-4"
                />
              </svg>

              <p className="mt-2 text-gray-600">
                Drag & drop PDF or{" "}
                <span className="text-blue-600 font-medium">browse</span>
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Only PDF files supported
              </p>
            </label>

            {/* FILE NAME */}
            {file && (
              <div className="text-sm text-gray-600">
                Selected: <span className="font-medium">{file.name}</span>
              </div>
            )}

            {/* BUTTON */}
            <button
              onClick={handleUpload}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2 disabled:opacity-60 mx-auto w-fit"
            >
              {loading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              {loading ? "Processing..." : "Upload PDF"}
            </button>
          </div>

          {/* SUMMARY */}
          {jsonData && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white shadow rounded-xl p-4 text-center">
                  <p className="text-gray-500 text-sm">Total Records</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {jsonData.totalRecords}
                  </p>
                </div>

                <div className="bg-white shadow rounded-xl p-4 text-center">
                  <p className="text-gray-500 text-sm">Total Amount</p>
                  <p className="text-2xl font-bold text-green-600">
                    {jsonData.totalAmount}
                  </p>
                </div>

                <div className="bg-white shadow rounded-xl p-4 text-center">
                  <p className="text-gray-500 text-sm">Currency</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {jsonData.currency}
                  </p>
                </div>
              </div>

              {/* JSON VIEW */}
              <div className="bg-white shadow rounded-xl p-4">
                <h2 className="font-semibold text-gray-700 mb-2">
                  JSON Preview
                </h2>
                <pre className="text-xs bg-gray-100 p-3 rounded-lg overflow-auto max-h-60">
                  {JSON.stringify(jsonData, null, 2)}
                </pre>
              </div>

              {/* TABLE */}
              <div className="bg-white shadow rounded-xl overflow-hidden">
                <div className="p-4 border-b">
                  <h2 className="font-semibold text-gray-700">
                    Extracted Data
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100 text-gray-600">
                      <tr>
                        <th className="p-3 text-left">Employee</th>
                        <th className="p-3 text-left">Invoice Date</th>
                        <th className="p-3 text-left">Remit No</th>
                        <th className="p-3 text-left">Amount</th>
                        <th className="p-3 text-left">Invoice ID</th>
                      </tr>
                    </thead>

                    <tbody>
                      {jsonData.data.map((item, index) => (
                        <tr
                          key={index}
                          className="border-t hover:bg-gray-50 transition"
                        >
                          <td className="p-3">{item.employeeName}</td>
                          <td className="p-3">{item.invoiceDate}</td>
                          <td className="p-3">{item.remitNumber}</td>
                          <td className="p-3 font-medium text-green-600">
                            {item.paidInvoiceAmount || item.amount}
                          </td>
                          <td className="p-3">{item.invoiceId}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FileConveter;
