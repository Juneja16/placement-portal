import {
  Users,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
} from "lucide-react";

function StudentTable({ students }) {
  const placed = students.filter((s) => s.status === "placed").length;
  const notPlaced = students.filter((s) => s.status === "not_placed").length;

  return (
    <div>
      {/* ── Stats Strip ── */}
      {students.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            {
              label: "Total Students",
              value: students.length,
              icon: Users,
              iconBg: "bg-slate-100",
              iconColor: "text-slate-600",
              valueColor: "text-slate-800",
            },
            {
              label: "Placed",
              value: placed,
              icon: CheckCircle2,
              iconBg: "bg-emerald-50",
              iconColor: "text-emerald-600",
              valueColor: "text-emerald-700",
            },
            {
              label: "Not Placed",
              value: notPlaced,
              icon: Clock3,
              iconBg: "bg-amber-50",
              iconColor: "text-amber-500",
              valueColor: "text-amber-700",
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
        Registered Records
      </p>

      {/* ── Empty State ── */}
      {students.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col items-center justify-center py-16">
          <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-4">
            <Users className="w-7 h-7 text-slate-300" strokeWidth={1.5} />
          </div>
          <p className="text-sm font-semibold text-slate-500">
            No students yet
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Use the button above to register a student
          </p>
        </div>
      ) : (
        /* ── Card Grid ── */
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {students.map((s, index) => {
            const isPlaced = s.status === "placed";
            const initials =
              s.name
                ?.split(" ")
                .map((w) => w[0])
                .slice(0, 2)
                .join("")
                .toUpperCase() || "?";

            const avatarPalette = [
              "bg-blue-50 text-blue-600",
              "bg-violet-50 text-violet-600",
              "bg-cyan-50 text-cyan-700",
              "bg-rose-50 text-rose-600",
              "bg-amber-50 text-amber-700",
              "bg-teal-50 text-teal-700",
            ];
            const avatarColor = avatarPalette[index % avatarPalette.length];

            return (
              <div
                key={s._id}
                className="group bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
              >
                {/* Accent top bar */}
                <div
                  className={`h-0.5 w-full ${isPlaced ? "bg-emerald-400" : "bg-amber-300"}`}
                />

                <div className="p-4">
                  {/* Avatar + Status */}
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${avatarColor}`}
                    >
                      {initials}
                    </div>
                    {isPlaced ? (
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Placed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        Not Placed
                      </span>
                    )}
                  </div>

                  {/* Name */}
                  <p className="text-sm font-semibold text-slate-800 truncate">
                    {s.name}
                  </p>

                  {/* College + Batch */}
                  <div className="mt-2.5 flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Building2
                        className="w-3.5 h-3.5 text-slate-400 shrink-0"
                        strokeWidth={1.8}
                      />
                      <span className="truncate">{s.college}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <CalendarDays
                        className="w-3.5 h-3.5 text-slate-400 shrink-0"
                        strokeWidth={1.8}
                      />
                      <span>Batch {s.batch}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Footer ── */}
      {students.length > 0 && (
        <p className="text-xs text-slate-400 mt-4 text-right">
          Showing{" "}
          <span className="font-semibold text-slate-600">
            {students.length}
          </span>{" "}
          {students.length === 1 ? "record" : "records"}
        </p>
      )}
    </div>
  );
}

export default StudentTable;
