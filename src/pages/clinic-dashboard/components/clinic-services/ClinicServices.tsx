import { useDebounce } from '../../../../hooks/useDebounce';
import './ClinicServices.scss';
import { ChangeEvent, useEffect, useState } from 'react';
import { ClinicServiceCard } from './ClinicServiceCard/ClinicServiceCard';
import { useNavigate } from 'react-router-dom';
import { authStorage } from '../../../../authStorage';
// import { useDebounce } from '../../hooks/useDebounce';
type Service = {
    id_services: string;
    title: string;
}
export function ClinicServices() {
    const [services, setServices] = useState<Service[]>([])
    const [value, setValue] = useState<string>('')
    const debouncedValue = useDebounce<string>(value, 500) //для задержки при вводе фильтра
    const [serverErrorMessage, setServerErrorMessage] = useState("");
    const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    setServerErrorMessage("")
  }
    async function fetchServices(filter = authStorage.userId) {
        // const response = await request.post('http://localhost:5000/auth/login').send(JSON.stringify({
        //   email: email,
        //   password: password
        // }))
        const response = await fetch('http://localhost:5000/clinic/getServiceByClinic/?filter=' + filter, {
         }) 
         
        const data = await response.json();
        //alert(JSON.stringify(data));
        if (response.status == 404)
        {
            setServerErrorMessage("Услуги не найдены");
            setServices([]);
            return;
        }
        else{
            setServices(data);
            setServerErrorMessage("");
        }
      }
      
      useEffect(() => {
       // alert(debouncedValue)
        fetchServices()
    }, [])

    return (
            <div className="doctors-container">
            <h2>Список доступных услуг</h2>
            <button onClick={() => { navigate("/myclinic/editServices/") }}>Редактировать</button>
            <br/>
            {/* <div className="search-container">
                <input onChange={handleChange} value={value} type="text" id="searchInput" className="search-input" placeholder="Начните вводить" />
                    <img id="searchButton" className="search-button" src="https://palantinnsk.ru/local/templates/palantinnsk/assets/search.png" alt="Search" />
            </div> */}
            <br></br>
            <span className="errormes">{serverErrorMessage}</span>
            <div className="card-container">
            {services.map(services => <ClinicServiceCard id_services={services.id_services} title={services.title} refreshList={fetchServices}/>)} 
            {/* вытаскиваем массив и распределяем по карточкам */}
            </div>
           
        </div>
    );
}