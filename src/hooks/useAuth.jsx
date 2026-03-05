import { use } from "react";
import { AuthContext } from "../provider/AuthContext";

const useAuth = () => {
  const context = use(AuthContext);
  return context;
};

export default useAuth;
