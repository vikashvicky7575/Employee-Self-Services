import db from "../config/db.js";

//offerLetter_model
export const createOfferLetter = async (data) => {
  const [result] = await db.execute(
    `INSERT INTO offer_letters
    (
      candidate_name,
      offer_letter_no,
      designation,
      country,
      ctc
    )
    VALUES (?, ?, ?, ?, ?)
        `,
    [
      data.candidate_name,
      data.offer_letter_no,
      data.designation,
      data.country,
      data.ctc,
    ],
  );

  return result;
};

//component_model

//component_save_model
export const save_component_model = async (offerLetterNo, components) => {
  console.log("MODEL components =>", components);
  console.log("MODEL isArray =>", Array.isArray(components));
  for (const item of components) {
    await db.execute(
      `INSERT INTO offer_letter_components
            (
        offer_letter_no,
        component_name,
        formula,
        code,
        sequence_no
            )
         VALUES (?, ?, ?, ?, ?)
            `,
      [
        offerLetterNo,
        item.component_name,
        item.formula,
        item.code,
        item.sequence_no,
      ],
    );
  }
  return true;
};

//get_component
export const getComponentsByOfferNo = async (offerLetterNo) => {
  const [rows] = await db.execute(
    ` 
    SELECT *
    FROM offer_letter_components
    WHERE offer_letter_no = ?
    ORDER BY sequence_no
    `,
    [offerLetterNo],
  );
  return rows;
};

//breakup_component_model
export const saveBreakup = async (offerLetterNo, breakup) => {
  for (const component in breakup) {
    await db.execute(
      `  INSERT INTO offer_letter_breakup
      (
        offer_letter_no,
        component_name,
        calculated_amount
      )
      VALUES (?, ?, ?)
      `,
      [offerLetterNo, component, breakup[component]],
    );
  }
  return true;
};
