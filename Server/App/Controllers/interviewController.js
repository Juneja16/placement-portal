import Interview from "../Models/Interview.js";

// CREATE INTERVIEW
export const createInterview = async (req, res) => {
  try {
    const { company, date } = req.body;

    if (!company || !date) {
      return res.status(400).json({ message: "Company and date are required" });
    }

    const interview = await Interview.create({
      company,
      date,
    });

    res.status(201).json({
      message: "Interview created successfully",
      interview,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL INTERVIEWS (with optional filters) and Sorting by date latest First
export const getInterviews = async (req, res) => {
  try {
    const { company, date } = req.query;

    let filter = {};

    if (company) {
      filter.company = company;
    }

    if (date) {
      filter.date = new Date(date);
    }

    const interviews = await Interview.find(filter).sort({ date: 1 });

    res.json(interviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
