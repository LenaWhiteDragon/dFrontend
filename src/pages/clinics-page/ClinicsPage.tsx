import { ChangeEvent, useEffect, useState } from 'react';
import './ClinicsPage.scss';
import { useDebounce } from '../../hooks/useDebounce';
import { ClinicCard } from './ClinicsCard/ClinicsCard';
type Clinics = {
    id_policlinics: string, 
    title: string, 
    address: string
}
export function ClinicsPage() {
    const [clinic, setClinic] = useState<Clinics[]>([])
    const [value, setValue] = useState<string>('')
    const debouncedValue = useDebounce<string>(value, 500) //для задержки при вводе фильтра
    const [serverErrorMessage, setServerErrorMessage] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    setServerErrorMessage("")
  }
    async function fetchService(filter = '') {
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
            setServerErrorMessage("Поликлиники не найдены");
            setClinic([]);
            return;
        }
        else{
            setClinic(data);
        }
        

      }

      
      useEffect(() => {
       // alert(debouncedValue)
       fetchService(debouncedValue)
    }, [debouncedValue])
    
    return (
        <div className="container">
            <div className="search-container">
                <input onChange={handleChange} value={value} type="text" id="searchInput" className="search-input" placeholder="Начните вводить" />
                    <img id="searchButton" className="search-button" src="https://palantinnsk.ru/local/templates/palantinnsk/assets/search.png" alt="Search" />
            </div>
            <br></br>
            <span>{serverErrorMessage}</span>
            <div className="card-container">
            {clinic.map(clinic => <ClinicCard clinicName={clinic.title} clinicId={clinic.id_policlinics} clinicAddress={clinic.address}/>)} 
            {/* вытаскиваем массив и распределяем по карточкам */}
            </div>
           
        </div>
    );
}