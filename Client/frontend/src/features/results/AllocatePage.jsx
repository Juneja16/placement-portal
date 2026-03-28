import { useEffect, useState, useRef } from "react";
import { fetchStudents } from "../students/studentAPI";
import { fetchInterviews } from "../interviews/interviewAPI";
import { allocateStudent } from "./resultAPI";
import MainLayout from "../../shared/layout/MainLayout";
import toast from "react-hot-toast";
import {
  UserPlus,
  User,
  Building2,
  ChevronDown,
  CheckCircle2,
  CalendarDays,
  GraduationCap,
} from "lucide-react";

/* ── Helpers ── */
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
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

function daysFromToday(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.round((target - today) / (1000 * 60 * 60 * 24));
}

function getInitials(name = "") {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

const STATUS_PILL = {
  placed: "bg-emerald-50 text-emerald-700 border-emerald-100",
  not_placed: "bg-rose-50 text-rose-400 border-rose-100",
  interview: "bg-amber-50 text-amber-700 border-amber-100",
};

const AVATAR_PALETTE = [
  "bg-violet-50 text-violet-600",
  "bg-blue-50 text-blue-600",
  "bg-cyan-50 text-cyan-700",
  "bg-teal-50 text-teal-700",
  "bg-indigo-50 text-indigo-600",
  "bg-slate-100 text-slate-600",
];

/* ── Custom Dropdown ── */
function CustomDropdown({ icon: Icon, placeholder, displayLabel, children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 bg-white border rounded-xl text-sm transition-all duration-150
          ${open ? "border-slate-400 ring-2 ring-slate-100" : "border-slate-200 hover:border-slate-300"}`}
      >
        <Icon className="w-4 h-4 text-slate-400 shrink-0" strokeWidth={1.8} />
        <span
          className={`flex-1 text-left truncate ${displayLabel ? "text-slate-800 font-medium" : "text-slate-400"}`}
        >
          {displayLabel || placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          strokeWidth={2}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute z-30 left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden">
          <div className="max-h-64 overflow-y-auto divide-y divide-slate-50">
            {children({ close: () => setOpen(false) })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Sub-components ── */
function SectionDivider({ title }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-px bg-slate-100" />
      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 shrink-0">
        {title}
      </span>
      <div className="flex-1 h-px bg-slate-100" />
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        {hint && <span className="text-[10px] text-slate-400">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

/* ── Page ── */
function AllocatePage() {
  const [students, setStudents] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedInterview, setSelectedInterview] = useState("");

  useEffect(() => {
    fetchStudents().then((res) => setStudents(res.data));
    fetchInterviews().then((res) => setInterviews(res.data));
  }, []);

  const handleAllocate = async () => {
    if (!selectedStudent || !selectedInterview) {
      return toast.error("Please select both a student and an interview");
    }
    try {
      await allocateStudent({
        studentId: selectedStudent,
        interviewId: selectedInterview,
      });
      toast.success("Student allocated successfully 🎉");
    } catch {
      toast.error("Allocation failed ❌");
    }
  };

  // Derived display-only — used for trigger label and confirmation chip
  const chosenStudent = students.find((s) => s._id === selectedStudent);
  const chosenInterview = interviews.find((i) => i._id === selectedInterview);

  return (
    <MainLayout>
      <div className="max-w-md mx-auto py-2">
        {/* ── Page Header ── */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center shadow-sm">
            <UserPlus className="w-4 h-4 text-white" strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 leading-tight">
              Allocate Student
            </h1>
            <p className="text-xs text-slate-400">
              Assign a student to an interview round
            </p>
          </div>
        </div>

        {/* ── Form Card ── */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 flex flex-col gap-5">
          <SectionDivider title="Assignment Details" />

          {/* ── Student Dropdown ── */}
          <Field label="Student" hint="name · batch · status">
            <CustomDropdown
              icon={User}
              placeholder="Select a student"
              displayLabel={chosenStudent?.name || ""}
            >
              {({ close }) =>
                students.map((s, index) => {
                  const isSelected = selectedStudent === s._id;
                  const avatarColor =
                    AVATAR_PALETTE[index % AVATAR_PALETTE.length];
                  const pillClass =
                    STATUS_PILL[s.status] || STATUS_PILL.Pending;

                  return (
                    <button
                      key={s._id}
                      type="button"
                      onClick={() => {
                        setSelectedStudent(s._id); // ✅ plain _id string
                        close();
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-100
                        ${isSelected ? "bg-slate-50" : "hover:bg-slate-50/80"}`}
                    >
                      {/* Avatar */}
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${avatarColor}`}
                      >
                        {getInitials(s.name)}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">
                          {s.name}
                        </p>
                        {s.batch && (
                          <div className="flex items-center gap-1 mt-0.5">
                            <GraduationCap
                              className="w-3 h-3 text-slate-400"
                              strokeWidth={1.8}
                            />
                            <span className="text-[11px] text-slate-400">
                              {s.batch}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Status pill */}
                      {s.status && (
                        // Status pill display
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${pillClass}`}
                        >
                          {formatStatus(s.status)}
                        </span>
                      )}
                    </button>
                  );
                })
              }
            </CustomDropdown>
          </Field>

          {/* ── Interview Dropdown ── */}
          <Field label="Company" hint="company · date · days left">
            <CustomDropdown
              icon={Building2}
              placeholder="Select an interview"
              displayLabel={chosenInterview?.company || ""}
            >
              {({ close }) =>
                interviews.map((i, index) => {
                  const days = daysFromToday(i.date);
                  const isToday = days === 0;
                  const isUpcoming = days > 0;
                  const isPast = days < 0;
                  const isSelected = selectedInterview === i._id;

                  const avatarColor =
                    AVATAR_PALETTE[index % AVATAR_PALETTE.length];
                  const initials =
                    i.company
                      ?.split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase() || "?";

                  const accentBar = isToday
                    ? "bg-blue-400"
                    : isUpcoming
                      ? "bg-emerald-400"
                      : "bg-rose-200";

                  let timingPill;
                  if (isToday) {
                    timingPill = (
                      <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-100 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                        Today
                      </span>
                    );
                  } else if (isUpcoming) {
                    timingPill = (
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-100 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        in {days}d
                      </span>
                    );
                  } else {
                    timingPill = (
                      <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-100 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-300" />
                        Done
                      </span>
                    );
                  }

                  return (
                    <button
                      key={i._id}
                      type="button"
                      onClick={() => {
                        setSelectedInterview(i._id); // ✅ plain _id string
                        close();
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-100 relative
                        ${isSelected ? "bg-slate-50" : "hover:bg-slate-50/80"}
                        ${isPast ? "opacity-60" : ""}`}
                    >
                      {/* Left accent line */}
                      <div
                        className={`absolute left-0 top-2 bottom-2 w-0.5 rounded-full ${accentBar}`}
                      />

                      {/* Avatar */}
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${avatarColor}`}
                      >
                        {initials}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-semibold truncate ${isPast ? "text-slate-400" : "text-slate-800"}`}
                        >
                          {i.company}
                        </p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <CalendarDays
                            className="w-3 h-3 text-slate-400"
                            strokeWidth={1.8}
                          />
                          <span className="text-[11px] text-slate-400">
                            {formatDate(i.date)}
                          </span>
                        </div>
                      </div>

                      {timingPill}
                    </button>
                  );
                })
              }
            </CustomDropdown>
          </Field>

          {/* ── Confirmation chip ── */}
          {chosenStudent && chosenInterview && (
            <div className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
              <CheckCircle2
                className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"
                strokeWidth={2}
              />
              <div>
                <p className="text-xs font-semibold text-emerald-800 leading-snug">
                  {chosenStudent.name}
                  <span className="font-normal text-emerald-600">
                    {" "}
                    will be assigned to{" "}
                  </span>
                  {chosenInterview.company}
                </p>
                <p className="text-[10px] text-emerald-500 mt-0.5">
                  Interview on {formatDate(chosenInterview.date)}
                  {daysFromToday(chosenInterview.date) === 0
                    ? " — Today"
                    : daysFromToday(chosenInterview.date) > 0
                      ? ` — in ${daysFromToday(chosenInterview.date)} days`
                      : " — Completed"}
                </p>
              </div>
            </div>
          )}

          {/* ── Submit ── */}
          <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 mt-1">
            <button
              onClick={handleAllocate}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white rounded-md bg-slate-800 hover:bg-slate-700 active:scale-[0.98] transition-all"
            >
              <UserPlus className="w-4 h-4" strokeWidth={2} />
              Allocate Student
            </button>
            <p className="text-center text-[11px] text-slate-400">
              Both fields are required to complete allocation
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default AllocatePage;
