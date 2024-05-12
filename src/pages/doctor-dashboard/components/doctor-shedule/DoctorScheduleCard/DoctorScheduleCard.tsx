import { useNavigate, useOutletContext } from 'react-router-dom';
import { authStorage } from '../../../../../authStorage';
import { useEffect, useState } from 'react';
import '../DoctorSchedule.scss';
import useModal from '../../../../../components/Modal/useModal';
import { DeleteModal } from '../../../../../features/delete-modal/delete-modal';
type Props = {
    schedule_id: number, 
    start_time: string, 
    end_time: string, 
    problem_description: string,
    patient_id: number,
    patient_name: string,
    patient_phone: string
  }
//export const [deleteConfirmed, setDeleteConfirmed] = useState("")
export function DoctorScheduleCard(props: Props) {
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



    // async function deleteDoctor() {
    //   const response = await fetch('http://localhost:5000/clinic/deleteDoctor', {
    //      method: 'DELETE',
    //      headers: {
    //        "Content-Type": "application/json",
    //     },
    //      body: JSON.stringify({
    //       doctorId: props.doctorId
    //      }),
    //    }) 
    //    props.refreshList()
    // }

    return (
      <div className="schedule-list">
      <div className="schedule-item">
        <div className="schedule-details">
          <p>
            <strong>Время начала:</strong>
            {props.start_time}
          </p>
          <p>
            <strong>Время окончания:</strong>
            {props.end_time}
          </p>
          <p><strong>Пациент:</strong> {props.patient_name} </p>
          <p><strong>Телефон:</strong> {props.patient_phone} </p>
          <p><strong>Проблема:</strong> {props.problem_description} </p>
          <button onClick={() => navigate("/mydoctor/medinfo/" + props.patient_id)} className="btn">
            Просмотреть мед. карту
          </button>
        </div>
      </div>
    </div>
//        <div className='doctors-list'>
//         <p><strong>Имя:</strong> {props.doctorName}</p>
//         <p><strong>Специальность:</strong> {props.doctorSpecialty}</p>
//         <div className="btn-box">
//           <button onClick={() => deleteConfirmModal.openModal("/")} >
//             Удалить
//           </button>
         
//           <button onClick={() => { navigate("/myclinic/schedule/" + props.doctorId) }}>Создать расписание</button>
//           <button onClick={() => { navigate("/myclinic/edit/" + props.doctorId) }}>Редактировать</button>
//        </div>
//  <DeleteModal isOpen={deleteConfirmModal.isOpen} closeModal={deleteConfirmModal.closeModal} item={props.doctorName} onConfirm={deleteDoctor}/>
//        </div>
       
    );
}