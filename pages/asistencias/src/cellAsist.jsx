import { useEffect, useState } from "react";
import ConjuntCell from "./ConjuntCell";


const CantidadDeModulos = 4;
const DefaultModulesAsistList = [undefined, undefined, undefined, undefined];


export default function CellAsist({ actualDateId, day, ind, listAsistencias, setCellOpen, cellOpen, alumnId, cursoId}) {//ind es el dia de la semana, day el texto de ese dia
    const [opened, setOpened] = useState(false); // Maneja el estado de que si se abre o no el sistema para mostrar (false) los bloques de los modulos asistidos en el dia
    
    let shouldJustify = false;
    return (
        <div className={'cal-day ' + day.toLowerCase()} key={ind}>
            <h3>{day}</h3>
            <div className='day-col'>
                {
                    <><ConjuntCell 
                        asistList={listAsistencias}  
                        shouldJustify={shouldJustify}
                        opened={opened} alumnId={alumnId} cursoId={cursoId}/></>

                }
            </div>
        </div>
    )
}