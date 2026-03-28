import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

function ProtectedRoute({ children }) {
  const { token } = useAppSelector((state) => state.auth);

  // 🔐 If no token → redirect to login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // ✅ If logged in → allow access
  return children;
}

export default ProtectedRoute;