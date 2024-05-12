import { ChangeEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authStorage } from "../../../../authStorage";
import { useDirty } from "../../../../hooks/useDirty";
import "./ClinicCreate.scss";
import { UploadAndDisplayImage } from "../../../../components/UploadAndDisplayImage";
import { forEachChild } from "typescript";
import * as xlsx from 'xlsx';
import { json } from "stream/consumers";

function getEmailError(email: string) {
  if (email == "")
    return "Email не должен быть пустым.";
  return null;
}

function getPassError(password: string) {
  if (password == "")
    return "Пароль обязателен.";
  if (password.length < 4)
    return "Пароль должен быть не менее 4 символов.";
  return null;
}
function getFamError(fam: string, isDirty: boolean) {
  if (isDirty && !fam)
  {
    return "Поле обязательно для заполнения.";
  }
  return null;
}

function getNameError(name: string, isDirty: boolean) {
  if (isDirty && !name)
    return "Поле обязательно для заполнения.";
  return null;
}
function getOtchError(otch: string, isDirty: boolean) {
  if (isDirty && !otch)
    return "Поле обязательно для заполнения.";
  return null;
}

function getSpecialtyError(specialty: string, isDirty: boolean) {
  if (isDirty && !specialty)
    return "Поле обязательно для заполнения.";
  return null;
}

type ExcelDoctor = {
  Имя: string,
  Фамилия: string,
  Отчество: string,
  Специальность: string,
  Email: string,
  Пароль: string
}

export function ClinicCreate() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [fam, setFam, isFamDirty] = useDirty(""); // dirty для того чтобы отслеживать модиф ли пользватель
  const [name, setName, isNameDirty] = useDirty("");
  const [otch, setOtch, isOtchDirty] = useDirty("");
  const [specialty, setSpecialty, isSpecialtyDirty] = useDirty("");
  const [photoFile, setPhotoFile] = useState<null | File>(null);

  const [isButtonClicked, setisButtonClicked] = useState(false);

  const emailErrorMessage = getEmailError(email);
  const passErrorMessage = getPassError(password);
  const famErrorMessage = getFamError(fam, isFamDirty); //добавляем isDirty как параметр функции 
  const nameErrorMessage = getNameError(name, isNameDirty);
  const otchErrorMessage = getOtchError(otch, isOtchDirty);
  const specialtyErrorMessage = getSpecialtyError(specialty, isSpecialtyDirty);


  //const emailErrorMessage = isButtonClicked ? emailError : null;
  //const passErrorMessage = isButtonClicked ? passError : null;
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  
  const readUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e?.target?.result;
            const workbook = xlsx.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = xlsx.utils.sheet_to_json(worksheet);
            console.log(json);
            addDoctorfromExcel(json as Array<ExcelDoctor>);
        };
        reader.readAsArrayBuffer(e.target.files[0]);
    }

}

async function addDoctorfromExcel(doctors: Array<ExcelDoctor>) {
  if (window.confirm("Вы уверены, что хотите загрузить данные?") ){
    doctors.forEach(async (doctor) => {
      const formData = new FormData();
      formData.append('email', doctor.Email);
      formData.append('password', doctor.Пароль);
      formData.append('fam', doctor.Фамилия);
      formData.append('name', doctor.Имя);
      formData.append('otch', doctor.Отчество);
      formData.append('specialty', doctor.Специальность);
      formData.append('id_policlinic', authStorage.userId);
  
      const response = await fetch('http://localhost:5000/clinic/addDoctor', {
        method: 'POST',
        body: formData,
      })
      
      if (response.status == 401) {
        setServerErrorMessage("Ошибка данных");
        return;
      }
      const data = await response.json();
     
      navigate("/myclinic/doctor")
  
      // надо еще очистить все поля 
  
    })

    alert("Данные успешно загружены");
      }

      
}


  
    async function addDoctor() {
      setisButtonClicked(true);
      if (emailErrorMessage || passErrorMessage || famErrorMessage || nameErrorMessage || otchErrorMessage || specialtyErrorMessage) {
        return;
      }
      if (!email || !password || !fam || !name|| !otch || !specialty || !photoFile) {
        alert("не заполнены поля")
        return;
      }
      // const response = await request.post('http://localhost:5000/auth/login').send(JSON.stringify({
      //   email: email,
      //   password: password
      // }))
      const formData = new FormData();
      formData.append('file', photoFile);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('fam', fam);
      formData.append('name', name);
      formData.append('otch', otch);
      formData.append('specialty', specialty);
      formData.append('id_policlinic', authStorage.userId);

      const response = await fetch('http://localhost:5000/clinic/addDoctor', {
        method: 'POST',
        body: formData,
      })


      if (response.status == 401) {
        setServerErrorMessage("Ошибка данных");
        return;
      }
      if (response.ok) 
        {
          const data = await response.json();
          //alert(JSON.stringify(data));
          alert("Данные успешно загружены");
          navigate("/myclinic/doctor")
          // надо еще очистить все поля 
        }
    }
    return (
<div>
<div className="card">
    <div className="card-content">
      <span className="card-title">Добавить Доктора</span>
  
      <div className="input-field">
        <label htmlFor="firstName">Имя: <span  className={"red-text"}>*</span></label>
        <input id="firstName" type="text" 
        onChange={event => { setName(event.target.value); setServerErrorMessage("") }} />
        <span className="helper-text red-text">
          {nameErrorMessage}
        </span>
      </div>
  
      <div className="input-field">
        <label htmlFor="lastName">Фамилия: <span  className={"red-text"}>*</span></label>
        <input id="lastName" type="text" 
        onChange={event => { setFam(event.target.value); setServerErrorMessage("") }}/>
        <span className="helper-text red-text">
         {famErrorMessage}
        </span>
      </div>
  
      <div className="input-field">
        <label htmlFor="middleName">Отчество: <span  className={"red-text"}>*</span></label>
        <input id="middleName" type="text"
        onChange={event => { setOtch(event.target.value); setServerErrorMessage("") }} />
        <span className="helper-text red-text">
            {otchErrorMessage}
          </span>
      </div>
  
      <div className="input-field">
        <label htmlFor="specialty">Специальность: <span  className={"red-text"}>*</span></label>
        <input id="specialty" type="text"
        onChange={event => { setSpecialty(event.target.value); setServerErrorMessage("") }} />
        <span className="helper-text red-text">
            {specialtyErrorMessage}
          </span>
      </div>
  

      <div className="input-field">
        <label htmlFor="email">Email: <span  className={"red-text"}>*</span></label>
        <input autoComplete="one-time-code"  id="email" type="email" 
        onChange={event => { setEmail(event.target.value); setServerErrorMessage("") }}/>
        <span className="helper-text red-text">
          {emailErrorMessage}
        </span>
      </div>
  
      <div className="input-field">
        <label htmlFor="password">Пароль: <span  className={"red-text"}>*</span></label>
        <input  autoComplete="one-time-code" id="password" type="password" 
        onChange={event => { setPass(event.target.value); setServerErrorMessage("") }}/>
        <span className="helper-text red-text">
          {passErrorMessage}
        </span>
      </div>
    </div>
    <UploadAndDisplayImage onImageChange={setPhotoFile}/>
    <div className="card-action">
      <button  onClick={addDoctor}  className="btn">Добавить врача</button>
    </div>
   <h2>ИЛИ</h2>
    <label>Загрузить файлом Excel</label>
    <div className="file-upload">
    <input  onChange={readUploadFile} type="file" accept=".xlsx, .xls" />
  </div>

  </div>

</div>

    )
}