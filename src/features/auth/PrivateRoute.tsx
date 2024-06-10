import { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserRole } from "../../types/UserRole";
import { authStorage } from "./authStorage";

interface PrivateRouteProps {
  Component: React.ComponentType;
  availableRoles: UserRole[];
}

export const PrivateRoute = ({
  Component,
  availableRoles,
}: PrivateRouteProps): ReactElement => {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem("token");

  return !isAuthenticated ? (
    <Navigate to="/login" state={{ from: location }} />
  ) : availableRoles.includes(Number(authStorage.roleId)) ? (
    <Component />
  ) : (
    <Navigate to="/" state={{ from: location }} />
  );
};
