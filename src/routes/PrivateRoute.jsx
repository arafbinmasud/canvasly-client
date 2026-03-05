import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center text-primary">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }
  if (user) {
    return children;
  }

  return <Navigate to="/login" state={location.pathname}></Navigate>;
};
export default PrivateRoute;
