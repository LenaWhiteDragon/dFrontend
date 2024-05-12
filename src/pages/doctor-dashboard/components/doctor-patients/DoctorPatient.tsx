import { authStorage } from '../../../../authStorage';
import { useDebounce } from '../../../../hooks/useDebounce';
import { ChangeEvent, useEffect, useState } from 'react';
import "./DoctorPatient.scss"
import { useNavigate, useParams } from 'react-router-dom';
// import { useDebounce } from '../../hooks/useDebounce';
type Patient = {
    name: string,
    snils: string
    phone: string
}

//закончить медкарту 
interface Medcard {
    medcard_id: string
    patient_id: string
    patient_name: string
    history: string
    blood_type: string
    allergies: string
    chronic_diseases: string
    current_medications: string
    surgical_history: string
    family_history: string
    lifestyle: string
    diagnoses: string
    vaccinations: string
    contact_info: string
    created_at: string
    updated_at: string
}
export function DoctorPatient() {
    const [medcard, setMedcard] = useState<Medcard | null>(null)
    const [serverErrorMessage, setServerErrorMessage] = useState("");
    const navigate = useNavigate();
    const { patientId } = useParams();

    async function fetchMedCardInfo() {
        // const response = await request.post('http://localhost:5000/auth/login').send(JSON.stringify({
        //   email: email,
        //   password: password
        // }))

        const response = await fetch('http://localhost:5000/doctors/getMedcard?id=' + patientId, {
        })

        const data = await response.json();
        //alert(JSON.stringify(data));
        if (response.status == 404) {
            setServerErrorMessage("Приемы не найдены");
            setMedcard(null);
            return;
        }
        else {
            setMedcard(data);
            setServerErrorMessage("");
        }
    }

    useEffect(() => {
        // alert(debouncedValue)
        fetchMedCardInfo()
    }, [])
    return (
        <div className="medcard-container">
             <a onClick={() => navigate("/mydoctor/schedule")} className="brand-logo">&#x2717;</a>
            <h2>Медкарта {medcard?.patient_name}</h2>
            {/* <div className="search-container">
                <input onChange={handleChange} value={value} type="text" id="searchInput" className="search-input" placeholder="Начните вводить" />
                    <img id="searchButton" className="search-button" src="https://palantinnsk.ru/local/templates/palantinnsk/assets/search.png" alt="Search" />
            </div> */}
            <br></br>
            <div className="medcard-details">
                <p><strong>История болезни:</strong> { medcard?.history }</p>
                <p><strong>Тип крови:</strong> { medcard?.blood_type }</p>
                <p><strong>Аллергии:</strong> { medcard?.allergies }</p>
                <p>
                    <strong>Хронические заболевания:</strong> { medcard?.chronic_diseases }
                </p>
                <p><strong>Текущие лекарства:</strong> { medcard?.current_medications }</p>
                <p>
                    <strong>Хирургическая история:</strong> { medcard?.surgical_history }
                </p>
                <p><strong>Семейная история:</strong> { medcard?.family_history }</p>
                <p><strong>Образ жизни:</strong> { medcard?.lifestyle }</p>
                <p><strong>Диагнозы:</strong> { medcard?.diagnoses }</p>
                <p><strong>Вакцинации:</strong> { medcard?.vaccinations }</p>
                <p><strong>Контактная информация:</strong> { medcard?.contact_info }</p>
                <p>
                    <strong>Дата создания:</strong> { medcard?.created_at }
                </p>
                <p>
                    <strong>Дата последнего обновления:</strong>
                    { medcard?.updated_at }
                </p>
            </div>
            <span className="errormes">{serverErrorMessage}</span>
            <div className="card-container">
            </div>

        </div>
    );
}