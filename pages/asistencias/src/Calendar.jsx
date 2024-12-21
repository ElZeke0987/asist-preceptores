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

export default function Calendar({alumnObjSel, listAsistencias}){
    const actualMonthId=new Date().getMonth();
    const [actualDate, setActualDate]=useState(actualMonthId);
    useEffect(()=>{
        console.log("new month: ", actualDate);
        setActualDate((prevDate) => {
            if (prevDate > 11) return 0;
            if (prevDate < 0) return 11;
            return prevDate;
        });
        
    },[actualDate])

    function handleClickMonth(dir){
        console.log("setting this new month", dir=="left"?actualDate-1:actualDate+1, " actualDate: ", actualDate);
        setActualDate(dir=="left"?actualDate-1:actualDate+1)
    }
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
                        return(<><CellAsist listAsistencias={listAsistencias} actualDateId={actualDate} day={day} ind={ind} /></>)
                    })
                    }
                            
                </div>
                
            </div>
      </section>
    )
}