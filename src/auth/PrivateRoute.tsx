import { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  Component: React.ComponentType;
}

export const PrivateRoute = ({
  Component,
}: PrivateRouteProps): ReactElement => {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Component />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};
