import { useEffect, useState } from 'react'
import CustomSelect from "../../../src/comps/molecules/customSelect/customSelect.jsx"
import { body } from 'express-validator';
import ParsCourses from './ParsCourses.jsx';
import Calendar from './Calendar.jsx';



export default function Asistencias() {
  
  /* List de los items cargados */
  const [cursosList, setCursosList]=useState([]);
  const [alumnosList, setAlumnosList]=useState([]);
  const [listAsistencias, setListAsistencias]=useState([]);
  
  /* selection of alumn (the most important) */
  const [alumnObjSel, setAlumnObjSel]=useState({id: 0});
  

  useEffect(()=>{
    const loadAsistsReq={
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        alumn_id: alumnObjSel.id,
      })
    }
    fetch("/load-asistencias", loadAsistsReq).then(r=>r.json()).then(data=>{
      setListAsistencias(data.listAsistencias);
    })
  },[alumnObjSel])
  return(
    <main>
      <section className='pars-select'>
            <div>
              <ParsCourses setAlumnObjSel={setAlumnObjSel}/>

              
            </div>
      </section>
      {alumnObjSel.id!=0&&<Calendar alumnObjSel={alumnObjSel} listAsistencias={listAsistencias}/>
    }
    </main>
  )
}

