import { generateCSV } from "../Services/csvService.js";

/* Route → Controller → CSV Service ⬅️ DB (Result)
                           ↓
                     Join (Student + Interview)
                           ↓
                     Flatten Data
                           ↓
                     Convert → CSV
                           ↓
                     Send Response
                      */




export const downloadCSV = async (req, res) => {
  try {
    const csv = await generateCSV();

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=interview-data.csv",
    );

    return res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
