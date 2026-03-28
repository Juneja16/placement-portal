import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../authAPI";
import toast from "react-hot-toast";
import { UserPlus, Mail, Lock } from "lucide-react";

/* ── Validation ── */
function validate(form) {
  const errors = {};

  const emailTrimmed = (form.email || "").trim();
  const password = form.password || "";

  if (!emailTrimmed) {
    errors.email = "Email address is required";
  } else if (!/^\S+@\S+\.\S+$/.test(emailTrimmed)) {
    errors.email = "Enter a valid email address";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
}

function SignupForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  //  Clears field error on typing
  const set = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleSignup = async () => {
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the errors before submitting");
      return;
    }

    try {
      await signupUser(form);
      toast.success("Signup successful 🎉");
      // ✅ Reset errors on success
      setErrors({});
      navigate("/");
    } catch (err) {
      toast.error("Signup failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-8 w-full max-w-sm">
        {/* Brand Icon */}
        <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center mb-5 shadow-sm">
          <UserPlus className="w-5 h-5 text-white" strokeWidth={2} />
        </div>

        <h1 className="text-lg font-bold text-slate-800 leading-tight">
          Create account
        </h1>
        <p className="text-xs text-slate-400 mb-5">
          Join Placement Portal today
        </p>

        {/* Badges */}
        <div className="flex gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-full px-2.5 py-1 text-xs text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
            Free to join
          </span>
          <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-full px-2.5 py-1 text-xs text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 inline-block" />
            Placement Portal
          </span>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5 block">
            Email address
          </label>
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300"
              strokeWidth={1.8}
            />
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              className={`w-full pl-9 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-800 placeholder:text-slate-300 outline-none focus:ring-2 transition-all
                ${
                  errors.email
                    ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                    : "border-slate-100 focus:border-violet-300 focus:ring-violet-100"
                }`}
              onChange={(e) => set("email", e.target.value)}
            />
          </div>
          {errors.email && (
            <p className="text-[11px] text-red-500 font-medium mt-1">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5 block">
            Password
          </label>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300"
              strokeWidth={1.8}
            />
            <input
              type="password"
              placeholder="Create a strong password"
              value={form.password}
              className={`w-full pl-9 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-800 placeholder:text-slate-300 outline-none focus:ring-2 transition-all
                ${
                  errors.password
                    ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                    : "border-slate-100 focus:border-violet-300 focus:ring-violet-100"
                }`}
              onChange={(e) => set("password", e.target.value)}
            />
          </div>
          {errors.password && (
            <p className="text-[11px] text-red-500 font-medium mt-1">
              {errors.password}
            </p>
          )}
        </div>

        <button
          onClick={handleSignup}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 active:scale-95 text-white text-sm font-semibold transition-all duration-150"
        >
          <UserPlus className="w-4 h-4" strokeWidth={2} />
          Create Account
        </button>

        <p className="mt-4 text-xs text-center text-slate-400">
          Already have an account?{" "}
          <span
            className="text-violet-600 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignupForm;
