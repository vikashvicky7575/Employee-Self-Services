// import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

// export const parsePdfFile = async (buffer) => {
//   try {
//     const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(buffer) });
//     const pdf = await loadingTask.promise;

//     let text = "";

//     // Extract text from all pages
//     for (let i = 1; i <= pdf.numPages; i++) {
//       const page = await pdf.getPage(i);
//       const content = await page.getTextContent();

//       const pageText = content.items.map((item) => item.str).join(" ");
//       text += pageText + "\n";
//     }

//     const records = [];

//     const blocks = text.match(/Comments:[\s\S]*?(?=Comments:|$)/g) || [];

//     for (const block of blocks) {
//       const invoiceNumber =
//         block.match(/Invoice #:\s*([A-Z0-9_]+)/i)?.[1] || "";

//       const invoiceId = block.match(/(INFUS\d+)/i)?.[1] || "";

//       const amount =
//         Number(
//           block
//             .match(/Paid Invoice Amount:\s*([\d,.]+)/i)?.[1]
//             ?.replace(/,/g, ""),
//         ) || 0;

//       const remitNumber =
//         Number(block.match(/Remit Number:\s*(\d+)/i)?.[1]) || 0;

//       records.push({
//         invoiceNumber,
//         invoiceId,
//         remitNumber,
//         amount,
//         currency: "USD",
//       });
//     }

//     return {
//       success: true,
//       totalRecords: records.length,
//       totalAmount: records.reduce((sum, item) => sum + item.amount, 0),
//       currency: "USD",
//       data: records,
//       rawText: text,
//     };
//   } catch (err) {
//     return {
//       success: false,
//       message: err.message,
//     };
//   }
// };

import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export const parsePdfFile = async (buffer) => {
  try {
    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(buffer),
    });

    const pdf = await loadingTask.promise;

    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();

      const pageText = content.items.map((item) => item.str).join(" ");
      text += pageText + "\n";
    }

    //  STEP 1: Split by Invoice #
    const blocks = text.split(/Invoice\s+#:/i);

    const records = [];

    for (const block of blocks) {
      const invoiceNumber = block.match(/([A-Z0-9_]{10,})/)?.[1] || "";

      const invoiceId = block.match(/INFUS\d+/i)?.[0] || "";

      const amount =
        Number(
          block
            .match(/Paid Invoice Amount\s*([\d,.]+)/i)?.[1]
            ?.replace(/,/g, ""),
        ) || 0;

      const remitNumber =
        Number(block.match(/Remit Number:\s*(\d+)/i)?.[1]) || 0;

      const employeeName =
        block
          .match(/([A-Z]{3,}\s[A-Z]{3,}.*?[A-Z]{2,})/)?.[0]
          ?.replace(/\s+/g, " ")
          .trim() || "";

      if (amount > 0 || invoiceId) {
        records.push({
          invoiceNumber,
          invoiceId,
          employeeName,
          remitNumber,
          amount,
          currency: "USD",
        });
      }
    }

    return {
      success: true,
      totalRecords: records.length,
      totalAmount: records.reduce((sum, i) => sum + i.amount, 0),
      currency: "USD",
      data: records,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};
