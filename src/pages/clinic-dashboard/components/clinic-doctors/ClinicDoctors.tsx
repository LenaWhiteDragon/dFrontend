import { useDebounce } from '../../../../hooks/useDebounce';
import './ClinicDoctor.scss';
import { ChangeEvent, useEffect, useState } from 'react';
import { ClinicDoctorCard } from './ClinicDoctorCard/ClinicDoctorCard';
import { authStorage } from '../../../../authStorage';
import * as xlsx from 'xlsx';
// import { useDebounce } from '../../hooks/useDebounce';
type Doctor = {
    doctor_id: string;
    name: string
    specialty: string
}
export function ClinicDoctors() {
    const [doctors, setDoctors] = useState<Doctor[]>([])
    const [value, setValue] = useState<string>('')
    const debouncedValue = useDebounce<string>(value, 500) //для задержки при вводе фильтра
    const [serverErrorMessage, setServerErrorMessage] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    setServerErrorMessage("")
  }
  
  async function fetchDoctorsClinic(filter = authStorage.userId) {
 //  alert(filter)
    // const response = await request.post('http://localhost:5000/auth/login').send(JSON.stringify({
    //   email: email,
    //   password: password
    // }))
    const response = await fetch('http://localhost:5000/clinic/getDoctorsByClinic/?id=' + filter, {
    })
//http://localhost:5000/clinic/getDoctorByClinic/?id=55
//http://localhost:5000/clinic/getDoctorsByClinic/?id=
    const data = await response.json();
    //alert(JSON.stringify(data));
    if (response.status == 404) {
      setServerErrorMessage("Врачи не найдены");
      setDoctors([]);
      return;
    }
    else {
      setDoctors(data); 
      setServerErrorMessage("");

    }
  }

  async function exportDoctors () {
    const worksheet = xlsx.utils.json_to_sheet(doctors);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Doctors");
    xlsx.writeFile(workbook, "Doctors.xlsx");
  }

    // async function fetchDoctorsClinic(filter = authStorage.userId) {
    //     alert(filter)
    //     // const response = await request.post('http://localhost:5000/auth/login').send(JSON.stringify({
    //     //   email: email,
    //     //   password: password
    //     // }))
    //     const response = await fetch('http://localhost:5000/clinic/getDoctorsByClinic?id=' + filter, {
    //      }) 
         
    //     const data = await response.json();
    //     //alert(JSON.stringify(data));
    //     if (response.status == 404)
    //     {
    //         setServerErrorMessage("Врачи не найдены");
    //         setDoctors([]);
    //         return;
    //     }
    //     else{
    //         setDoctors(data);
    //         setServerErrorMessage("");
    //     }
    //   }
      
      useEffect(() => {
       // alert(debouncedValue)
       fetchDoctorsClinic()
    }, [])
    return (
            <div className="doctors-container">
            <h2>Список Врачей</h2>
            <button onClick={exportDoctors}>Скачать список</button>
            {/* <div className="search-container">
                <input onChange={handleChange} value={value} type="text" id="searchInput" className="search-input" placeholder="Начните вводить" />
                    <img id="searchButton" className="search-button" src="https://palantinnsk.ru/local/templates/palantinnsk/assets/search.png" alt="Search" />
            </div> */}
            <br></br>
            <span className="errormes">{serverErrorMessage}</span>
            <div className="card-container">
{doctors.map(doctor => <ClinicDoctorCard doctorId={doctor.doctor_id} 
                        doctorName={doctor.name} doctorSpecialty={doctor.specialty} refreshList={fetchDoctorsClinic}/>)}

            </div>
           
        </div>
    );
}