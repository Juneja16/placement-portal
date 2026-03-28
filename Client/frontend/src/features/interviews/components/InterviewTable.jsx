import { useNavigate } from "react-router-dom";
import {
  Building2,
  CalendarDays,
  ArrowRight,
  ClipboardList,
} from "lucide-react";

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function daysFromToday(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.round((target - today) / (1000 * 60 * 60 * 24));
}

function InterviewTable({ interviews }) {
  const navigate = useNavigate();

  const upcoming = interviews.filter((i) => daysFromToday(i.date) >= 0).length;
  const past = interviews.filter((i) => daysFromToday(i.date) < 0).length;

  return (
    <div>
      {/* ── Stats Strip ── */}
      {interviews.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            {
              label: "Total",
              value: interviews.length,
              icon: ClipboardList,
              iconBg: "bg-slate-100",
              iconColor: "text-slate-600",
              valueColor: "text-slate-800",
            },
            {
              label: "Upcoming",
              value: upcoming,
              icon: CalendarDays,
              iconBg: "bg-emerald-50",
              iconColor: "text-emerald-600",
              valueColor: "text-emerald-700",
            },
            {
              label: "Completed",
              value: past,
              icon: Building2,
              iconBg: "bg-rose-50",
              iconColor: "text-rose-400",
              valueColor: "text-rose-400",
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

      {/* ── Section label + Legend ── */}
      {interviews.length > 0 && (
        <div className="flex items-center gap-4 mb-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
            Scheduled Interviews
          </p>
          <div className="flex items-center gap-3 ml-auto">
            <span className="flex items-center gap-1.5 text-[10px] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
              Today
            </span>
            <span className="flex items-center gap-1.5 text-[10px] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              Upcoming
            </span>
            <span className="flex items-center gap-1.5 text-[10px] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-rose-300 inline-block" />
              Completed
            </span>
          </div>
        </div>
      )}

      {/* ── Empty State ── */}
      {interviews.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col items-center justify-center py-16">
          <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-4">
            <ClipboardList
              className="w-7 h-7 text-slate-300"
              strokeWidth={1.5}
            />
          </div>
          <p className="text-sm font-semibold text-slate-500">
            No interviews scheduled
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Use the button above to create one
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {interviews.map((i, index) => {
            const days = daysFromToday(i.date);
            const isUpcoming = days >= 0;
            const isToday = days === 0;
            const isPast = days < 0;

            // ── FIXED: strip special characters before generating initials ──
            const initials =
              i.company
                ?.replace(/[^a-zA-Z0-9\s]/g, "")
                .trim()
                .split(/\s+/)
                .filter((w) => w.length > 0)
                .map((w) => w[0])
                .slice(0, 2)
                .join("")
                .toUpperCase() || "?";

            const avatarPalette = [
              "bg-blue-50 text-blue-600",
              "bg-indigo-50 text-indigo-600",
              "bg-violet-50 text-violet-600",
              "bg-cyan-50 text-cyan-700",
              "bg-teal-50 text-teal-700",
              "bg-slate-100 text-slate-600",
            ];
            const avatarColor = avatarPalette[index % avatarPalette.length];

            // ── Timing badge ──
            let timingBadge;
            if (isToday) {
              timingBadge = (
                <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  Today
                </span>
              );
            } else if (isUpcoming) {
              timingBadge = (
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  in {days}d
                </span>
              );
            } else {
              timingBadge = (
                <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-300" />
                  Done
                </span>
              );
            }

            // ── Per-status styling ──
            const cardBg = isPast
              ? "bg-rose-50/40 border-rose-100"
              : isToday
                ? "bg-blue-50/30 border-blue-100"
                : "bg-white border-slate-100";

            const accentBar = isToday
              ? "bg-blue-400"
              : isUpcoming
                ? "bg-emerald-400"
                : "bg-rose-200";

            const ctaClass = isToday
              ? "bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200"
              : isUpcoming
                ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200"
                : "bg-rose-50 hover:bg-rose-100 text-rose-400 border border-rose-100";

            const companyTextColor = isPast
              ? "text-slate-400"
              : "text-slate-800";

            return (
              <div
                key={i._id}
                className={`group border rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden ${cardBg}`}
              >
                {/* Accent bar */}
                <div className={`h-0.5 w-full ${accentBar}`} />

                <div className="p-4">
                  {/* Avatar + badge */}
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${avatarColor} ${isPast ? "opacity-50" : ""}`}
                    >
                      {initials}
                    </div>
                    {timingBadge}
                  </div>

                  {/* Company */}
                  <p
                    className={`text-sm font-semibold truncate ${companyTextColor}`}
                  >
                    {i.company}
                  </p>

                  {/* Date */}
                  <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-400">
                    <CalendarDays
                      className="w-3.5 h-3.5 shrink-0"
                      strokeWidth={1.8}
                    />
                    <span>{formatDate(i.date)}</span>
                  </div>

                  {/* ── CTA Button ── */}
                  <div className="mt-3.5 pt-3 border-t border-slate-100/60">
                    <button
                      onClick={() => navigate(`/interviews/${i._id}`)}
                      className={`w-full flex items-center justify-between
                        text-xs font-semibold
                        px-3.5 py-2 rounded-xl
                        transition-all duration-150
                        ${ctaClass}`}
                    >
                      View Details
                      <ArrowRight
                        className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-150"
                        strokeWidth={2.2}
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Footer ── */}
      {interviews.length > 0 && (
        <p className="text-xs text-slate-400 mt-4 text-right">
          Showing{" "}
          <span className="font-semibold text-slate-600">
            {interviews.length}
          </span>{" "}
          {interviews.length === 1 ? "interview" : "interviews"}
        </p>
      )}
    </div>
  );
}

export default InterviewTable;
