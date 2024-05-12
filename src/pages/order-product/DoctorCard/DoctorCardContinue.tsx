import { useNavigate, useOutletContext } from 'react-router-dom';
import { authStorage } from '../../../authStorage';
import './DoctorsCardContinue.scss';
type Props = {
    doctorId: string
    doctorName: string
    doctorSpecialty: string
    chosenDoctorId: string | undefined
    onConfirm: (id:string, name: string) => void;
}
let n = 1;
export function DoctorCardContinue(props: Props) {
    console.log("DoctorCardContinue", n++);
    const navigate = useNavigate();
    const outletContext = useOutletContext<{openLoginModal: (pathToRedirect: string) => void}>();
    ///doctorImage
    function chooseDoctor() {
        props.onConfirm(props.doctorId, props.doctorName); 
     }

    return (
        <div className={`${props.chosenDoctorId == props.doctorId ? "card-clinic-continue-active" : "card-clinic-continue"}`}>
                <img src={"http://localhost:5000/doctors/doctorImage?id=" + props.doctorId} alt="Doctor" />
                <div className="card-info">
                    <p>{props.doctorName}</p>
                    <p>{props.doctorSpecialty}</p>
                    {props.chosenDoctorId == props.doctorId ? <div></div> : <button onClick={chooseDoctor}>Выбрать врача</button>} 
                </div>
        </div>
    );
}