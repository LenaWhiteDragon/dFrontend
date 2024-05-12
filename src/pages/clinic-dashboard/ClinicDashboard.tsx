import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { resolveTypeReferenceDirective } from "typescript";
import './ClinicDashboard.scss';
import { useEffect } from "react";
import useModal from "../../components/Modal/useModal";
import { CloseModal } from "../../features/close-modal/close-modal";

export function ClinicPage() {
  const navigate = useNavigate();
  const closeConfirmModal= useModal();
  const location = useLocation();
  return (
    <div>
      <div className="sidebar">
        <h2 onClick={() => { navigate("/myclinic") }}>КЛИНИКА</h2>
        <a className= {`${location.pathname == "/myclinic/doctor" ? "sidebar-active" : ""}`} onClick={() => { navigate("/myclinic/doctor") }}>Список врачей</a>
        <a className= {`${location.pathname == "/myclinic/create" ? "sidebar-active" : ""}`} onClick={() => { navigate("/myclinic/create") }}>Добавить врача</a>
        <a className= {`${location.pathname == "/myclinic/services" ? "sidebar-active" : ""}`} onClick={() => { navigate("/myclinic/services") }}>Сервисы</a>
        {/* <a onClick={() => { navigate("/myclinic/schedule") }}>Расписание</a> */}
        <a onClick={() => closeConfirmModal.openModal("/")}>Выйти</a>
      </div>
      <CloseModal isOpen={closeConfirmModal.isOpen} closeModal={closeConfirmModal.closeModal}/>
      <Outlet />
    </div>

  )


}