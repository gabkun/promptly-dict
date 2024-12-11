import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth.ts";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;