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
import { DoctorsPage } from "./pages/doctors-page/DoctorsPage";
import { ProductPage } from "./pages/product-page/ProductPage";
import { ClinicsPage } from "./pages/clinics-page/ClinicsPage";
import { AdminPage } from "./pages/admin-dashboard/AdminDashboard";
import { AdminClinics } from "./pages/admin-dashboard/components/admin-doctors/AdminClinics";
import { AdminCreate } from "./pages/admin-dashboard/components/admin-create/AdminCreate";
import { ClinicPage } from "./pages/clinic-dashboard/ClinicDashboard";
import { ClinicCreate } from "./pages/clinic-dashboard/components/clinic-create/ClinicCreate";
import { ClinicDoctors } from "./pages/clinic-dashboard/components/clinic-doctors/ClinicDoctors";
import { ClinicSchedule } from "./pages/clinic-dashboard/components/clinic-shedule/ClinicSchedule";
import { ClinicEdit } from "./pages/clinic-dashboard/components/clinic-edit/ClinicEdit";
import { ClinicLandingEdit } from "./pages/clinic-dashboard/components/clinic-edit-landing/ClinicIndex";
import { AdminCreateClinic } from "./pages/admin-dashboard/components/admin-create-clinic/AdminCreateClinic";
import { LandingClinic } from "./pages/landing-clinic/LandingClinic";
import { DoctorPage } from "./pages/doctor-dashboard/DoctorDashboard";
import { DoctorsSchedule } from "./pages/doctor-dashboard/components/doctor-shedule/DoctorSchedule";
import { ClinicServices } from "./pages/clinic-dashboard/components/clinic-services/ClinicServices";
import { ClinicServicesEdit } from "./pages/clinic-dashboard/components/clinic-services-edit/ClinicServicesEdit";
import { OrderProduct } from "./pages/order-product/OrderProduct";
import { DoctorPatient } from "./pages/doctor-dashboard/components/doctor-patients/DoctorPatient";
import { AddWH } from "./pages/add-wh/AddWH";
// import { LoginPage } from './pages/LoginPage';
// import { LoginPageModal } from './features/login-page/login-page';
// import { Register } from './features/register-page/register-page';

const router = createBrowserRouter([{ path: "*", Component: Root }]);

// 1️⃣ Changed from App to Root
function Root() {
  // 2️⃣ `BrowserRouter` component removed, but the <Routes>/<Route>
  // component below are unchanged OrderProduct
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="product" element={<ProductPage />} />

      <Route path="/orderProduct/:type/:id" element={<OrderProduct />} />
      <Route path="/addWH" element={<AddWH/>} />

      <Route path="/landing/:clinicId" element={<LandingClinic />} />
      <Route path="register" element={<div>Окно регистрации</div>} />
      <Route path="/about/*" element={<div>About</div>} />

      <Route path="/my" element={<div>Мой личный кабинет пациента</div>} />

      {/* ЛК АДМИНА*/}
      <Route path="/myadmin" element={<AdminPage />}>
        <Route index element={<AdminCreate />} />
        <Route path="clinics" element={<AdminClinics />} />
        <Route path="cliniccreate" element={<AdminCreateClinic />} />
      </Route>

      {/* ЛК КЛИНИКИ*/}
      <Route path="/myclinic" element={<ClinicPage />}>
        <Route index element={<ClinicLandingEdit />} />
        <Route path="doctor" element={<ClinicDoctors />} />
        <Route path="create" element={<ClinicCreate />} />
        <Route path="schedule/:doctorId" element={<ClinicSchedule />} />
        <Route path="edit/:doctorId" element={<ClinicEdit />} />
        <Route path="services" element={<ClinicServices />} />
        <Route path="editServices" element={<ClinicServicesEdit />} />
      </Route>

      {/* ЛК ВРАЧА*/}
      <Route path="/mydoctor" element={<DoctorPage />}>
        <Route index element={<DoctorPage />} />
        <Route path="schedule" element={<DoctorsSchedule />} />
        <Route path="medinfo/:patientId" element={<DoctorPatient />} />
        {/* <Route path="patients" element={<DoctorsSchedule/>} /> */}
        {/* <Route path="schedule/:doctorId" element={<ClinicSchedule/>} />
        <Route path="edit/:doctorId" element={<ClinicEdit/>} /> */}
      </Route>

      {/* ЛК ПАЦИЕНТА*/}
      <Route path="/mydoctor" element={<ClinicPage />}>
        <Route index element={<ClinicPage />} />
        <Route path="schedule" element={<ClinicDoctors />} />
        <Route path="patients" element={<ClinicCreate />} />
        {/* <Route path="schedule/:doctorId" element={<ClinicSchedule/>} />
        <Route path="edit/:doctorId" element={<ClinicEdit/>} /> */}
      </Route>
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
