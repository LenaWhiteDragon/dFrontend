import { useNavigate, useOutletContext } from 'react-router-dom';
import { authStorage } from '../../../../../authStorage';
import { useEffect, useState } from 'react';
import useModal from '../../../../../components/Modal/useModal';
import { DeleteModal } from '../../../../../features/delete-modal/delete-modal';
type Props = {
    doctorId: string
    doctorName: string
    doctorSpecialty: string
    refreshList: () => void
}    
//export const [deleteConfirmed, setDeleteConfirmed] = useState("")
export function ClinicDoctorCard(props: Props) {
    const navigate = useNavigate();
    const deleteConfirmModal= useModal();

   // useEffect(() => alert(props.doctorId), []);
    const outletContext = useOutletContext<{openLoginModal: (pathToRedirect: string) => void}>();
   // const [hasDeleted, setHasDeleted] = useState(false);
    
  //   function deleteConfirm() {
  //   //  alert(deleteConfirmModal.IsConfirmed);
  //     if (deleteConfirmModal.IsConfirmed)
  //     {
  //       deleteDoctor()
  //       deleteConfirmModal.setIsConfirmed(false);
  //       alert(deleteConfirmModal.IsConfirmed);
  //     }
  //     // if (window.confirm("Вы уверены, что хотите удалить " + props.doctorName + "?" ) ){
  //     //   deleteDoctor()
  //     // }
  //   }
  //   useEffect(() => {
  //     // alert(debouncedValue)
  //     deleteConfirm()
  //  }, [deleteConfirmModal.IsConfirmed])

   //CОМНИТЕЛЬНЫЙ КОСТЫЛЬ но работает



    async function deleteDoctor() {
      const response = await fetch('http://localhost:5000/clinic/deleteDoctor', {
         method: 'DELETE',
         headers: {
           "Content-Type": "application/json",
        },
         body: JSON.stringify({
          doctorId: props.doctorId
         }),
       }) 
       props.refreshList()
    }

    return (
       <div className='doctors-list'>
        <p><strong>Имя:</strong> {props.doctorName}</p>
        <p><strong>Специальность:</strong> {props.doctorSpecialty}</p>
        <div className="btn-box">
          <button onClick={() => deleteConfirmModal.openModal("/")} >
            Удалить
          </button>
         
          <button onClick={() => { navigate("/myclinic/schedule/" + props.doctorId) }}>Создать расписание</button>
          <button onClick={() => { navigate("/myclinic/edit/" + props.doctorId) }}>Редактировать</button>
       </div>
 <DeleteModal isOpen={deleteConfirmModal.isOpen} closeModal={deleteConfirmModal.closeModal} item={props.doctorName} onConfirm={deleteDoctor}/>
       </div>
       
    );
}