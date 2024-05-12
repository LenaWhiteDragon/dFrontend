import { useNavigate, useOutletContext } from 'react-router-dom';
import { authStorage } from '../../../../../authStorage';
import { useEffect, useState } from 'react';
import useModal from '../../../../../components/Modal/useModal';
import { DeleteModal } from '../../../../../features/delete-modal/delete-modal';
import './ClinicServiceEditCard.scss';
type Props = {
  id_services: string;
  title: string;
  refreshList: () => void;
}
//export const [deleteConfirmed, setDeleteConfirmed] = useState("")
export function ClinicServiceEditCard(props: Props) {
  const navigate = useNavigate();
  const deleteConfirmModal = useModal();

  // useEffect(() => alert(props.doctorId), []);
  const outletContext = useOutletContext<{ openLoginModal: (pathToRedirect: string) => void }>();
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



  async function deleteService() {
    //alert()
    const response = await fetch('http://localhost:5000/clinic/deleteService', {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serviceId: props.id_services,
        id_policlinics: authStorage.userId
      }),
    })
    props.refreshList()
  }

  return (
    <div className="card-serv-clinic">
      <img src="https://alcovin-sale.goodsalediscount.com/files/alkowin_1/img/icon04.png" alt="Doctor" />
      <div className="card-info">
        <h2>{props.title}</h2>
        {/* <p>{props.doctorSpecialty}</p> */}
        {/* <button>Выбрать больницу</button> */}
        <button onClick={() => deleteConfirmModal.openModal("/")} >
          Удалить
        </button>
      </div>
      <DeleteModal isOpen={deleteConfirmModal.isOpen} closeModal={deleteConfirmModal.closeModal} item={props.title} onConfirm={deleteService}/>

    </div>


  );
}