import { useNavigate, useOutletContext } from 'react-router-dom';
import { authStorage } from '../../../../../authStorage';
type Props = {
    name: string
    snils: string
    phone: string
}
export function AdminClinicCard(props: Props) {
    const navigate = useNavigate();
    const outletContext = useOutletContext<{openLoginModal: (pathToRedirect: string) => void}>();
    // async function book() {
    //     if (authStorage.token == "") {
    //         outletContext.openLoginModal("/my") //после авторизации идем на продолжение записи
    //     }
    //     else 
    //     {
    //         navigate("/clinics"); //сразу переходим на страницу записи
           
    //     }
    // }

    return (
      <div>
      <div className="patient-details">
        <p><strong>Имя:</strong> {props.name}</p>
        <p><strong>СНИЛС:</strong> {props.snils}</p>
        <p><strong>Телефон:</strong> {props.phone}</p>
        <button className="btn">
          Выписать рецепт
        </button>
      </div>
      </div>
    );
}