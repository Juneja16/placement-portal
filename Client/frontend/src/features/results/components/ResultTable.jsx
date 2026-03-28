import toast from "react-hot-toast";
import { updateResultStatus } from "../resultAPI";
import {
  Building2,
  Users,
  ClipboardList,
  CheckCircle2,
  XCircle,
  PauseCircle,
} from "lucide-react";

const avatarPalette = [
  "bg-blue-50 text-blue-600",
  "bg-indigo-50 text-indigo-600",
  "bg-violet-50 text-violet-600",
  "bg-cyan-50 text-cyan-700",
  "bg-teal-50 text-teal-700",
  "bg-slate-100 text-slate-600",
];

const STATUS_CONFIG = {
  PASS: {
    badge: "bg-emerald-50 text-emerald-700 border border-emerald-100",
    bar: "bg-emerald-400",
    dot: "bg-emerald-400",
  },
  FAIL: {
    badge: "bg-red-50 text-red-500 border border-red-100",
    bar: "bg-red-400",
    dot: "bg-red-400",
  },
  "On Hold": {
    badge: "bg-amber-50 text-amber-600 border border-amber-100",
    bar: "bg-amber-400",
    dot: "bg-amber-400",
  },
  "Didnt Attempt": {
    badge: "bg-slate-100 text-slate-500 border border-slate-200",
    bar: "bg-slate-300",
    dot: "bg-slate-400",
  },
};

function ResultTable({ results, refresh }) {
  const handleChange = async (id, value) => {
    try {
      await updateResultStatus(id, { resultStatus: value });
      toast.success("Result updated 🎉");
      refresh();
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to update ❌");
    }
  };

  // ── Stats ──
  const pass = results.filter((r) => r.resultStatus === "PASS").length;
  const fail = results.filter((r) => r.resultStatus === "FAIL").length;
  const onHold = results.filter((r) => r.resultStatus === "On Hold").length;

  return (
    <div>
      {/* ── Stats Strip ── */}
      {results.length > 0 && (
        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            {
              label: "Total",
              value: results.length,
              icon: ClipboardList,
              iconBg: "bg-slate-100",
              iconColor: "text-slate-600",
              valueColor: "text-slate-800",
            },
            {
              label: "Pass",
              value: pass,
              icon: CheckCircle2,
              iconBg: "bg-emerald-50",
              iconColor: "text-emerald-600",
              valueColor: "text-emerald-700",
            },
            {
              label: "Fail",
              value: fail,
              icon: XCircle,
              iconBg: "bg-red-50",
              iconColor: "text-red-400",
              valueColor: "text-red-600",
            },
            {
              label: "On Hold",
              value: onHold,
              icon: PauseCircle,
              iconBg: "bg-amber-50",
              iconColor: "text-amber-500",
              valueColor: "text-amber-600",
            },
          ].map(
            ({ label, value, icon: Icon, iconBg, iconColor, valueColor }) => (
              <div
                key={label}
                className="bg-white border border-slate-100 rounded-2xl px-4 py-3.5 flex items-center gap-3 shadow-sm"
              >
                <div
                  className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}
                >
                  <Icon className={`w-4 h-4 ${iconColor}`} strokeWidth={2} />
                </div>
                <div>
                  <p className={`text-xl font-bold leading-none ${valueColor}`}>
                    {value}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                    {label}
                  </p>
                </div>
              </div>
            ),
          )}
        </div>
      )}

      {/* ── Section Label ── */}
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 mb-3">
        Interview Results
      </p>

      {/* ── Empty State ── */}
      {results.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col items-center justify-center py-16">
          <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-4">
            <ClipboardList
              className="w-7 h-7 text-slate-300"
              strokeWidth={1.5}
            />
          </div>
          <p className="text-sm font-semibold text-slate-500">
            No results found
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Results will appear here once available
          </p>
        </div>
      ) : (
        /* ── Card Grid ── */
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {results.map((r, index) => {
            const config =
              STATUS_CONFIG[r.resultStatus] ?? STATUS_CONFIG["Didn't Attempt"];
            const avatarColor = avatarPalette[index % avatarPalette.length];
            const initials =
              r.studentId?.name
                ?.split(" ")
                .map((w) => w[0])
                .slice(0, 2)
                .join("")
                .toUpperCase() || "?";

            return (
              <div
                key={r._id}
                className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
              >
                {/* Accent bar */}
                <div className={`h-0.5 w-full ${config.bar}`} />

                <div className="p-4">
                  {/* Avatar + Status badge */}
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${avatarColor}`}
                    >
                      {initials}
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${config.badge}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${config.dot}`}
                      />
                      {r.resultStatus}
                    </span>
                  </div>

                  {/* Student Name */}
                  <p className="text-sm font-semibold text-slate-800 truncate">
                    {r.studentId?.name || "Unknown Student"}
                  </p>

                  {/* College */}
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                    <Building2
                      className="w-3.5 h-3.5 text-slate-400 shrink-0"
                      strokeWidth={1.8}
                    />
                    <span className="truncate">
                      {r.studentId?.college || "—"}
                    </span>
                  </div>

                  {/* Placement Status */}
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <Users
                      className="w-3.5 h-3.5 text-slate-400 shrink-0"
                      strokeWidth={1.8}
                    />
                    <span className="text-[11px] text-slate-500 font-medium capitalize">
                      {r.studentId?.status?.replace("_", " ") || "—"}
                    </span>
                  </div>

                  {/* Result Select */}
                  <div className="mt-3.5 pt-3 border-t border-slate-100">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                      Update Result
                    </label>
                    <div className="relative">
                      <select
                        value={r.resultStatus}
                        onChange={(e) => handleChange(r._id, e.target.value)}
                        className="w-full pl-3 pr-8 py-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-400 appearance-none cursor-pointer transition-all"
                      >
                        <option value="PASS">PASS</option>
                        <option value="FAIL">FAIL</option>
                        <option value="On Hold">On Hold</option>

                        <option value="Didnt Attempt">Didn't Attempt</option>
                      </select>
                      <svg
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Footer ── */}
      {results.length > 0 && (
        <p className="text-xs text-slate-400 mt-4 text-right">
          Showing{" "}
          <span className="font-semibold text-slate-600">{results.length}</span>{" "}
          {results.length === 1 ? "result" : "results"}
        </p>
      )}
    </div>
  );
}

export default ResultTable;
