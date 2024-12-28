import { useEffect, useState } from 'react'
import ParsCourses from './ParsCourses.jsx';
import Calendar from './Calendar.jsx';



export default function Asistencias() {
  
  /* List de los items cargados */
  const [cursosList, setCursosList]=useState([]);
  const [alumnosList, setAlumnosList]=useState([]);
 
  
  /* selection of alumn (the most important) */
  const [alumnObjSel, setAlumnObjSel]=useState({id: 0});
  
  return(
    <main>
      <section className='pars-select'>
            <div>
              <ParsCourses setAlumnObjSel={setAlumnObjSel}/>

              
            </div>
      </section>
      {alumnObjSel.id!=0&&<Calendar alumnObjSel={alumnObjSel}/>
    }
    </main>
  )
}

