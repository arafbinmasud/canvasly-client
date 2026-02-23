import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <div className="flex min-h-screen flex-col items-center justify-center"><span className="loading loading-spinner loading-xl"></span></div>;
  }
  if (user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default PublicRoute;
