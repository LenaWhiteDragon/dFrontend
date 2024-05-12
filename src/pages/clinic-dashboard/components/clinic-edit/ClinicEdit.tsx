import { useNavigate, useParams } from "react-router-dom";
import "./ClinicEdit.scss";
import { useEffect, useState } from "react";
import { useDirty } from "../../../../hooks/useDirty";
import { UploadAndDisplayImage } from "../../../../components/UploadAndDisplayImage";
type Doctor = {
  doctor_id: string;
  id: string, 
  name: string
  specialty: string
  email: string
}



function getEmailError(email: string, isDirty: boolean) {
  if (isDirty && email == "")
    return "Email не должен быть пустым.";
  return null;
}

function getPassError(password: string, isDirty: boolean) {
  if (isDirty)
  {
   // if (password.length < 4)
   // return "Пароль должен быть не менее 4 символов.";
  }
  return null;
}
function getFamError(fam: string | undefined, isDirty: boolean) {
  if (isDirty && !fam)
  {
    return "Поле обязательно для заполнения.";
  }
  return null;
}

function getNameError(name: string | undefined, isDirty: boolean) {
  if (isDirty && !name)
    return "Поле обязательно для заполнения.";
  return null;
}
function getOtchError(otch: string | undefined, isDirty: boolean) {
  if (isDirty && !otch)
    return "Поле обязательно для заполнения.";
  return null;
}

function getSpecialtyError(specialty: string | undefined, isDirty: boolean) {
  if (isDirty && !specialty)
    return "Поле обязательно для заполнения.";
  return null;
}

export function ClinicEdit() {
  const { doctorId } = useParams();
  //useEffect(() => alert(doctorId), []);
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<Doctor | null>(null)

  //const [email, setEmail, isEmailDirty] = useDirty("");
  //const [password, setPass, IsPassDirty] = useDirty("");
  const [fam, setFam, isFamDirty] = useDirty(""); // dirty для того чтобы отслеживать модиф ли пользватель
  const [name, setName, isNameDirty] = useDirty("");
  const [otch, setOtch, isOtchDirty] = useDirty("");
  const [specialty, setSpecialty, isSpecialtyDirty] = useDirty("");
  const [doctor_id, setDoctor_id] = useState("");

  const [isButtonClicked, setisButtonClicked] = useState(false);

 // const emailErrorMessage = getEmailError(email, isEmailDirty);
  //const passErrorMessage = getPassError(password, IsPassDirty);
  const famErrorMessage = getFamError(fam, isFamDirty); //добавляем isDirty как параметр функции 
  const nameErrorMessage = getNameError(name, isNameDirty);
  const otchErrorMessage = getOtchError(otch, isOtchDirty);
  const specialtyErrorMessage = getSpecialtyError(specialty, isSpecialtyDirty);

  const [photoFile, setPhotoFile] = useState<null | File>(null);

  //const emailErrorMessage = isButtonClicked ? emailError : null;
  //const passErrorMessage = isButtonClicked ? passError : null;
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  useEffect(() => { 
    console.log(name)
  }, [name])
    async function editDoctor() {
      setisButtonClicked(true);
      if ( famErrorMessage || nameErrorMessage || otchErrorMessage || specialtyErrorMessage) {
        return;
      }
      if ( !fam || !name || !otch || !specialty) {
        return;
      }
      // const response = await request.post('http://localhost:5000/auth/login').send(JSON.stringify({
      //   email: email,
      //   password: password
      // }))
      const response = await fetch('http://localhost:5000/clinic/editDoctor', {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctorId: doctorId,
          fam: fam,
          name: name,
          otch: otch,
          specialty: specialty
        }),
      })

      if (response.status == 401) {
        setServerErrorMessage("Ошибка данных");
        return;
      }
      if (response.ok) {
        fetchDoctors()
        const data = await response.json();
        alert("Данные успешно обновлены!");
        //очистить все поля 
      }
     

    }
  



  

    
 // const [intervalsCount, setIntervalsCount] = useState(1);

  async function fetchDoctors(filter = doctorId) {
    // const response = await request.post('http://localhost:5000/auth/login').send(JSON.stringify({
    //   email: email,
    //   password: password
    // }))
    const response = await fetch('http://localhost:5000/clinic/getDoctorById/?id=' + filter, {
     }) 
     
    const data = await response.json();
    //alert(JSON.stringify(data));
    if (response.status == 404)
    {
        setServerErrorMessage("Врачи не найдены");
        setDoctor(null);
        return;
    }
    else{
        setDoctor(data);
        setServerErrorMessage("");
        setFam(data.name.split(" ", 3)[1])
        setName(data.name.split(" ", 3)[0])
        setOtch(data.name.split(" ", 3)[2])
        setSpecialty(data.specialty)
        setDoctor_id(data.doctor_id)
        //alert(doctor?.name.split(" ", 3))

    }
  }
  async function editDoctorImage() {
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
    formData.append('doctorId', doctor_id);

    const response = await fetch('http://localhost:5000/clinic/editDoctorImage', {
      method: 'PUT',
      body: formData,
    })

    if (response.status == 401) {
      setServerErrorMessage("Ошибка данных");
      return;
    }

    if (response.ok) {
      fetchDoctors();
      const data = await response.json();
      alert("Фото успешно обновлено!");
      // надо еще очистить все поля 
    }
  
    
  }

  // const [splittedName, setSplittedName] = useState([]);
  // setSplittedName(doctor?.name.split(" ", 3))

  useEffect(() => {
    // alert(debouncedValue)
     fetchDoctors()
 }, [])

    return (
<div>
<div className="card">
    <div className="card-content">
    <a className="brand-logo" onClick={() => { navigate("/myclinic/doctor") }}>&#x2717;</a>
      <h3 className="card-title">Редактировать Доктора {doctor?.name}
</h3>
  
      <div className="input-field">
        <label htmlFor="firstName">Имя:</label>
        <input  autoComplete="one-time-code" id="firstName" type="text" onChange={event => { setName(event.target.value); setServerErrorMessage("") }} value={name}/>
        <span className="helper-text red-text">
          {nameErrorMessage}
        </span>
      </div>
  
      <div className="input-field">
        <label htmlFor="lastName">Фамилия:</label>
        <input autoComplete="one-time-code" id="lastName" type="text" onChange={event => {setFam(event.target.value); setServerErrorMessage("") }} value={fam} />
        <span className="helper-text red-text">
          {famErrorMessage}
        </span>
      </div>
  
      <div className="input-field">
        <label htmlFor="middleName">Отчество:</label>
        <input autoComplete="one-time-code" id="middleName" type="text" onChange={event => { setOtch(event.target.value); setServerErrorMessage(""); }} value={otch}/>
        <span className="helper-text red-text">
           {otchErrorMessage}
          </span>
      </div>
  
      <div className="input-field">
        <label htmlFor="specialty">Специальность:</label>
        <input autoComplete="one-time-code" id="specialty" type="text" onChange={event => { setSpecialty(event.target.value); setServerErrorMessage("") }} value={specialty} />
        <span className="helper-text red-text">
            {specialtyErrorMessage}
          </span>
      </div>
  

      <div className="input-field">
        <label htmlFor="email">Email:</label>
        <input disabled autoComplete="one-time-code" id="email" type="email"  defaultValue={doctor?.email}/>
        <span className="helper-text red-text">

        </span>
      </div>
  
      {/* <div className="input-field">
        <label htmlFor="password">Пароль:</label>
        <input autoComplete="one-time-code" id="password" type="password" onChange={event => { setPass(event.target.value); setServerErrorMessage("") }} defaultValue={""}/>
        <span className="helper-text red-text">
          {passErrorMessage}
        </span>
      </div> */}
    </div>
  
    <div className="card-action">
      <button onClick={editDoctor} className="btn">Сохранить изменения</button>
      <img src={"http://localhost:5000/doctors/doctorImage?id=" + doctor?.doctor_id} alt="Doctor" />
      <UploadAndDisplayImage onImageChange={setPhotoFile}/>
      <button onClick={editDoctorImage} className="btn">Изменить изображение</button>
    </div>

   

  </div>

</div>

    )
}