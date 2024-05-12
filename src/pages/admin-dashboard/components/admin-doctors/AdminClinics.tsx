import { useDebounce } from '../../../../hooks/useDebounce';
import './AdminClinics.scss';
import { ChangeEvent, useEffect, useState } from 'react';
import { AdminClinicCard } from './AdminClinicCard/AdminClinicCard';
// import { useDebounce } from '../../hooks/useDebounce';
type Clinics = {
    id_policlinics: string
    title: string
    address: string
    phone: string
}
export function AdminClinics() {
    const [clinics, setClinics] = useState<Clinics[]>([])
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
        const response = await fetch('http://localhost:5000/clinicsPublic/?filter=' + filter, {
         }) 
         
        const data = await response.json();
        //alert(JSON.stringify(data));
        if (response.status == 404)
        {
            setServerErrorMessage("Клиники не найдены");
            setClinics([]);
            return;
        }
        else{
            setClinics(data);
            setServerErrorMessage("");
        }
      }
      
      useEffect(() => {
       // alert(debouncedValue)
        fetchDoctors(debouncedValue)
    }, [debouncedValue])
    return (
            <div className="doctors-container">
            <h2>Список клиник в системе</h2>
            {/* <div className="search-container">
                <input onChange={handleChange} value={value} type="text" id="searchInput" className="search-input" placeholder="Начните вводить" />
                    <img id="searchButton" className="search-button" src="https://palantinnsk.ru/local/templates/palantinnsk/assets/search.png" alt="Search" />
            </div> */}
            <br></br>
            <span className="errormes">{serverErrorMessage}</span>
            <div className="card-container">
            {clinics.map(clinics => <AdminClinicCard clinic_id={clinics.id_policlinics} clinic_title={clinics.title} clinic_address={clinics.address}  clinic_phone={clinics.phone} refreshList={fetchDoctors}/>)} 
            {/* вытаскиваем массив и распределяем по карточкам */}
            </div>
           
        </div>
    );
}