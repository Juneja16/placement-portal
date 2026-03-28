import { useState } from "react";
import { createInterview } from "../interviewAPI";
import toast from "react-hot-toast";
import { CalendarDays, Building2, Plus } from "lucide-react";

function validate(form) {
  const errors = {};

  const companyTrimmed = (form.company || "").trim();

  if (!companyTrimmed) {
    errors.company = "Company name is required";
  } else if (companyTrimmed.length < 2) {
    errors.company = "Enter a valid company name (min. 2 characters)";
  } else if (!/^[a-zA-Z0-9\s',.()& -]+$/.test(companyTrimmed)) {
    errors.company = "Company name contains invalid characters";
  }

  // Date validation
  if (!form.date) {
    errors.date = "Interview date is required";
  } else {
    const selected = new Date(form.date);
    selected.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected < today) {
      errors.date = "Interview date cannot be in the past";
    }
  }

  return errors;
}

/* ── Section divider  ── */
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

/* ── Field wrapper── */
function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      {children}
      {error && <p className="text-[11px] text-red-500 font-medium">{error}</p>}
    </div>
  );
}

function InterviewForm({ refresh }) {
  const [form, setForm] = useState({
    company: "",
    date: "",
  });

  const [errors, setErrors] = useState({});

  const set = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    //  clears the error message as the user types
    if (errors[key]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  const handleSubmit = async () => {
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the errors before submitting");
      return;
    }

    try {
      await createInterview(form);
      toast.success("Interview created successfully 🎉");
      // Reset form on success
      setForm({ company: "", date: "" });
      setErrors({});
      refresh();
    } catch (err) {
      toast.error("Failed to create interview ❌");
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* ── Interview Details ── */}
      <SectionDivider title="Interview Details" />

      <Field label="Company Name" error={errors.company}>
        <IconInput
          icon={Building2}
          placeholder="e.g. Google"
          value={form.company}
          error={errors.company}
          onChange={(e) => set("company", e.target.value)}
        />
      </Field>

      <Field label="Interview Date" error={errors.date}>
        <IconInput
          icon={CalendarDays}
          type="date"
          value={form.date}
          error={errors.date}
          onChange={(e) => set("date", e.target.value)}
        />
      </Field>

      {/* ── Submit ── */}
      <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 mt-1">
        <button
          className="w-full inline-flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white rounded-md bg-slate-800 hover:bg-slate-700 active:scale-[0.98] transition-all"
          onClick={handleSubmit}
        >
          <Plus className="w-4 h-4" />
          Create Interview
        </button>
        <p className="text-center text-[11px] text-slate-400">
          All fields are required to schedule
        </p>
      </div>
    </div>
  );
}

export default InterviewForm;
