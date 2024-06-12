import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import { LandingPage } from "./pages/landing-page/LandingPage";
import { ProductPage } from "./pages/product-page/ProductPage";
import { OrderProduct } from "./pages/order-product-page/OrderProduct";
import { AddWH } from "./pages/add-wh-page/AddWH";
import { AddCategory } from "./pages/add-category-page/AddCategory";
import { Login } from "./pages/login-page/Login";
import { Register } from "./pages/register-page/Register";
import { OrdersHistory } from "./pages/orders-history-page/OrdersHistory";
import { PrivateRoute } from "./features/auth/PrivateRoute";
import { CreateProduct } from "./pages/create-product-page/CreateProduct";
import { UserRole } from "./types/UserRole";

const router = createBrowserRouter([{ path: "*", Component: Root }]);

function Root() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <PrivateRoute
            Component={LandingPage}
            availableRoles={[
              UserRole.Operator,
              UserRole.Whman,
              UserRole.Whboss,
              UserRole.Admin,
            ]}
          />
        }
      />
      <Route
        path="/product"
        element={
          <PrivateRoute
            Component={ProductPage}
            availableRoles={[
              UserRole.Operator,
              UserRole.Whman,
              UserRole.Whboss,
              UserRole.Admin,
            ]}
          />
        }
      />
      <Route
        path="/orderProduct/:type/:id"
        element={
          <PrivateRoute
            Component={OrderProduct}
            availableRoles={[
              UserRole.Operator,
              UserRole.Whman,
              UserRole.Whboss,
              UserRole.Admin,
            ]}
          />
        }
      />
      <Route
        path="/createProduct"
        element={
          <PrivateRoute
            Component={CreateProduct}
            availableRoles={[UserRole.Whman, UserRole.Whboss, UserRole.Admin]}
          />
        }
      />
      <Route
        path="/addWH"
        element={
          <PrivateRoute
            Component={AddWH}
            availableRoles={[UserRole.Whboss, UserRole.Admin]}
          />
        }
      />
      <Route
        path="/addCategory"
        element={
          <PrivateRoute
            Component={AddCategory}
            availableRoles={[UserRole.Whman, UserRole.Whboss, UserRole.Admin]}
          />
        }
      />
      <Route
        path="/ordersHistory"
        element={
          <PrivateRoute
            Component={OrdersHistory}
            availableRoles={[
              UserRole.Operator,
              UserRole.Whman,
              UserRole.Whboss,
              UserRole.Admin,
            ]}
          />
        }
      />

      <Route path="*" element={<Login />} />
    </Routes>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
