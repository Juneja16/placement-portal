import { useState } from "react";
import { createStudent } from "../studentAPI";
import toast from "react-hot-toast";
import {
  Plus,
  User,
  School,
  CalendarDays,
  Briefcase,
  ChevronDown,
} from "lucide-react";

const SCORE_FIELDS = [
  {
    key: "dsa",
    label: "DSA Score",
    sublabel: "Data Structures & Algorithms",
    badge: "DSA",
    badgeStyle: "bg-blue-50 text-blue-500 border border-blue-100",
    ring: "focus:ring-blue-200 focus:border-blue-400",
    barColor: "bg-blue-400",
  },
  {
    key: "webd",
    label: "Web Dev Score",
    sublabel: "HTML / CSS / JavaScript",
    badge: "WEB",
    badgeStyle: "bg-violet-50 text-violet-500 border border-violet-100",
    ring: "focus:ring-violet-200 focus:border-violet-400",
    barColor: "bg-violet-400",
  },
  {
    key: "react",
    label: "React Score",
    sublabel: "Components & JSX",
    badge: "JSX",
    badgeStyle: "bg-cyan-50 text-cyan-600 border border-cyan-100",
    ring: "focus:ring-cyan-200 focus:border-cyan-400",
    barColor: "bg-cyan-400",
  },
];

/* ── Validation ── */
function validate(form) {
  const errors = {};

  // Name: min 2 chars, letters/spaces/hyphens/apostrophes only
  const nameTrimmed = (form.name || "").trim();
  if (!nameTrimmed) {
    errors.name = "Name is required";
  } else if (nameTrimmed.length < 2) {
    errors.name = "Name must be at least 2 characters";
  } else if (!/^[a-zA-Z\s\'\-]+$/.test(nameTrimmed)) {
    errors.name =
      "Name can only contain letters, spaces, hyphens or apostrophes";
  }

  // College: min 3 chars, letters/digits/spaces/common punctuation
  const collegeTrimmed = (form.college || "").trim();
  if (!collegeTrimmed) {
    errors.college = "College name is required";
  } else if (collegeTrimmed.length < 3) {
    errors.college = "Enter a valid college name (min. 3 characters)";
  } else if (!/^[a-zA-Z0-9\s',.()&\-]+$/.test(collegeTrimmed)) {
    errors.college = "College name contains invalid characters";
  }
  // Batch: exactly 4 digits, year 2000–2100
  const batchTrimmed = form.batch.trim();
  if (!batchTrimmed) {
    errors.batch = "Batch year is required";
  } else if (!/^\d{4}$/.test(batchTrimmed)) {
    errors.batch = "Batch must be a 4-digit year (e.g. 2024)";
  } else {
    const year = parseInt(batchTrimmed, 10);
    if (year < 2000 || year > 2100) {
      errors.batch = "Batch year must be between 2000 and 2100";
    }
  }

  // Scores: all required, must be numeric, 0–100
  for (const field of SCORE_FIELDS) {
    const val = form.scores[field.key];
    if (val === "" || val === undefined || val === null) {
      errors[field.key] = `${field.label} is required`;
    } else {
      const num = parseFloat(val);
      if (isNaN(num)) {
        errors[field.key] = `${field.label} must be a number`;
      } else if (num < 0 || num > 100) {
        errors[field.key] = `${field.label} must be between 0 and 100`;
      }
    }
  }

  return errors;
}

/* ── Field wrapper ── */
function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      {children}
      {error && <p className="text-[11px] text-red-500 font-medium">{error}</p>}
    </div>
  );
}

/* ── Input with left icon ── */
function IconInput({ icon: Icon, error, ...props }) {
  return (
    <div className="relative group">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-slate-600 transition-colors pointer-events-none" />
      <input
        className={`w-full pl-9 pr-3 py-2 text-sm text-slate-800 bg-white border rounded-md outline-none focus:ring-2 placeholder-slate-400 transition-all ${
          error
            ? "border-red-300 focus:ring-red-200 focus:border-red-400"
            : "border-slate-200 focus:ring-slate-300 focus:border-slate-400"
        }`}
        {...props}
      />
    </div>
  );
}

/* ── Score input ── */
function ScoreInput({ field, value, onChange, error }) {
  const num = parseFloat(value);
  const pct = !isNaN(num) ? Math.min(Math.max(num, 0), 100) : 0;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-slate-700">
          {field.label}
        </label>
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded tracking-wide ${field.badgeStyle}`}
        >
          {field.badge}
        </span>
      </div>
      <p className="text-xs text-slate-400 -mt-1">{field.sublabel}</p>
      <input
        type="number"
        min="0"
        max="100"
        value={value}
        placeholder="0 – 100"
        className={`w-full px-3 py-2 text-sm text-slate-800 bg-white border rounded-md outline-none focus:ring-2 placeholder-slate-400 transition-all ${
          error
            ? "border-red-300 focus:ring-red-200 focus:border-red-400"
            : `border-slate-200 ${field.ring}`
        }`}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${field.barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex items-center justify-between -mt-0.5">
        {error ? (
          <p className="text-[11px] text-red-500 font-medium">{error}</p>
        ) : (
          <span />
        )}
        <p className="text-[11px] text-slate-400 text-right">
          <span className="font-semibold text-slate-600">
            {isNaN(num) ? "—" : Math.round(pct)}
          </span>
          {" / 100"}
        </p>
      </div>
    </div>
  );
}

/* ── Section divider ── */
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

/* ── Main Form ── */
function StudentForm({ refresh }) {
  const [form, setForm] = useState({
    name: "",
    college: "",
    batch: "",
    status: "not_placed",
    scores: { dsa: "", webd: "", react: "" },
  });

  const [errors, setErrors] = useState({});

  const set = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const setScore = (key, val) => {
    setForm((f) => ({ ...f, scores: { ...f.scores, [key]: val } }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = async () => {
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the errors before submitting");
      return;
    }

    try {
      await createStudent(form);
      toast.success("Student added successfully 🎉");
      // Reset form on success
      setForm({
        name: "",
        college: "",
        batch: "",
        status: "not_placed",
        scores: { dsa: "", webd: "", react: "" },
      });
      setErrors({});
      refresh();
    } catch {
      toast.error("Failed to add student ❌");
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* ── Personal Info ── */}
      <SectionDivider title="Personal Info" />

      <Field label="Full Name" error={errors.name}>
        <IconInput
          icon={User}
          placeholder="e.g. Arjun Sharma"
          value={form.name}
          error={errors.name}
          onChange={(e) => set("name", e.target.value)}
        />
      </Field>

      <Field label="College" error={errors.college}>
        <IconInput
          icon={School}
          placeholder="e.g. IIT Delhi"
          value={form.college}
          error={errors.college}
          onChange={(e) => set("college", e.target.value)}
        />
      </Field>

      <Field label="Batch" error={errors.batch}>
        <IconInput
          icon={CalendarDays}
          placeholder="e.g. 2024"
          value={form.batch}
          error={errors.batch}
          maxLength={4}
          onChange={(e) => set("batch", e.target.value)}
        />
      </Field>

      <Field label="Placement Status">
        <div className="relative group">
          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-focus-within:text-slate-600 transition-colors" />
          <select
            className="w-full pl-9 pr-8 py-2 text-sm text-slate-800 bg-white border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-400 appearance-none cursor-pointer transition-all"
            value={form.status}
            onChange={(e) => set("status", e.target.value)}
          >
            <option value="not_placed">Not Placed</option>
            <option value="placed">Placed</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>
      </Field>

      {/* ── Skill Scores ── */}
      <SectionDivider title="Skill Scores" />

      {SCORE_FIELDS.map((field) => (
        <ScoreInput
          key={field.key}
          field={field}
          value={form.scores[field.key]}
          error={errors[field.key]}
          onChange={(val) => setScore(field.key, val)}
        />
      ))}

      {/* ── Submit ── */}
      <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 mt-1">
        <button
          className="w-full inline-flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white rounded-md bg-slate-800 hover:bg-slate-700 active:scale-[0.98] transition-all"
          onClick={handleSubmit}
        >
          <Plus className="w-4 h-4" />
          Add Student
        </button>
        <p className="text-center text-[11px] text-slate-400">
          All fields are required to register
        </p>
      </div>
    </div>
  );
}

export default StudentForm;
