import { useEffect, useState } from "react";
import CustomSelect from "../../../src/comps/molecules/customSelect/customSelect";
import CellAsist from "./cellAsist";

const monthList=[
    {mes: "Enero", id: 0},
    {mes: "Febrero", id: 1},
    {mes: "Marzo", id: 2},
    {mes: "Abril", id: 3},
    {mes: "Mayo", id: 4},
    {mes: "Junio", id: 5},
    {mes: "Julio", id: 6},
    {mes: "Agosto", id: 7},
    {mes: "Septiembre", id: 8},
    {mes: "Octubre", id: 9},
    {mes: "Noviembre", id: 10},
    {mes: "Diciembre", id: 11},
  
  ];
  const dayList=[
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
  ];

export default function Calendar({alumnObjSel}){
    const actualMonthId=new Date().getMonth();
    const [actualDate, setActualDate]=useState(actualMonthId);
    const [listAsistencias, setListAsistencias]=useState([]);
    const [listAsistenciasByDate, setListAsistenciasByDate]=useState([]);
    const [settedLABD, setSettedLABD]=useState(false);
    useEffect(()=>{//Efecto para controlar el limite de meses en el año (enero minimo, diciembre maximo)
        console.log("new month: ", actualDate);
        setActualDate((prevDate) => {
            if (prevDate > 11) return 0;
            if (prevDate < 0) return 11;
            return prevDate;
        });
        
    },[actualDate])

    useEffect(async()=>{//Efecto para cargar las asistencias del alumno
        const loadAsistsReq={
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            alumn_id: alumnObjSel.id,
          })
        }
        await fetch("/load-asistencias", loadAsistsReq).then(r=>r.json()).then(data=>{//Carga las asistencias e inasistencias de un alumno, todas, y solo de un alumno
            let newListAsistencias=[]
            data.listAsistencias.forEach((v,i)=>{
                newListAsistencias[i]={
                    id:v.id,
                    fecha:v.fecha,
                    asistencia:v.asistencia,
                    actualDateId: v.actualDateId,
                    presencia: v.presencia,
                    justificada: v.justificada,
                    dia:v.dia,
                    mes:v.mes
                }
            })
            //setListAsistencias(newListAsistencias);
            let reducedByDate=data?.listAsistencias.reduce((subDiv, asistencia)=>{
                const id = asistencia.mes+"-"+asistencia.dia//Clave para buscar en el subDiv, (mes(0-11)-numero del dia de la semana(1-7))
                if(!subDiv[id]){
                    subDiv[id]=[]//Genera un array vacio para usar el push
                }
                subDiv[id].push(asistencia);
                return subDiv
            }, {})
            setListAsistenciasByDate(reducedByDate);
        })
      },[alumnObjSel])
    function handleClickMonth(dir){
        console.log("setting this new month", dir=="left"?actualDate-1:actualDate+1, " actualDate: ", actualDate);
        setActualDate(dir=="left"?actualDate-1:actualDate+1)
    }
    const [cellOpen, setCellOpen]=useState(0)
    
    return(
        <section className='asist-calendar'>
            <div className='calendar-generals'>
                <div className='inas-total'>
                    Inasistencias totales: {alumnObjSel.inasistencias}
                </div>
                <div className='inas-aula'>
                    Inasistencias a aula: {alumnObjSel.inas_aula}
                </div>
                <div className='inas-tall'>
                    Inasistencias a taller: {alumnObjSel.inas_tal}
                </div>
                <div className='inas-preh'>
                    Inasistencias a prehora: {alumnObjSel.inas_preh}
                </div>
                <div className='inas-fis'>
                    Inasistencias a educacion fisica: {alumnObjSel.inas_fis}
                </div>
            </div>
            <div className='calendar-list'>
                <div className='calendar-month'>
                    <div className='change-month' onClick={e=>handleClickMonth("left")}>
                        {"<"}
                    </div>

                    <CustomSelect opts={monthList} 
                        onSelect={setActualDate}
                        defaultText={monthList[actualDate]?.mes} 
                        defaultValue={actualDate} 
                        overDefaults={true}
                        propTxt='mes' 
                        propVal='id' 
                        clases={'month-select'}
                        forEffectVal={actualDate}
                        forEffectTxt={monthList[actualDate]?.mes}/>
                    <div className='change-month' onClick={e=>handleClickMonth("right")}>
                        {">"}
                    </div>
                </div>
                <div className='calendar-days'>
                    
                    {dayList.map((day, ind)=>{
                            const actualPropDate=actualDate+"-"+(ind+1)

                            return(listAsistenciasByDate!=[]&&listAsistenciasByDate!=undefined&&<>
                                <CellAsist 
                                listAsistencias={listAsistenciasByDate[actualPropDate]} 
                                actualDateId={actualDate} day={day} ind={ind} 
                                setCellOpen={setCellOpen} cellOpen={cellOpen} 
                                alumnId={alumnObjSel.id}  cursoId={alumnObjSel.cursoId} nomComp={alumnObjSel.nom_comp} curso={alumnObjSel.curso}/></>)
                    })
                    }
                            
                </div>
                
            </div>
      </section>
    )
}