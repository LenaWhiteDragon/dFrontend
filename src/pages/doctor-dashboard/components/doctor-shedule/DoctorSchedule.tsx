import { useDebounce } from '../../../../hooks/useDebounce';
import './DoctorSchedule.scss';
import { ChangeEvent, useEffect, useState } from 'react';
import { DoctorScheduleCard } from './DoctorScheduleCard/DoctorScheduleCard';
import { authStorage } from '../../../../authStorage';
// import { useDebounce } from '../../hooks/useDebounce';
 interface Schedule {
    schedule_id: number, 
    start_time: string, 
    end_time: string, 
    problem_description: string,
    patient_id: number,
    patient_name: string,
    patient_phone: string
  }

export function DoctorsSchedule() {
    const [schedules, setSchedules] = useState<Schedule[]>([])

    // const [value, setValue] = useState<string>('')
    // const debouncedValue = useDebounce<string>(value, 500) //для задержки при вводе фильтра
    const [serverErrorMessage, setServerErrorMessage] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setServerErrorMessage("")
  }
    async function fetchSchedules() {
        // const response = await request.post('http://localhost:5000/auth/login').send(JSON.stringify({
        //   email: email,
        //   password: password
        // }))
        const response = await fetch('http://localhost:5000/doctors/getSchedulesByUser?id=' + authStorage.userId + "&isBooked=" + true, {
         }) 
         
        const data = await response.json();
        //alert(JSON.stringify(data));
        if (response.status == 404)
        {
            setServerErrorMessage("Приемы не найдены");
            setSchedules([]);
            return;
        }
        else{
            setSchedules(data);
            setServerErrorMessage("");
        }
      }

      
      
      useEffect(() => {
       // alert(debouncedValue)
       fetchSchedules()
    }, [])
    return (
            <div className="doctors-container">
            <h2>Личное расписание</h2>
            {/* <div className="search-container">
                <input onChange={handleChange} value={value} type="text" id="searchInput" className="search-input" placeholder="Начните вводить" />
                    <img id="searchButton" className="search-button" src="https://palantinnsk.ru/local/templates/palantinnsk/assets/search.png" alt="Search" />
            </div> */}
            <br></br>
            <span className="errormes">{serverErrorMessage}</span>
            <div className="card-container">
            {schedules.map(schedules => <DoctorScheduleCard  schedule_id={schedules.schedule_id} start_time= {schedules.start_time} end_time ={schedules.end_time} 
            problem_description = {schedules.problem_description}
            patient_id ={schedules.patient_id} patient_name ={schedules.patient_name} patient_phone={schedules.patient_phone}/>)} 
            {/* вытаскиваем массив и распределяем по карточкам */}
            </div>
           
        </div>
    );
}