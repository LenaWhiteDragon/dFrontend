import { useNavigate, useParams } from "react-router-dom";
import "./ClinicSchedule.scss";
import { useEffect, useState } from "react";
import { StringDecoder } from "string_decoder";
import { stringify } from "querystring";
type Doctor = {
  doctor_id: string;
  id: string, 
  name: string
  specialty: string
}
type TimeRange = {
  timeStart: string,
  timeEnd: string
}
const timeRangesInitialValue: TimeRange[] = [{timeStart: "", timeEnd: ""}];

export function ClinicSchedule() {
  const { doctorId } = useParams();
  //useEffect(() => alert(doctorId), []);
  const navigate = useNavigate();

  const [date, setDate] = useState<string>("");
  const [timeRanges, setTimeRanges] = useState<TimeRange[]>(timeRangesInitialValue);

  //добавлять еще один обект в массив
  function addTimeRange() {
    const newTimeRanges: TimeRange[] = [...timeRanges, {timeStart: "", timeEnd: ""}]; //взять жлементы из массива и поместить в новый
    setTimeRanges(newTimeRanges);
  }

  function setTimeStart(index: number, timeStart: string) {
    timeRanges[index].timeStart = timeStart;
    const newTimeRanges: TimeRange[] = [...timeRanges]; // если без точек то массив из массивов
    setTimeRanges(newTimeRanges);
    //если задать в сет тот эе масви реакции не будет
  }

  function setTimeEnd(index: number, timeEnd: string) {
    timeRanges[index].timeEnd = timeEnd;
    const newTimeRanges: TimeRange[] = [...timeRanges]; // если без точек то массив из массивов
    setTimeRanges(newTimeRanges);
    //если задать в сет тот эе масви реакции не будет
  }

  const [isButtonClicked, setisButtonClicked] = useState(false);

  const dateErrorMessage = "";
  const timeStartErrorMessage = "";
  const timeEndErrorMessage = "";

  //const emailErrorMessage = isButtonClicked ? emailError : null;
  //const passErrorMessage = isButtonClicked ? passError : null;
  const [serverErrorMessage, setServerErrorMessage] = useState("");


  const [doctor, setDoctor] = useState<Doctor | null>(null)
    
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
    }
  
  }

  useEffect(() => {
    // alert(debouncedValue)
     fetchDoctors()
 }, [])

    async function createSchedule() {
      setisButtonClicked(true);
      if (dateErrorMessage || timeStartErrorMessage || timeEndErrorMessage) {
        return;
      }
      if (!date) {
        alert("не заполнены поля")
        return;
      }
      // const response = await request.post('http://localhost:5000/auth/login').send(JSON.stringify({
      //   email: email,
      //   password: password
      // }))
      const response = await fetch('http://localhost:5000/clinic/createSchedule', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctorId: doctorId,
          date: date,
          timeRanges: timeRanges
        }),
      })
      //const data = await response.json();
      alert("ЛМАО скедули созданы успешно");
      //alert(response);
      if (response.status == 401) {
        setServerErrorMessage("Ошибка данных");
        return;
      }
    
       
    
    }

    return (
<div>
<div className="card">
  <a className="brand-logo" onClick={() => { navigate("/myclinic/doctor") }}>&#x2717;</a>

    <h3 className="card-title">Создание расписания {doctor?.name} </h3>
  
    <div>
      <div className="input-field">
        <label>Дата</label>
        <input onChange={event => { setDate(event.target.value); setServerErrorMessage("") }} type="date" id="date" name="date" required/>
      </div>
  
      {/* <div className="time-interval">
        <div className="input-field">
          <label>Время начала</label>
          <input onChange={event => { setTimeStart(event.target.value); setServerErrorMessage("") }} type="time" id="startTime" name="startTime" required/>
        </div>
  
        <div className="input-field">
          <label>Время окончания</label>
          <input onChange={event => { setTimeEnd(event.target.value); setServerErrorMessage("") }}  type="time" id="endTime" name="endTime" required/>
        </div>
      </div> */}

      {timeRanges.map((timeRange, index) => {
        return (
          <div className="time-interval">
          <div className="input-field">
            <label>Время начала</label>
            <input onChange={event => { setTimeStart(index, event.target.value); setServerErrorMessage("") }} 
            type="time" id="startTime" name="startTime" required/>
          </div>
    
          <div className="input-field">
            <label>Время окончания</label>
            <input onChange={event => { setTimeEnd(index, event.target.value); setServerErrorMessage("") }}  
            type="time" id="endTime" name="endTime" required/>
          </div>
        </div>
        )
      }) }
  

      <div className="card-action">
        <button onClick={addTimeRange} type="button" className="btn btn-secondary">Добавить интервал времени</button>
        <button  onClick={createSchedule} className="btn btn-primary">Создать расписание</button>
      </div>
    </div>
  </div>
</div>
    )
      //можно вызывать функции без параметров без определения () =>
}