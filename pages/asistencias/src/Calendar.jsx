import { useEffect, useState } from "react";
import CustomSelect from "../../../src/comps/molecules/customSelect/customSelect";
import ConjuntCell from "./ConjuntCell";
import { obtenerInfoDays } from "./getDaysInfo";

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
      "Domingo",
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
      
  ];

export default function Calendar({alumnObjSel}){
    
    const actualMonthId=new Date().getMonth();//Mes ahora
    const nowYear=new Date().getFullYear()//Año ahora
    const [mesInfo, setMesInfo]=useState(obtenerInfoDays(nowYear, actualMonthId))//cantDias, primerDia y ultimoDia
   // console.log("mesInfo test: ", mesInfo);
    const [actualYear, setActualYear]=useState(nowYear)//A futuro, no sera un select, unicamente tendra flechas intercambiables y se podra poner un valor
    const [actualDate, setActualDate]=useState({id: actualMonthId, mes: monthList[actualMonthId].mes});
    const [listAsistencias, setListAsistencias]=useState([]);
    const [listAsistenciasByDate, setListAsistenciasByDate]=useState([]);
    const [settedLABD, setSettedLABD]=useState(false);

    
    useEffect(()=>{//Efecto para cargar las asistencias del alumno
        
        const loadAsistsReq={
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            alumn_id: alumnObjSel.id,
          })
        }
        fetch("/load-asistencias", loadAsistsReq).then(r=>r.json()).then(data=>{//Carga las asistencias e inasistencias de un alumno, todas, y solo de un alumno
            let newListAsistencias=[]
            let conjuntedByDate=[]
            data.listAsistencias.forEach((asistencia,i)=>{//asistencia son las asistencias directamente cargadas de la BD
                const dateYMD= asistencia.fecha.split('T')[0]//Se convierte la fecha DATETIME a DATE nada mas
                console.log("testing asistencia: ", asistencia.fecha.split('T')[0])
                if(!conjuntedByDate[0]){//Si no habia conjunto creado se crea y se sigue iterando
                    conjuntedByDate.push(asistencia)
                    if(data.listAsistencias.length==1){//En el caso de ser primera asistencia
                        newListAsistencias.push({date: dateYMD, dia: asistencia.dia, mes: asistencia.mes, conjunt: conjuntedByDate})
                        conjuntedByDate=[]
                    }
                    return
                }
                const dateYMD2= conjuntedByDate[0].fecha.split('T')[0]//Para verificar si al menos, al primer objeto de la
                if(dateYMD==dateYMD2){//Si comparten la misma fecha de registro de asistencia se agrega al conjunto
                    conjuntedByDate.push(asistencia)
                    if(!data.listAsistencias[i+1]){
                        newListAsistencias.push({date: dateYMD, dia: asistencia.dia, mes: asistencia.mes, conjunt: conjuntedByDate})//Asi se crea una lista dividida en conjuntos definidos por la fecha que se realizaron las asistencias que contenga dentro del conjunto
                        conjuntedByDate=[]
                    }
                    return
                }
                
                if(dateYMD!=dateYMD2){ //Si no es el caso se reinicia todo y se agrega el nuevo conjunto y es la ultima asistencia de la lista
                    newListAsistencias.push({date: dateYMD, dia: asistencia.dia, mes: asistencia.mes, conjunt: conjuntedByDate})//Asi se crea una lista dividida en conjuntos definidos por la fecha que se realizaron las asistencias que contenga dentro del conjunto
                    conjuntedByDate=[]
                }
            })
            console.log("new alumnObjSel test on self eff: ", alumnObjSel)
            setListAsistencias(newListAsistencias);

        })
      },[alumnObjSel])

    useEffect(()=>{
        diaNRender=1;
        setMesInfo(obtenerInfoDays(actualYear, actualDate.id))
    },[actualDate, actualYear])

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
    const [openDay, setOpenDay]=useState(0)
    let diaNRender=0;
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
                    <div className="cal-header-days">
                        {dayList.map((day, dayN)=>{
                            return (
                            <div className={'cal-day ' + day.toLowerCase()} key={dayN}>
                                <h3>{day}</h3>             
                            </div>)
                            })
                        
                        }
                    </div>
                    
                    <div className={"cal-list-days "}>
                        {
                        
                        Array.from({length: 36/*maxDays+1*/}).map(()=>{
                            diaNRender++
                            if(diaNRender < mesInfo.primerDia||diaNRender>mesInfo.cantDias+mesInfo.primerDia||diaNRender-mesInfo.primerDia==0)return <div className="cal-day-empty day-col-item"></div>//Se empezaran a renderizar las celdas en el momento que se llegue al dia de inicio
                            const diaN = diaNRender-mesInfo.primerDia
                            //console.log("diaNumber: ", actualYear, actualMonthId, diaN)
                            const asistenciasDelAlumnoEnElDia=[]
                            listAsistencias.forEach((conjuntAsist)=>{
                                //Primero, si esta en el año y mes seleccionados, se mostrara obviamente, es la mejor condicional para separar por las fechas exactas
                                
                                const selDate=String(actualYear)+"-"+(actualDate.id<10?"0":"")+String(actualDate.id+1)+"-"+(diaN<10?"0":"")+String(diaN);

                                if(conjuntAsist.date==selDate)asistenciasDelAlumnoEnElDia.push(conjuntAsist)
                            })
                            
                            if(asistenciasDelAlumnoEnElDia.length==0){return <div className="asist-conjunt-cont asist-void day-col-item" key={diaN}>{diaN}</div>}
 
                            
                            
                            const openCond=diaN==openDay&&actualMonthId==actualDate.id&&actualYear==2025;
                            //console.log("openCond: ", actualMonthId, " = ", actualDate)
                            return (
                                <div className="asist-conjunt-cont day-col-item" key={diaN}>
                                    <div className="asist-date" onClick={()=>setOpenDay(prev=>prev==diaN?0:diaN)}>{diaN}{openCond?"(cerrar)":"(abrir)"}</div>
                                    {openCond&&<div className="asist-conjunt">
                                        {
                                            asistenciasDelAlumnoEnElDia.map((conjuntAsist, ind)=>{//Verifica sobre todas las asistencias del alumno
                                                console.log("Test of alumnObjSel", alumnObjSel, " and conjuntAsist: ", conjuntAsist, " and diaN: ", diaN)
                                                return(
                                                         <ConjuntCell conjuntAsist={conjuntAsist.conjunt} alumnId={alumnObjSel.id} cursoId={alumnObjSel.cursoId} nomComp={alumnObjSel.nom_comp} curso={alumnObjSel.curso}/>
                                                    )
                                            })
                                        }
                                    </div>}
                                </div>
                            )
                        })
                        }
                    </div>
                    
                            
                </div>
                
            </div>
      </section>
    )
}