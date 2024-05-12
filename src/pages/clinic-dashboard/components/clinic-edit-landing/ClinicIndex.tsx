import { useNavigate, useParams } from "react-router-dom";
import "./ClinicIndex.scss";
import { useEffect, useState } from "react";
import { useDirty } from "../../../../hooks/useDirty";
import { authStorage } from "../../../../authStorage";
import { UploadAndDisplayImage } from "../../../../components/UploadAndDisplayImage";



function getNameError(name: string, isDirty: boolean) {
  if (isDirty && !name)
    return "Поле обязательно для заполнения.";
  return null;
}

function getPhoneError(phone: string, isDirty: boolean) {
  if (!phone) return null;
  if (/^\+?\d{10,15}$/.test(phone))
    return null;
  return "Неверный формат";
}

function getAddressError(address: string, isDirty: boolean) {
  if (isDirty && !address)
    return "Поле обязательно для заполнения.";
  return null;
}

function getWorkHoursError(workHours: string, isDirty: boolean) {
  if (isDirty && !workHours)
    return "Поле обязательно для заполнения.";
  return null;
}

type BlogPost = {
  header: string,
  text: string
}
const timeRangesInitialValue: BlogPost[] = [{ header: "", text: "" }];

export function ClinicLandingEdit() {
  // const { doctorId } = useParams();
  //useEffect(() => alert(doctorId), []);
const navigate = useNavigate();
  //const [clinic, setClinic] = useState<null>(null)
  //const navigate = useNavigate();

  // const [имя переменной, set имя переменной] = useState(деволтное значение);
  //setName("привет") => name == "привет"

  const [name, setName, isNameDirty] = useDirty("");
  const [address, setAddress, isAddressDirty] = useDirty("");
  const [phone, setPhone, isPhoneDirty] = useDirty("");
  const [workHours, setWorkHours, isWorkHoursDirty] = useDirty("");
  const [photoFile, setPhotoFile] = useState<null | File>(null);
  const [clinicId, setClinicId] = useState("");

  const [isButtonClicked, setisButtonClicked] = useState(false);

  const nameErrorMessage = getNameError(name, isNameDirty);
  const addressErrorMessage = getAddressError(address, isAddressDirty);
  const phoneErrorMessage = getPhoneError(phone, isPhoneDirty);
  const hoursErrorMessage = getWorkHoursError(workHours, isWorkHoursDirty);

  //const emailErrorMessage = isButtonClicked ? emailError : null;
  //const passErrorMessage = isButtonClicked ? passError : null;
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [timeRanges, setTimeRanges] = useState<BlogPost[]>(timeRangesInitialValue);

  //добавлять еще один обект в массив
  function addTimeRange() {
    const newTimeRanges: BlogPost[] = [...timeRanges, { header: "", text: "" }]; //взять жлементы из массива и поместить в новый
    setTimeRanges(newTimeRanges);
  }

  function setTimeStart(index: number, header: string) {
    timeRanges[index].header = header;
    const newTimeRanges: BlogPost[] = [...timeRanges]; // если без точек то массив из массивов
    setTimeRanges(newTimeRanges);
    //если задать в сет тот эе масви реакции не будет
  }

  function setTimeEnd(index: number, text: string) {
    timeRanges[index].text = text;
    const newTimeRanges: BlogPost[] = [...timeRanges]; // если без точек то массив из массивов
    setTimeRanges(newTimeRanges);
    //если задать в сет тот эе масви реакции не будет
  }

  async function createBlogs() {
    setisButtonClicked(true);

    // const response = await request.post('http://localhost:5000/auth/login').send(JSON.stringify({
    //   email: email,
    //   password: password
    // }))
    const response = await fetch('http://localhost:5000/clinic/createBlog', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_policlinic: authStorage.userId,
        timeRanges: timeRanges
      }),
    })

    //alert(response);
    //alert(JSON.stringify(data));
    alert("Блог успешно создан!")

    if (!response.ok) {
      setServerErrorMessage("Ошибка данных");
      return;
    }


  }

  async function editClinic() {
    setisButtonClicked(true);
    if (nameErrorMessage || addressErrorMessage || phoneErrorMessage || hoursErrorMessage) {
      return;
    }
    if (!name || !address || !phone) {
      return;
    }
    // const response = await request.post('http://localhost:5000/auth/login').send(JSON.stringify({
    //   email: email,
    //   password: password
    // }))
    const response = await fetch('http://localhost:5000/clinic/editClinic', {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_policlinic: authStorage.userId,
        name: name,
        address: address,
        phone: phone,
        workHours: workHours
      }),
    })

    if (response.status == 401) {
      setServerErrorMessage("Ошибка данных");
      return;
    }
    if (response.ok) {
      const data = await response.json();
      alert("Данные успешно изменены!");
      //очистить все поля 
    }

  }


  // const [intervalsCount, setIntervalsCount] = useState(1);

  async function fetchClinic(filter = authStorage.userId) {
   // alert(filter)
    // const response = await request.post('http://localhost:5000/auth/login').send(JSON.stringify({
    //   email: email,
    //   password: password
    // }))
    const response = await fetch('http://localhost:5000/clinicsPublic/getClinicById/?id=' + filter, {
    })

    const data = await response.json();
    //alert(JSON.stringify(data));
    if (response.status == 404) {
      setServerErrorMessage("Врачи не найдены");
      // setDoctor(null);
      return;
    }
    else {
      //   setDoctor(data);
      setServerErrorMessage("");
      setName(data.title)
      setPhone(data.phone)
      setAddress(data.address)
      setWorkHours(data.work_hours)
      setClinicId(data.id_policlinics)
      //alert(doctor?.name.split(" ", 3))

    }
  }


  
  async function editClinicImage() {
    //setisButtonClicked(true);
    if (!photoFile) {
      alert("не заполнены поля")
      return;
    }
    // const response = await request.post('http://localhost:5000/auth/login').send(JSON.stringify({
    //   email: email,
    //   password: password
    // }))
    const formData = new FormData();
    formData.append('file', photoFile);
    formData.append('id_policlinic', clinicId);

    const response = await fetch('http://localhost:5000/clinic/editClinicImage', {
      method: 'PUT',
      body: formData,
    })

    if (response.status == 401) {
      setServerErrorMessage("Ошибка данных");
      return;
    }
    if (response.ok)
       {
        fetchClinic();
        const data = await response.json();
        alert("Изображение успешно изменено!");
        // надо еще очистить все поля 
       }

    
  }


  // const [splittedName, setSplittedName] = useState([]);
  // setSplittedName(doctor?.name.split(" ", 3))

  useEffect(() => {
    // alert(debouncedValue)
    fetchClinic()
  }, [])


  return (
    <div>
      <div className="card-landing">
        <div className="card-content">
          {/* <a className="brand-logo" onClick={() => { navigate("/myclinic/doctor/") }}>&#x2717;</a> */}
          <button onClick={() => navigate("/landing/" + clinicId)}>Открыть страницу</button>
          <h3 className="card-title">Редактировать профиль</h3>

          <div className="input-field">
            <label htmlFor="firstName">Название: <span className={"red-text"}>*</span></label>
            <input autoComplete="one-time-code" id="firstName" type="text" onChange={event => { setName(event.target.value); setServerErrorMessage("") }} value={name} />
            <span className="helper-text red-text">
              {nameErrorMessage}
            </span>
          </div>

          <div className="input-field">
            <label htmlFor="lastName">Адрес: <span className={"red-text"}>*</span></label>
            <input autoComplete="one-time-code" id="firstName" type="text"
              onChange={event => { setAddress(event.target.value); setServerErrorMessage("") }} value={address} />
            <span className="helper-text red-text">
              {addressErrorMessage}
            </span>
          </div>

          <div className="input-field">
            <label htmlFor="middleName">Телефон: <span className={"red-text"}>*</span></label>
            <input autoComplete="one-time-code" id="firstName" type="text"
              onChange={event => { setPhone(event.target.value); setServerErrorMessage("") }} value={phone} />
            <span className="helper-text red-text">
              {phoneErrorMessage}
            </span>
          </div>

          <div className="input-field">
            <label htmlFor="middleName">Часы работы: <span className={"red-text"}></span></label>
            <input autoComplete="one-time-code" id="firstName" type="text"
              onChange={event => { setWorkHours(event.target.value); setServerErrorMessage("") }} value={workHours} />
            <span className="helper-text red-text">
              {phoneErrorMessage}
            </span>
          </div>
          <div className="card-action">
            <button onClick={editClinic} className="btn">Сохранить изменения</button>
            <img src={"http://localhost:5000/clinicsPublic/clinicImage?id=" + clinicId} alt="ClinicPhoto" />
      <UploadAndDisplayImage onImageChange={setPhotoFile}/>
      <button onClick={editClinicImage} className="btn">Изменить изображение</button>
          </div>
          <br />
          <br />
          <br />
          {timeRanges.map((timeRange, index) => {
        return (
          <div className="service">
          <textarea className= "input_header" autoComplete="one-time-code" id="firstName"
          onChange={event => { setTimeStart(index, event.target.value); setServerErrorMessage("") }}></textarea>
          <textarea className= "input_text" onChange={event => { setTimeEnd(index, event.target.value); setServerErrorMessage("") }}  
           id="endTime" name="endTime" required/>
        </div>
        )
      }) }
          {/* <div className="input-field">
        <label htmlFor="password">Пароль:</label>
        <input autoComplete="one-time-code" id="password" type="password" onChange={event => { setPass(event.target.value); setServerErrorMessage("") }} defaultValue={""}/>
        <span className="helper-text red-text">
          {passErrorMessage}
        </span>
      </div> */}
        </div>
    
        <div className="card-action">
          <button onClick={addTimeRange} type="button" className="btn btn-secondary">Добавить блок текста</button>
          <button onClick={createBlogs} className="btn btn-primary">Сохранить записи</button>
        </div>

        <div className="file-upload">
        </div>

      </div>

    </div>

  )
}