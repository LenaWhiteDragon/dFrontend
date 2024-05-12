import { useNavigate, useOutletContext } from 'react-router-dom';
import { authStorage } from '../../../../../authStorage';
import useModal from '../../../../../components/Modal/useModal';
import { DeleteModal } from '../../../../../features/delete-modal/delete-modal';
type Props = {
    clinic_id: string
    clinic_title: string
    clinic_phone: string
    clinic_address: string
    refreshList: () => void
}


export function AdminClinicCard(props: Props) {
    const navigate = useNavigate();
    const outletContext = useOutletContext<{openLoginModal: (pathToRedirect: string) => void}>();
    const deleteConfirmModal= useModal();
    // async function book() {
    //     if (authStorage.token == "") {
    //         outletContext.openLoginModal("/my") //после авторизации идем на продолжение записи
    //     }
    //     else 
    //     {
    //         navigate("/clinics"); //сразу переходим на страницу записи
           
    //     }
    // }
    async function deleteClinic() {
      const response = await fetch('http://localhost:5000/admin/deleteClinic', {
         method: 'DELETE',
         headers: {
           "Content-Type": "application/json",
        },
         body: JSON.stringify({
          clinicId: props.clinic_id
         }),
       }) 
       props.refreshList()
    }


    return (
       <div className='doctors-list'>
        <p><strong>Имя:</strong> {props.clinic_title}</p>
        <p><strong>Номер телефона:</strong> {props.clinic_phone}</p>
        <p><strong>Адрес:</strong> {props.clinic_address}</p>
        <div className="btn-box">
          <button onClick={() => deleteConfirmModal.openModal("/")}>
            Удалить
          </button>
          <button onClick={() => navigate("/landing/" + props.clinic_id)}>Открыть страницу</button>
          <DeleteModal isOpen={deleteConfirmModal.isOpen} closeModal={deleteConfirmModal.closeModal} item={props.clinic_title} onConfirm={deleteClinic}/>
       </div>
       </div>
    );
}