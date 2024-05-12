import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { resolveTypeReferenceDirective } from "typescript";
import './DoctorDashboard.scss';
import useModal from "../../components/Modal/useModal";
import { CloseModal } from "../../features/close-modal/close-modal";

export function DoctorPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const closeConfirmModal= useModal();
    return(
        <div> 
<div className="sidebar">
<h2>ВРАЧ</h2>
  <a className= {`${location.pathname == "/mydoctor/schedule" ? "sidebar-active" : ""}`} onClick={() => { navigate("/mydoctor/schedule") }}>Личное расписание</a>
  {/* <a className= {`${location.pathname == "/myadmin/cliniccreate" ? "sidebar-active" : ""}`} onClick={() => { navigate("/myadmin/cliniccreate") }}>Мои отзывы</a> */}
  {/* <a  onClick={() => { navigate("/clinics") }}>Расписание</a> */}
  <a onClick={() => closeConfirmModal.openModal("/")}>Выйти</a>
</div>
<CloseModal isOpen={closeConfirmModal.isOpen} closeModal={closeConfirmModal.closeModal}/>
<Outlet/>

        </div>

    )
        


}