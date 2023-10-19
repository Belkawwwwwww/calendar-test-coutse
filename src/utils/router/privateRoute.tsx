import { useAppSelector } from "../../store/hooks/redux";
import { isAuthSelector } from "../../store/slices/UserSlice";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isAuth = useAppSelector(isAuthSelector);

  return isAuth ? <Outlet /> : <Navigate to="login" />;
};
export default PrivateRoute;
