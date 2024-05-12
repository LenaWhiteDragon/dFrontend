import { useDebounce } from '../../../../hooks/useDebounce';
import './ClinicServicesEdit.scss';
import { ChangeEvent, useEffect, useState } from 'react';
import { ClinicServiceEditCard } from './ClinicServiceEditCard/ClinicServiceEditCard';
import { useNavigate } from 'react-router-dom';
import { authStorage } from '../../../../authStorage';
// import { useDebounce } from '../../hooks/useDebounce';
type Service = {
    id_services: string;
    title: string;
}

type ServiceAdd = {
    id_services: string;
}
const timeRangesInitialValue: ServiceAdd[] = [{id_services: ""}];

export function ClinicServicesEdit() {
    const [services, setServices] = useState<Service[]>([])
    const [servicesToChoose, setServicesToChoose] = useState<Service[]>([])

    const [servicesToAdd, setServicesToAdd] = useState<ServiceAdd[]>(timeRangesInitialValue);

    const [value, setValue] = useState<string>('')
    const debouncedValue = useDebounce<string>(value, 500) //для задержки при вводе фильтра
    const [serverErrorMessage, setServerErrorMessage] = useState("");
    const navigate = useNavigate();

    function addTimeRange() {
        const newTimeRanges: ServiceAdd[] = [...servicesToAdd, {id_services: ""}]; //взять жлементы из массива и поместить в новый
        setServicesToAdd(newTimeRanges);
      }


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    setServerErrorMessage("")
  }

  async function fetchServicesToAdd(filter = authStorage.userId) {
    // const response = await request.post('http://localhost:5000/auth/login').send(JSON.stringify({
    //   email: email,
    //   password: password
    // }))
    const response = await fetch('http://localhost:5000/clinic/getServiceByClinicToAdd/?filter=' + filter, {
     }) 
     
    const data = await response.json();
    //alert(JSON.stringify(data));
    if (response.status == 404)
    {
        setServerErrorMessage("Услуги не найдены");
        setServicesToChoose([]);
        return;
    }
    else{
        setServicesToChoose(data);
        setServerErrorMessage("");
    }
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
            fetchServicesToAdd()
        }
      }
      
      useEffect(() => {
       // alert(debouncedValue)
        fetchServices(); fetchServicesToAdd()
    }, [])

   // const [cities, setCities] = useState([]);
  const [selectedService, setSelectedService] = useState("");
 // const [selectedCity, setSelectedCity] = useState("");

//   const countries = { 
//     France: [], Usa: [], Brazil: []
//   };

//   const countryList = Object.keys(services).map(key => ({
//     title: key
//   }));

// function setTimeStart(index: number, timeStart: string) {
//     servicesToAdd[index].id_services = timeStart;
//     const newTimeRanges: TimeRange[] = [...timeRanges]; // если без точек то массив из массивов
//     setTimeRanges(newTimeRanges);
//     //если задать в сет тот эе масви реакции не будет
//   }

  function handleCountrySelect(index: number, e: any) {
    console.log("Selected", e.target.value);
    servicesToAdd[index].id_services = e.target.value;
    const newTimeRanges: ServiceAdd[] = [...servicesToAdd]; // если без точек то массив из массивов
    setServicesToAdd(newTimeRanges);
    const countrySel = e.target.value.id_services;
   // const citiesSel = countrySel !== "" ? countries[countrySel] : [];
   setSelectedService(countrySel);
   console.log(newTimeRanges);
    // setCities(citiesSel);
    // setSelectedCity("");
  }

  
  async function addServicesToClinic() {
   // setisButtonClicked(true);
   for (let i = 0; i < servicesToAdd.length; i++) {
    if (servicesToAdd[i].id_services == "") {
        alert("Не заполнены поля")
        return;
      }
   }
    // const response = await request.post('http://localhost:5000/auth/login').send(JSON.stringify({
    //   email: email,
    //   password: password
    // }))
    const response = await fetch('http://localhost:5000/clinic/addServicesToClinic', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_policlinics: authStorage.userId,
        servicesToAdd: servicesToAdd
      }),
    })
      //const data = await response.json();
      alert("Успешно добавлены услуги!");
      fetchServices(); 
   // alert(response);
    if (response.status == 401) {
      setServerErrorMessage("Ошибка данных");
      return;
    }


  }

    return (
            <div className="doctors-container">
            <h2>Редактировать доступные услуги</h2> 
            <a className={"brand-logo"} onClick={() => navigate("/myclinic/services")}>&#x2717;</a>

            {servicesToAdd.map((id_services, index) => {
        return (
            <div>
            <select className=''
            name="Services"
            onChange={e => handleCountrySelect(index, e)}
            value={selectedService}
          >
            <option value="">Выберите услугу</option>
            {servicesToChoose.map((country, key) => (
              <option key={key} value={country.id_services}>
                {country.title}
              </option>
            ))}
            {/* первое значение означает что заносится в валью а второе значение что отображается в списке */}
          </select>


            </div>
           
        )
      }) }
         
            <button onClick={addTimeRange}>Добавить услугу</button>
            <br/>
            <button onClick={addServicesToClinic}>Сохранить данные</button>
            <br/>
            {/* <div className="search-container">
                <input onChange={handleChange} value={value} type="text" id="searchInput" className="search-input" placeholder="Начните вводить" />
                    <img id="searchButton" className="search-button" src="https://palantinnsk.ru/local/templates/palantinnsk/assets/search.png" alt="Search" />
            </div> */}
            <br></br>
            <span className="errormes">{serverErrorMessage}</span>
            <div className="card-container">
            {services.map(services => <ClinicServiceEditCard id_services={services.id_services} title={services.title} refreshList={fetchServices}/>)} 
            {/* вытаскиваем массив и распределяем по карточкам */}
            </div>
           
        </div>
    );
}