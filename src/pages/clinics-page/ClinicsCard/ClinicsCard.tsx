import { useNavigate } from 'react-router-dom';
import './ClinicsCard.scss';
type Props = {
    clinicName: string
    clinicId: string
    clinicAddress: string
}
export function ClinicCard(props: Props) {
    const navigate = useNavigate();
    function goToClinic() {
       navigate("/landing/" + props.clinicId)
    }

    return (
            <div className="card-doc">
               <img src={"http://localhost:5000/clinicsPublic/clinicImage?id=" + props.clinicId} alt="ClinicPhoto"/>
                <div className="card-info">
                    <h2>{props.clinicName}</h2>
                    <p className='address'>{props.clinicAddress}</p>
                    {/* <p>{props.doctorSpecialty}</p> */}
                    <button onClick={goToClinic}>Перейти на страницу</button>
                </div>
            </div>
    );
}