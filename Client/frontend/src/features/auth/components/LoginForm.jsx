import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { loginUser } from "../authAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setToken } from "../authSlice";
import toast from "react-hot-toast";
import { LogIn, Mail, Lock } from "lucide-react";

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
  }

  return errors;
}

function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.auth);

  if (token) return <Navigate to="/dashboard" replace />;

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

  const handleLogin = async () => {
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the errors before submitting");
      return;
    }

    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.data.token);
      dispatch(setToken(res.data.token));
      toast.success("Login successful 🎉");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Invalid credentials ❌");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-8 w-full max-w-sm">
        {/* Brand Icon */}
        <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center mb-5 shadow-sm">
          <Lock className="w-5 h-5 text-white" strokeWidth={2} />
        </div>

        <h1 className="text-lg font-bold text-slate-800 leading-tight">
          Welcome back
        </h1>
        <p className="text-xs text-slate-400 mb-5">
          Sign in to Placement Portal
        </p>

        {/* Badges */}
        <div className="flex gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-full px-2.5 py-1 text-xs text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
            Secure login
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
              placeholder="Enter your password"
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
          onClick={handleLogin}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 active:scale-95 text-white text-sm font-semibold transition-all duration-150"
        >
          <LogIn className="w-4 h-4" strokeWidth={2} />
          Login
        </button>

        <p className="mt-4 text-xs text-center text-slate-400">
          Don't have an account?{" "}
          <span
            className="text-violet-600 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
