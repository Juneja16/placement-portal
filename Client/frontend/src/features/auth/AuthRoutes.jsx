import { Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

const AuthRoutes = (
  <>
    <Route path="/" element={<LoginForm />} />
    <Route path="/signup" element={<SignupForm />} />
  </>
);

export default AuthRoutes;