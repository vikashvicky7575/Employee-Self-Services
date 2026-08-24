import { useState } from "react";
import api from "../../../../api/axios";
import { evaluate } from "mathjs";

import styles from "./OfferLetterCreation.module.css";

const OfferLetterCreation = () => {
  //form UseState
  const [form, setForm] = useState({
    offer_letter_no: "",
    candidate_name: "",
    designation: "",
    country: "",
    ctc: "",
  });

  //Model for view offer letter
  const [showPreview, setShowPreview] = useState(false);
  const [offerPreview, setOfferPreview] = useState(null);

  //Component UseState
  const [components, setComponents] = useState([]);

  //initial for clear after clicking the generate offer letter button
  const initialForm = {
    candidate_name: "",
    offer_letter_no: "",
    designation: "",
    country: "",
    ctc: "",
  };

  //Add Component
  const addComponent = () => {
    setComponents([
      ...components,
      {
        component_name: "",
        formula: "",
        code: "",
        sequence_no: components.length + 1,
      },
    ]);
  };

  //update Component

  const updateComponent = (index, field, value) => {
    const updated = [...components];

    updated[index][field] = value;
    try {
      const scope = {
        CTC: Number(form.ctc || 0),
      };

      // Add previous component values to scope
      updated.forEach((comp) => {
        if (comp.code && comp.result) {
          scope[comp.code.toUpperCase()] = Number(comp.result);
        }
      });

      // Recalculate all components in order
      updated.forEach((comp) => {
        if (!comp.formula) return;

        let formula = comp.formula;

        formula = formula.replace(/\bctc\b/gi, "CTC");
        formula = formula.toUpperCase();

        formula = formula.replace(/(\d+(\.\d+)?)%/g, "($1/100)");

        const result = evaluate(formula, scope);

        comp.result = Number(result.toFixed(2));

        if (comp.code) {
          scope[comp.code.toUpperCase()] = comp.result;
        }
      });
    } catch (err) {
      console.log(err);
    }
    setComponents(updated);
  };

  //Generate Offer Letter
  const generateOffer = async () => {
    try {
      const { data } = await api.post(`/offerLetter`, {
        ...form,
        components,
      });

      setOfferPreview({
        ...form,
        components,
        breakup: data.breakup,
      });

      setShowPreview(true);

      alert("Offer Letter Created Successfully");
      console.log(data);

      // Clear form
      setForm(initialForm);

      // Clear components
      setComponents([]);
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  //remove button
  const removeComponent = (index) => {
    setComponents(components.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className={styles.pageWrapper}>
        <div className={styles.card}>
          <h2 className="text-2xl font-bold mb-6">Create Offer Letter</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              className={styles.input}
              placeholder="Offer Letter No"
              onChange={(e) =>
                setForm({ ...form, offer_letter_no: e.target.value })
              }
            />

            <input
              className={styles.input}
              placeholder="Candidate Name"
              onChange={(e) =>
                setForm({ ...form, candidate_name: e.target.value })
              }
            />

            <input
              className={styles.input}
              placeholder="Designation"
              onChange={(e) =>
                setForm({ ...form, designation: e.target.value })
              }
            />

            <input
              className={styles.input}
              placeholder="Country"
              onChange={(e) => setForm({ ...form, country: e.target.value })}
            />

            <input
              type="number"
              className={styles.input}
              placeholder="Annual CTC"
              onChange={(e) => setForm({ ...form, ctc: e.target.value })}
            />
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Salary Components</h3>

            {/* Add Component */}
            {components.map((item, index) => (
              <div key={index} className={styles.componentRow}>
                <input
                  placeholder="Component Name"
                  value={item.component_name}
                  className={styles.input}
                  onChange={(e) =>
                    updateComponent(index, "component_name", e.target.value)
                  }
                />

                <input
                  placeholder="code "
                  value={item.code}
                  className={styles.input}
                  onChange={(e) =>
                    updateComponent(index, "code", e.target.value)
                  }
                />

                <input
                  placeholder="Formula"
                  value={item.formula}
                  className={styles.input}
                  onChange={(e) =>
                    updateComponent(index, "formula", e.target.value)
                  }
                />

                <input
                  placeholder="Result"
                  value={item.result || ""}
                  className={styles.input}
                  readOnly
                />

                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => removeComponent(index)}
                >
                  X
                </button>
              </div>
            ))}
          </div>

          {/* Calculate & Generate Button */}
          <div className="mt-4 flex gap-4">
            <button
              type="button"
              className={styles.addButton}
              onClick={addComponent}
            >
              + Add Component
            </button>

            <button className={styles.generateButton} onClick={generateOffer}>
              Generate Offer Letter
            </button>
          </div>
        </div>
      </div>

      {showPreview && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            {/* HEADER */}
            <div className="text-center border-b pb-4">
              <h1 className="text-3xl font-bold tracking-wide">OFFER LETTER</h1>

              <p className="text-blue-500 mt-1">ABC Technologies Pvt Ltd</p>
            </div>

            {/* CANDIDATE INFO */}
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <p>
                <strong>Offer Letter No:</strong> {offerPreview.offer_letter_no}
              </p>
              <p>
                <strong>Country:</strong> {offerPreview.country}
              </p>

              <p>
                <strong>Name:</strong> {offerPreview.candidate_name}
              </p>
              <p>
                <strong>Annual CTC:</strong> ₹
                {Number(offerPreview.ctc).toLocaleString()}
              </p>

              <p>
                <strong>Designation:</strong> {offerPreview.designation}
              </p>
              <p>
                <strong>Joining Type:</strong> Full-Time Employment
              </p>
            </div>

            {/* SALARY BREAKUP */}
            <h2 className="font-bold mt-8 mb-2 text-lg">
              Compensation Structure (Annual)
            </h2>

            <table className="w-full border text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Component</th>
                  <th className="border p-2 text-right">Amount (₹)</th>
                </tr>
              </thead>

              <tbody>
                {Object.entries(offerPreview.breakup || {}).map(
                  ([key, value]) => (
                    <tr key={key}>
                      <td className="border p-2">{key}</td>
                      <td className="border p-2 text-right">
                        ₹{Number(value).toLocaleString()}
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>

            {/* BENEFITS SECTION */}
            <div className="mt-6">
              <h2 className="font-bold text-lg mb-2">Employee Benefits</h2>

              <ul className="list-disc ml-5 text-sm space-y-1 text-gray-700">
                <li>Health Insurance coverage for employee & dependents</li>
                <li>Provident Fund (PF) as per government rules</li>
                <li>Performance-based yearly bonus</li>
                <li>Work from home / hybrid flexibility (based on project)</li>
                <li>Training & skill development programs</li>
              </ul>
            </div>

            {/* LEAVE POLICY */}
            <div className="mt-6">
              <h2 className="font-bold text-lg mb-2">Leave Policy</h2>

              <ul className="list-disc ml-5 text-sm space-y-1 text-gray-700">
                <li>Casual Leave: 12 days per year</li>
                <li>Sick Leave: 8 days per year</li>
                <li>Earned Leave: As per company policy</li>
                <li>Public holidays as per country regulations</li>
              </ul>
            </div>

            {/* TERMS */}
            <div className="mt-6">
              <h2 className="font-bold text-lg mb-2">Terms & Conditions</h2>

              <ul className="list-disc ml-5 text-sm space-y-1 text-gray-700">
                <li>This offer is subject to background verification</li>
                <li>Employment is governed by company policies</li>
                <li>Salary structure may vary based on tax laws</li>
                <li>Confidentiality agreement must be signed</li>
              </ul>
            </div>

            {/* SIGNATURE */}
            <div className="mt-10 flex justify-between text-sm">
              <div>
                <p className="mb-10">Candidate Signature</p>
                <div className="border-t w-48"></div>
              </div>

              <div className="text-right">
                <p className="mb-10">Authorized Signatory</p>
                <div className="border-t w-48 ml-auto"></div>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex justify-end gap-4 mt-8">
              <button className="bg-green-600 text-white px-5 py-2 rounded">
                Download PDF
              </button>

              <button
                onClick={() => setShowPreview(false)}
                className="bg-red-600 text-white px-5 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OfferLetterCreation;
