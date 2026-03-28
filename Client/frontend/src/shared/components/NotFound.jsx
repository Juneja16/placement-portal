import { useNavigate } from "react-router-dom";
import { LayoutDashboard, MoveLeft, GraduationCap } from "lucide-react";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

      <div className="w-full max-w-lg">

        {/* ── Big 404 block ── */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden mb-4">

          {/* Top accent bar */}
          <div className="h-1 w-full bg-slate-800" />

          <div className="px-10 py-12 flex flex-col items-start">

            {/* Portal badge — mirrors Navbar logo style */}
            <div className="flex items-center gap-2 mb-10">
              <div className="w-6 h-6 rounded-md bg-slate-800 flex items-center justify-center">
                <GraduationCap className="w-3.5 h-3.5 text-white" strokeWidth={2} />
              </div>
              <span className="text-xs font-bold text-slate-800 tracking-tight">
                Placement
                <span className="text-slate-400 font-medium"> Portal</span>
              </span>
            </div>

            {/* Giant 404 */}
            <p className="text-[9rem] font-black text-slate-200 leading-none tracking-tighter select-none -ml-1">
              404
            </p>

            {/* Divider */}
            <div className="w-12 h-0.5 bg-slate-800 rounded-full my-6" />

            {/* Message */}
            <h1 className="text-xl font-bold text-slate-800 mb-2">
              Page not found
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed mb-8 max-w-sm">
              The page you're looking for doesn't exist or may have been moved.
              Head back to the dashboard to continue.
            </p>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/dashboard")}
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-150 active:scale-[0.98]"
              >
                <LayoutDashboard className="w-4 h-4" strokeWidth={2} />
                Go to Dashboard
              </button>

              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-800 border border-slate-200 hover:border-slate-300 px-5 py-2.5 rounded-xl transition-all duration-150 active:scale-[0.98]"
              >
                <MoveLeft className="w-4 h-4" strokeWidth={2} />
                Go back
              </button>
            </div>

          </div>
        </div>

        {/* Footer hint */}
        <p className="text-center text-[11px] text-slate-400">
          Lost? Try navigating from the{" "}
          <button
            onClick={() => navigate("/dashboard")}
            className="font-semibold text-slate-600 hover:text-slate-800 transition-colors"
          >
            dashboard
          </button>
          .
        </p>

      </div>
    </div>
  );
}

export default NotFound;