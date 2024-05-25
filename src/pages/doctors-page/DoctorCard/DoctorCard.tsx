import { useNavigate, useOutletContext } from "react-router-dom";
import { authStorage } from "../../../auth/authStorage";
import "./DoctorsCard.scss";
type Props = {
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
};
export function DoctorCard(props: Props) {
  const navigate = useNavigate();
  const outletContext = useOutletContext<{
    openLoginModal: (pathToRedirect: string) => void;
  }>();
  ///doctorImage
  const type = "doctor";
  async function book() {
    if (authStorage.token == "") {
      const stringToGo: string = "/orderProduct/" + type + "/" + props.doctorId;
      outletContext.openLoginModal(stringToGo); //после авторизации идем на продолжение записи
    } else {
      navigate("/orderProduct/" + type + "/" + props.doctorId); //сразу переходим на страницу записи
    }
  }

  return (
    <div className="card-doc">
      <img
        src={"http://localhost:5000/doctors/doctorImage?id=" + props.doctorId}
        alt="Doctor"
      />
      <div className="card-info">
        <p>{props.doctorName}</p>
        <p>{props.doctorSpecialty}</p>
        <button onClick={book}>Записаться</button>
      </div>
    </div>
  );
}
