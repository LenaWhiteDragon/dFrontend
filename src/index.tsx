import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import { LandingPage } from "./LandingPage";
import { ProductPage } from "./pages/product-page/ProductPage";
import { OrderProduct } from "./pages/order-product/OrderProduct";
import { AddWH } from "./pages/add-wh/AddWH";
import { AddCategory } from "./pages/add-category/AddCategory";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { OrdersHistory } from "./pages/orders-history/OrdersHistory";
import { PrivateRoute } from "./features/auth/PrivateRoute";
import { CreateProduct } from "./pages/create-product/CreateProduct";

const router = createBrowserRouter([{ path: "*", Component: Root }]);

function Root() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<PrivateRoute Component={LandingPage} />} />
      <Route
        path="/product"
        element={<PrivateRoute Component={ProductPage} />}
      />
      <Route
        path="/orderProduct/:type/:id"
        element={<PrivateRoute Component={OrderProduct} />}
      />
      <Route
        path="/createProduct"
        element={<PrivateRoute Component={CreateProduct} />}
      />
      <Route path="/addWH" element={<PrivateRoute Component={AddWH} />} />
      <Route
        path="/addCategory"
        element={<PrivateRoute Component={AddCategory} />}
      />
      <Route
        path="/ordersHistory"
        element={<PrivateRoute Component={OrdersHistory} />}
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
