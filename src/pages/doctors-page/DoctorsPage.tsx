import { ChangeEvent, useEffect, useState } from 'react';
import { DoctorCard } from './DoctorCard/DoctorCard';
import './DoctorsPage.scss';
import { useDebounce } from '../../hooks/useDebounce';
type Doctor = {
    doctor_id: string, 
    name: string
    specialty: string
}
export function DoctorsPage() {
    const [doctors, setDoctors] = useState<Doctor[]>([])
    const [value, setValue] = useState<string>('')
    const debouncedValue = useDebounce<string>(value, 500) //для задержки при вводе фильтра
    const [serverErrorMessage, setServerErrorMessage] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    setServerErrorMessage("")
  }
    async function fetchDoctors(filter = '') {
        // const response = await request.post('http://localhost:5000/auth/login').send(JSON.stringify({
        //   email: email,
        //   password: password
        // }))
        const response = await fetch('http://localhost:5000/doctors/?filter=' + filter, {
         }) 
         
        const data = await response.json();
        //alert(JSON.stringify(data));
        if (response.status == 404)
        {
            setServerErrorMessage("Врачи не найдены");
            setDoctors([]);
            return;
        }
        else{
            setDoctors(data);
        }
    
      }
      useEffect(() => {
       // alert(debouncedValue   )
        fetchDoctors(debouncedValue)
    }, [debouncedValue])
    return (
        <div className="container">
            <div className="search-container">
                <input onChange={handleChange} value={value} type="text" id="searchInput" className="search-input" placeholder="Начните вводить" />
                    <img id="searchButton" className="search-button" src="https://palantinnsk.ru/local/templates/palantinnsk/assets/search.png" alt="Search" />
            </div>
            <br></br>
            <span className="errormes">{serverErrorMessage}</span>
            <div className="card-container-doctor">
            {doctors.map(doctor => <DoctorCard doctorName={doctor.name} doctorSpecialty={doctor.specialty} doctorId={doctor.doctor_id}/>)} 
            {/* вытаскиваем массив и распределяем по карточкам */}
            </div>
           
        </div>
    );
}