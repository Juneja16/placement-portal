import { useEffect, useState } from "react";
import { fetchAllResults } from "./resultAPI";
import MainLayout from "../../shared/layout/MainLayout";
import toast from "react-hot-toast";
import {
  ClipboardList,
  Building2,
  CalendarDays,
  GraduationCap,
} from "lucide-react";

/* ── Helpers ── */
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatStatus(status = "") {
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getInitials(name = "") {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

const AVATAR_PALETTE = [
  "bg-violet-50 text-violet-600",
  "bg-blue-50 text-blue-600",
  "bg-cyan-50 text-cyan-700",
  "bg-teal-50 text-teal-700",
  "bg-indigo-50 text-indigo-600",
  "bg-slate-100 text-slate-600",
];

const RESULT_STYLES = {
  PASS: "bg-emerald-50 text-emerald-700 border-emerald-100",
  FAIL: "bg-rose-50 text-rose-500 border-rose-100",
  "On Hold": "bg-amber-50 text-amber-700 border-amber-100",
  "Didnt Attempt": "bg-slate-100 text-slate-500 border-slate-200",
};

const RESULT_DOT = {
  PASS: "bg-emerald-400",
  FAIL: "bg-rose-400",
  "On Hold": "bg-amber-400",
  "Didnt Attempt": "bg-slate-300",
};

/* ── Stat counts ── */
function getCounts(data) {
  return {
    total: data.length,
    pass: data.filter((r) => r.resultStatus === "PASS").length,
    fail: data.filter((r) => r.resultStatus === "FAIL").length,
    onHold: data.filter((r) => r.resultStatus === "On Hold").length,
    didntAttempt: data.filter((r) => r.resultStatus === "Didnt Attempt").length,
  };
}

/* ── Page ── */
function AllResultsPage() {
  const [data, setData] = useState([]);

  
  const load = async () => {
    try {
      const res = await fetchAllResults();
      setData(res.data);
    } catch {
      toast.error("Failed to fetch results ❌");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const counts = getCounts(data);

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto py-2">
        {/* ── Page Header ── */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center shadow-sm">
            <ClipboardList className="w-4 h-4 text-white" strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 leading-tight">
              All Results
            </h1>
            <p className="text-xs text-slate-400">Student placement outcomes</p>
          </div>
        </div>

        {/* ── Stats Strip ── */}
        {data.length > 0 && (
          <div className="grid grid-cols-4 gap-3 mb-6">
            {[
              {
                label: "Total",
                value: counts.total,
                dot: "bg-slate-400",
                text: "text-slate-800",
              },
              {
                label: "Pass",
                value: counts.pass,
                dot: "bg-emerald-400",
                text: "text-emerald-700",
              },
              {
                label: "Fail",
                value: counts.fail,
                dot: "bg-rose-400",
                text: "text-rose-500",
              },
              {
                label: "On Hold",
                value: counts.onHold,
                dot: "bg-amber-400",
                text: "text-amber-700",
              },
            ].map(({ label, value, dot, text }) => (
              <div
                key={label}
                className="bg-white border border-slate-100 rounded-2xl px-4 py-3.5 flex items-center gap-3 shadow-sm"
              >
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${dot}`} />
                <div>
                  <p className={`text-xl font-bold leading-none ${text}`}>
                    {value}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Section Label ── */}
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 mb-3">
          Results
        </p>

        {/* ── Empty State ── */}
        {data.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col items-center justify-center py-16">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-4">
              <ClipboardList
                className="w-7 h-7 text-slate-300"
                strokeWidth={1.5}
              />
            </div>
            <p className="text-sm font-semibold text-slate-500">
              No results yet
            </p>
            <p className="text-xs text-slate-400 mt-1">
              View Previous Interview Attempts
            </p>
          </div>
        ) : (
          /* ── Table ── */
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
            {/* Table Head */}
            <div className="grid grid-cols-[2fr_1.5fr_1.5fr_1.5fr_1.2fr_1fr] gap-6 px-5 py-3 bg-slate-50 border-b border-slate-100">
              {[
                "Student",
                "College",
                "Status",
                "Company",
                "Date",
                "Result",
              ].map((col) => (
                <span
                  key={col}
                  className="text-[10px] font-bold uppercase tracking-wider text-slate-400"
                >
                  {col}
                </span>
              ))}
            </div>

            {/* Rows */}
            {data.map((r, index) => {
              const avatarColor = AVATAR_PALETTE[index % AVATAR_PALETTE.length];
              const pillClass =
                RESULT_STYLES[r.resultStatus] || RESULT_STYLES["On Hold"];
              const dotClass =
                RESULT_DOT[r.resultStatus] || RESULT_DOT["On Hold"];

              return (
                <div
                  key={r._id}
                  className="grid grid-cols-[2fr_1.5fr_1.5fr_1.5fr_1.2fr_1fr] gap-6 px-5 py-3.5 border-b border-slate-50 last:border-b-0 items-center hover:bg-slate-50/60 transition-colors duration-100"
                >
                  {/* Student */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${avatarColor}`}
                    >
                      {getInitials(r.student.name)}
                    </div>
                    <span className="text-sm font-semibold text-slate-800 truncate">
                      {r.student.name}
                    </span>
                  </div>

                  {/* College */}
                  <div className="flex items-center gap-1.5 min-w-0">
                    <GraduationCap
                      className="w-3.5 h-3.5 text-slate-400 shrink-0"
                      strokeWidth={1.8}
                    />
                    <span className="text-xs text-slate-500 truncate">
                      {r.student.college}
                    </span>
                  </div>

                  {/* Student Status */}
                  <span className="text-xs text-slate-500">
                    {formatStatus(r.student.status)}
                  </span>

                  {/* Company */}
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Building2
                      className="w-3.5 h-3.5 text-slate-400 shrink-0"
                      strokeWidth={1.8}
                    />
                    <span className="text-sm font-medium text-slate-700 truncate">
                      {r.interview.company}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-1.5">
                    <CalendarDays
                      className="w-3.5 h-3.5 text-slate-400 shrink-0"
                      strokeWidth={1.8}
                    />
                    <span className="text-xs text-slate-500">
                      {formatDate(r.interview.date)}
                    </span>
                  </div>

                  {/* Result pill */}
                  <span
                    className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border w-fit ${pillClass}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotClass}`}
                    />
                    {formatStatus(r.resultStatus)}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Footer ── */}
        {data.length > 0 && (
          <p className="text-xs text-slate-400 mt-4 text-right">
            Showing{" "}
            <span className="font-semibold text-slate-600">{data.length}</span>{" "}
            {data.length === 1 ? "result" : "results"}
          </p>
        )}
      </div>
    </MainLayout>
  );
}

export default AllResultsPage;
