// shared/components/Navbar.jsx
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import {
  GraduationCap,
  Users,
  CalendarCheck,
  Briefcase,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

const NAV_LINKS = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Students", path: "/students", icon: Users },
  { label: "Interviews", path: "/interviews", icon: CalendarCheck },
  { label: "Jobs", path: "/jobs", icon: Briefcase },
];

export default function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-30 w-full">
      {/* Frosted glass bar */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center shadow-sm group-hover:bg-slate-700 transition-colors">
            <GraduationCap className="w-4 h-4 text-white" strokeWidth={2} />
          </div>
          <span className="text-sm font-bold text-slate-800 tracking-tight">
            Placement
            <span className="text-slate-400 font-medium"> Portal</span>
          </span>
        </button>

        {/* Nav Links */}
        <div className="flex items-center gap-1">
          {NAV_LINKS.map(({ label, path, icon: Icon }) => {
            const isActive = location.pathname.startsWith(path);
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-150
                  ${
                    isActive
                      ? "text-slate-800 bg-slate-100"
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                  }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 transition-colors ${isActive ? "text-slate-700" : "text-slate-400"}`}
                  strokeWidth={2}
                />
                {label}
                {/* Active dot indicator */}
                {isActive && (
                  <span className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-slate-800" />
                )}
              </button>
            );
          })}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all duration-150 group"
        >
          <LogOut
            className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-150"
            strokeWidth={2}
          />
          Logout
        </button>
      </div>
    </nav>
  );
}
