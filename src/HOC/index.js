import { Navigate } from "react-router-dom";
import { userRole } from "../config/USER_ROLE";
import { useGetUserLoginQuery } from "../service/authApi";

const WithAuthComponent = (OriginalComponent) => {
    const NewComponent = () => {
      const { data } = useGetUserLoginQuery();
    return data?.data?.role === userRole.SUPER_ADMIN || userRole.ADMIN ? (
      <OriginalComponent />
    ) : (
      <Navigate to="/dashboard" />
    );
  };
  return NewComponent;
};

export default WithAuthComponent;
