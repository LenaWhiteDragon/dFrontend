import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { resolveTypeReferenceDirective } from "typescript";
import './AdminDashboard.scss';
import useModal from "../../components/Modal/useModal";
import { CloseModal } from "../../features/close-modal/close-modal";

export function AdminPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const closeConfirmModal = useModal();
  return (
    <div>
      <div className="sidebar">
        <h2 onClick={() => { navigate("/myadmin") }}>АДМИН</h2>
        <a className={`${location.pathname == "/myadmin/clinics" ? "sidebar-active" : ""}`} onClick={() => { navigate("/myadmin/clinics") }}>Список поликлиник</a>
        <a className={`${location.pathname == "/myadmin/cliniccreate" ? "sidebar-active" : ""}`} onClick={() => { navigate("/myadmin/cliniccreate") }}>Добавить поликлинику</a>
        {/* <a  onClick={() => { navigate("/clinics") }}>Расписание</a> */}
        <a onClick={() => closeConfirmModal.openModal("/")}>Выйти</a>
      </div>
      <CloseModal isOpen={closeConfirmModal.isOpen} closeModal={closeConfirmModal.closeModal} />
      <Outlet />

    </div>

  )



}