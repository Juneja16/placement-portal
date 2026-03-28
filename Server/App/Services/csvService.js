import { Parser } from "json2csv";
import Result from "../models/Result.js";

/*Result
  ↓
$lookup → Student
  ↓
$lookup → Interview
  ↓
$unwind
  ↓
$project (flatten)


$lookup = JOIN
Result.studentId → Student._id
Result.interviewId → Interview._id


$unwind:  Array → Object
Because $lookup returns: student: [ {...} ]
To convert to: student: {...}   we need to use unwind

$project
Select + Rename + Flatten


1.Aggregation =Database-level processing
2.populate =Application-level joining

 */

export const generateCSV = async () => {
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

    //  Flatten data
    {
      $project: {
        studentId: "$student._id",
        studentName: "$student.name",
        college: "$student.college",
        batch: "$student.batch",
        status: "$student.status",

        dsaScore: "$student.scores.dsa",
        webdScore: "$student.scores.webd",
        reactScore: "$student.scores.react",

        interviewCompany: "$interview.company",
        interviewDate: "$interview.date",

        result: "$resultStatus",
      },
    },
  ]);

  const fields = [
    "studentId",
    "studentName",
    "college",
    "batch",
    "status",
    "dsaScore",
    "webdScore",
    "reactScore",
    "interviewCompany",
    "interviewDate",
    "result",
  ];

  const parser = new Parser({ fields });
  const csv = parser.parse(results);

  return csv;
};
