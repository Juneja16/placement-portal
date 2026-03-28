import MainLayout from "../../shared/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import CSVButton from "../csv/CSVButton";
import {
  Users,
  CalendarCheck,
  Briefcase,
  UserPlus,
  ArrowUpRight,
  Download,
  LayoutDashboard,
  ClipboardList,
} from "lucide-react";

const QUICK_LINKS = [
  {
    label: "Students",
    description: "View and manage all enrolled students",
    path: "/students",
    icon: Users,
    accent: "bg-violet-50 text-violet-600 border-violet-100",
    iconBg: "bg-violet-100",
  },
  {
    label: "Interviews",
    description: "Schedule and track interview rounds",
    path: "/interviews",
    icon: CalendarCheck,
    accent: "bg-sky-50 text-sky-600 border-sky-100",
    iconBg: "bg-sky-100",
  },
  {
    label: "Allocate Student",
    description: "Assign students to upcoming interviews",
    path: "/allocate",
    icon: UserPlus,
    accent: "bg-amber-50 text-amber-600 border-amber-100",
    iconBg: "bg-amber-100",
  },
  {
    label: "Jobs",
    description: "Browse and manage job opportunities",
    path: "/jobs",
    icon: Briefcase,
    accent: "bg-emerald-50 text-emerald-600 border-emerald-100",
    iconBg: "bg-emerald-100",
  },
  {
    label: "Results",
    description: "View all student placement results",
    path: "/results",
    icon: ClipboardList,
    accent: "bg-rose-50 text-rose-600 border-rose-100",
    iconBg: "bg-rose-100",
  },
];

function DashboardPage() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-2">
        {/* ── Page Header ── */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center shadow-sm">
            <LayoutDashboard
              className="w-4.5 h-4.5 text-white"
              strokeWidth={2}
            />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 leading-tight">
              Dashboard
            </h1>
            <p className="text-xs text-slate-400">Placement Portal overview</p>
          </div>
        </div>

        {/* ── Divider label ── */}
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-3">
          Quick Actions
        </p>

        {/* ── Navigation Cards ── */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {QUICK_LINKS.map(
            ({ label, description, path, icon: Icon, accent, iconBg }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className="group relative flex items-start gap-4 bg-white border border-slate-100 hover:border-slate-200 rounded-2xl p-5 text-left shadow-sm hover:shadow-md transition-all duration-200"
              >
                {/* Icon bubble */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg} transition-transform duration-200 group-hover:scale-105`}
                >
                  <Icon
                    className={`w-5 h-5 ${accent.split(" ")[1]}`}
                    strokeWidth={1.8}
                  />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <p className="text-sm font-semibold text-slate-800 mb-0.5">
                    {label}
                  </p>
                  <p className="text-xs text-slate-400 leading-snug">
                    {description}
                  </p>
                </div>

                {/* Arrow */}
                <ArrowUpRight
                  className="w-4 h-4 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150 mt-0.5 flex-shrink-0"
                  strokeWidth={2}
                />
              </button>
            ),
          )}
        </div>

        {/* ── Divider label ── */}
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-3">
          Export
        </p>

        {/* ── CSV Export Card ── */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
              <Download className="w-5 h-5 text-slate-600" strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Export Data
              </p>
              <p className="text-xs text-slate-400">
                Export Comprehensive Interview Logs
              </p>
            </div>
          </div>

          {/* CSVButton */}
          <div className="flex-shrink-0">
            <CSVButton />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default DashboardPage;
