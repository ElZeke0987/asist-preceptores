import { useEffect, useState } from "react";
import CustomSelect from "../../../src/comps/molecules/customSelect/customSelect";
import ConjuntCell from "./ConjuntCell";
import { obtenerInfoDays } from "./getDaysInfo";
import { DATE } from "sequelize";

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
      "Sabado",
      "Domingo",
  ];

export default function Calendar({alumnObjSel}){
    
    const actualMonthId=new Date().getMonth();//Mes ahora
    const nowYear=new Date().getFullYear()//Año ahora
    const mesInfo=obtenerInfoDays(nowYear, actualMonthId)//cantDias, primerDia y ultimoDia

    const [actualYear, setActualYear]=useState(nowYear)//A futuro, no sera un select, unicamente tendra flechas intercambiables y se podra poner un valor
    const [actualDate, setActualDate]=useState({id: actualMonthId, mes: monthList[actualMonthId].mes});
    const [listAsistencias, setListAsistencias]=useState([]);
    const [listAsistenciasByDate, setListAsistenciasByDate]=useState([]);
    const [settedLABD, setSettedLABD]=useState(false);
    const [maxDays, setMaxDays]=useState(mesInfo.cantDias);
    const [initDay, setInitDay]=useState(mesInfo.primerDia)
    
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
            let conjuntedByDate=[]
            data.listAsistencias.forEach((asistencia,i)=>{//asistencia son las asistencias directamente cargadas de la BD
                console.log("testing for conjunting asistance: ", asistencia)
                const dateYMD= asistencia.fecha.split('T')[0]//Se convierte la fecha DATETIME a DATE nada mas
                if(!conjuntedByDate[0]){//Si no habia conjunto creado se crea y se sigue iterando
                    conjuntedByDate.push(asistencia)
                    return
                }
                
                const dateYMD2= conjuntedByDate[0].fecha.split('T')[0]//Para verificar si al menos, al primer objeto de la
                if(dateYMD==dateYMD2){//Si comparten la misma fecha de registro de asistencia se agrega al conjunto
                    conjuntedByDate.push(asistencia)
                }else{//Si no es el caso se reinicia todo y se agrega el nuevo conjunto
                    newListAsistencias.push({date: dateYMD, dia: asistencia.dia, mes: asistencia.mes, conjunt: conjuntedByDate})//Asi se crea una lista dividida en conjuntos definidos por la fecha que se realizaron las asistencias que contenga dentro del conjunto
                    conjuntedByDate=[]
                }
                // newListAsistencias[i]={
                //     id:v.id,
                //     fecha:v.fecha,
                //     asistencia:v.asistencia,
                //     actualDateId: v.actualDateId,
                //     presencia: v.presencia,
                //     justificada: v.justificada,
                //     dia:v.dia,
                //     mes:v.mes
                // }
            })
            console.log("new filtered list of conjunts: ", newListAsistencias)
            setListAsistencias(newListAsistencias);
           /* let reducedByDate=data?.listAsistencias.reduce((subDiv, asistencia)=>{
                
                const id = dateYMD//Clave para buscar en el subDiv, (mes(0-11)-numero del dia de la semana(1-7))
                if(!subDiv[id]){//Si no existe el conjunto de la clave, se crea uno nuevo
                    subDiv[id]=[]//Genera un array vacio para usar el push
                }
                subDiv[id].push(asistencia);//Si existe, pone la asistencia dentro del conjunto, basandose en la fecha
                return subDiv
            }, {})
            setListAsistenciasByDate(reducedByDate);*/
        })
      },[alumnObjSel])
    function handleClickMonth(dir){
        
        let operation=dir=="left"?actualDate.id-1:actualDate.id+1;
        console.log("(click on arrows) setting this new month", operation, " actualDate: ", actualDate);
        switch(operation){//Controla el limite de meses, pasando de enero a diciembre y viceversa dependiendo la direccion que se avance
            case 12: operation=0; break;
            case -1: operation=11; break;
        }
        setActualDate({id: operation, mes: monthList[operation].mes})
    }
    const [cellOpen, setCellOpen]=useState(0)
    
    return(
        <section className='asist-calendar'>
            <div className='calendar-generals'>
                <div className="cal-gen-mod-col cal-gen-col">
                    <div className="mod-col-header mod-row">Modulo</div>
                    <div className='inas-total mod-row'>
                        Total
                    </div>
                    <div className='inas-aula mod-row'>
                        Aula
                    </div>
                    <div className='inas-tall mod-row'>
                        Taller
                    </div>
                    <div className='inas-preh mod-row'>
                        Prehora
                    </div>
                    <div className='inas-fis mod-row'>
                        Educacion fisica
                    </div>
                </div>
                <div className="cal-gen-inas-col cal-gen-col">
                    <div className="mod-col-header mod-row">Inasistencias</div>
                    <div className='inas-total mod-row'>
                        {alumnObjSel.inasistencias}
                    </div>
                    <div className='inas-aula mod-row'>
                        {alumnObjSel.inas_aula}
                    </div>
                    <div className='inas-tall mod-row'>
                        {alumnObjSel.inas_tal}
                    </div>
                    <div className='inas-preh mod-row'>
                        {alumnObjSel.inas_preh}
                    </div>
                    <div className='inas-fis mod-row'>
                        {alumnObjSel.inas_fis}
                    </div>
                </div>
                
            </div>
            <div className='calendar-list'>
                <div className='calendar-month'>
                    <div className='change-month' onClick={e=>handleClickMonth("left")}>
                        {"<"}
                    </div>
                    <div className="month-select">
                        <CustomSelect opts={monthList} 
                        onSelect={setActualDate}
                        defaultText={actualDate.mes} 
                        defaultValue={actualDate.id} 
                        overDefaults={true}
                        propTxt='mes' 
                        propVal='id' 
                        clases={'month-select'}
                        forEffectVal={actualDate.id}/* Sobre esta id se pondra el nuevo valor */
                        forEffectTxt={monthList[actualDate.id]?.mes}/>{/* Este sera el nuevo texto a poner en el objeto de seleccion*/}
                    </div>
                    
                    <div className='change-month' onClick={e=>handleClickMonth("right")}>
                        {">"}
                    </div>
                </div>
                <div className='calendar-days'>
                    
                    {dayList.map((day, dayN)=>{
                        return (
                        <div className={'cal-day ' + day.toLowerCase()} key={dayN}>
                            <h3>{day}</h3>
                            <div className='day-col'></div>
                            
                            
                        </div>)
                        })
                    
                    }
                    {
                        for(let diaN=1; diaN<=maxDays; diaN++ ){
                            listAsistenciasByDate.map((conjuntAsist, ind)=>{//Verifica sobre todas las asistencias del alumno
                                if(conjuntAsist.fecha!=new Date(actualYear, actualMonthId, diaN).getDate()) return//Primero, si esta en el año y mes seleccionados, se mostrara obviamente, es la mejor condicional para separar por las fechas exactas
                                return(
                                <><ConjuntCell conjuntAsist={conjuntAsist.conjunt} date={conjuntAsist.date} alumnId={alumnId} cursoId={cursoId} nomComp={nomComp} curso={curso}/></>
                                )
                            })
                        }
                    }
                    
                            
                </div>
                
            </div>
      </section>
    )
}