import Interview from "../Models/Interview.js";
import Student from "../Models/Student.js";
import Result from "../Models/Result.js";
/* 

Input:
- studentId
- interviewId

Steps:
1. Check student exists
2. Check interview exists
3. Create result
4. Handle duplicate error (unique index)
*/

//  Allocate Student to Interview
export const allocateStudent = async (req, res) => {
  try {
    const { studentId, interviewId } = req.body;

    //  Fetch student & interview
    const student = await Student.findById(studentId);
    const interview = await Interview.findById(interviewId);

    if (!student || !interview) {
      return res.status(404).json({
        message: "Student or Interview not found",
      });
    }

    //  CONDITION CHECK
    const today = new Date();

    if (student.status === "placed" && new Date(interview.date) < today) {
      return res.status(400).json({
        message: "Cannot allocate a placed student to a past interview",
      });
    }

    //  Prevent duplicate allocation
    const existing = await Result.findOne({
      studentId,
      interviewId,
    });

    if (existing) {
      return res.status(400).json({
        message: "Student already allocated to this interview",
      });
    }

    //  Create allocation (Result entry)
    const result = await Result.create({
      studentId,
      interviewId,
      resultStatus: "On Hold", // default
    });

    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/* Input:
- resultStatus

Steps:
1. Find resultbyID
2. Update status */
//  Update Result Status
export const updateResult = async (req, res) => {
  try {
    const { id } = req.params;
    const { resultStatus } = req.body;

    const result = await Result.findByIdAndUpdate(
      id,
      { resultStatus },
      { new: true, runValidators: true },
    );

    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }

    res.json({
      message: "Result updated successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*1. Find all results by interviewId
2. Populate student details*/

//  Get all students for an interview
export const getInterviewResults = async (req, res) => {
  try {
    const { id } = req.params;

    const results = await Result.find({ interviewId: id })
      .populate("studentId") // join student
      .populate("interviewId"); // Join Interview Company

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllResults = async (req, res) => {
  try {
    const results = await Result.aggregate([
      //  Join Student
      {
        $lookup: {
          from: "students",
          localField: "studentId",
          foreignField: "_id",
          as: "student",
        },
      },
      { $unwind: "$student" },

      //  Join Interview
      {
        $lookup: {
          from: "interviews",
          localField: "interviewId",
          foreignField: "_id",
          as: "interview",
        },
      },
      { $unwind: "$interview" },
      {
        $match: {
          "interview.date": { $lt: new Date() },
        },
      },

      //  Select fields
      {
        $project: {
          _id: 1,
          resultStatus: 1,

          "student.name": 1,
          "student.college": 1,
          "student.status": 1,

          "interview.company": 1,
          "interview.date": 1,
        },
      },
    ]);

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Error fetching results" });
  }
};
