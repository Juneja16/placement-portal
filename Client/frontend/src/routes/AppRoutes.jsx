import { Routes, Route } from "react-router-dom";
import AuthRoutes from "../features/auth/AuthRoutes";
import StudentsPage from "../features/students/StudentsPage";
import InterviewsPage from "../features/interviews/InterviewsPage";
import InterviewDetailPage from "../features/results/InterviewDetailPage";
import JobsPage from "../features/jobs/JobsPage";
import DashboardPage from "../features/dashboard/DashboardPage";
import ProtectedRoute from "../shared/components/ProtectedRoute";
import AllocatePage from "../features/results/AllocatePage";
import AllResultsPage from "../features/results/AllResultsPage";
import NotFound from "../shared/components/NotFound";

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      {AuthRoutes}
      {/* 🔐 Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/students"
        element={
          <ProtectedRoute>
            <StudentsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/interviews"
        element={
          <ProtectedRoute>
            <InterviewsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/results"
        element={
          <ProtectedRoute>
            <AllResultsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/interviews/:id"
        element={
          <ProtectedRoute>
            <InterviewDetailPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/allocate"
        element={
          <ProtectedRoute>
            <AllocatePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/jobs"
        element={
          <ProtectedRoute>
            <JobsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={
          <ProtectedRoute>
            <NotFound />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
