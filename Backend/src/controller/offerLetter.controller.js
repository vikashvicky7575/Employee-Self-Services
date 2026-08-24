import {
  createOfferLetter,
  save_component_model,
  getComponentsByOfferNo,
  saveBreakup,
} from "../models/offerLetter.model.js";

import { calculatePayroll } from "../services/payrollEngine.js";

export const create_offer_letter_controller = async (req, res) => {
  try {
    const {
      candidate_name,
      offer_letter_no,
      designation,
      country,
      ctc,
      components,
    } = req.body;

    //step 1
    await createOfferLetter({
      candidate_name,
      offer_letter_no,
      designation,
      country,
      ctc,
    });

    console.log("Offer Letter Saved");

    //step 2

    await save_component_model(offer_letter_no, components);

    console.log("Components Saved");

    //step 3
    const breakup = calculatePayroll(ctc, components);

    console.log("Salary Breakup", breakup);

    //step 4
    await saveBreakup(offer_letter_no, breakup);

    console.log("Breakup Saved");

    return res.status(201).json({
      success: true,
      message: "Offer Letter Created Successfully",
      offer_letter_no,
      breakup,
    });
  } catch (err) {
    console.error("CREATE OFFER ERROR", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
