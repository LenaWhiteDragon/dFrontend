import { useNavigate } from 'react-router-dom';
import './ClinicCardContinue.scss';
import { useState } from 'react';
type Props = {
    clinicName: string
    clinicId: string
    clinicAddress: string
    chosenClinicId: string
    onConfirm: (id:string, name: string) => void;
}
export function ClinicCardContinue(props: Props) {
    const navigate = useNavigate();

    function goToClinic() {
       navigate("/landing/" + props.clinicId)
    }

    function chooseClinic() {
        props.onConfirm(props.clinicId, props.clinicName); 
     }

    return (
             <div className={`${props.chosenClinicId == props.clinicId ? "card-clinic-continue-active" : "card-clinic-continue"}`}>
            {/* <div className={"card-clinic-continue"}> */}
               <img src={"http://localhost:5000/clinicsPublic/clinicImage?id=" + props.clinicId} alt="ClinicPhoto"/>
                <div className="card-info">
                    <h2>{props.clinicName}</h2>
                    <p className='address'>{props.clinicAddress}</p>
                    {/* <p>{props.doctorSpecialty}</p> */}
                    <button onClick={goToClinic}>Перейти на страницу</button>
                    <button onClick={chooseClinic}>Выбрать больницу</button>
                </div>
            </div>
    );
}