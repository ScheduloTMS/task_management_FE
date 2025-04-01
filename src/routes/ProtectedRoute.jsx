import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../states/authState";

const ProtectedRoute = () => {
  const auth = useRecoilValue(authState);
  
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
