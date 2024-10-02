
import { requestToLoadAlumns, requestToPostInform, requestToLoadCourses} from './mods/Reqs.js';
import { ChangeModuleSel, ChangeTourn, SelGroupTaller} from './mods/EvListeners.js';
import { grpOpts, getTourn, searchTalSelGrp, checkAllFunc} from './mods/Mods.js';
import { useState } from 'react';

requestToLoadCourses();

export default function Params(){
    let [checked, setChecked] = useState();
    let [courses, setCourses] = useState([]);
    return (
        <div className="general-params">
            <div className="tourn-params">
                <div className="tourn-select">
                    <label>
                        <input type="radio" id='morn' name="tourn" onChange={(e)=>ChangeTourn(e, setCourses)} onLoad={getTourn} /> T.M.
                    </label>
                    <label>
                        <input type="radio" id='afnoon' name="tourn" onChange={(e)=>ChangeTourn(e, setCourses)} onLoad={getTourn}/> T.T.
                    </label>
                    <label>
                        <input type="radio" id='night' name="tourn" onChange={(e)=>ChangeTourn(e, setCourses)} onLoad={getTourn}/> T.V.
                    </label>
                </div>
                <select className="course-list">
                        {courses.map(c=>{return (<option id={c.id}>{c.curso}</option>)})}
                </select> 
            </div>
            <div className="course-params">
                <select className="modulo" onChange={grpOpts}>
                    <option value="taller">Taller</option>
                    <option value="5to_mod">5to Modulo</option>
                    <option value="aula">Aula</option>
                    <option value="edu_fis">Educacion fisica</option>
                </select>
                <div className="grupo-taller" style={{display: 'none'}}>
                    <label>
                        <input type="radio" id="a" name="group" onClick={SelGroupTaller}/> Grupo A
                    </label>
                    <label>
                        <input type="radio" id="b" name="group" onClick={SelGroupTaller}/> Grupo B
                    </label>
                    <label>
                        <input type="radio" id="both" name="group" onClick={SelGroupTaller}/> Ambos
                    </label>
                </div>
                <div className="check-all">
                    <label>Check all fields</label>
                    <input type="checkbox" defaultChecked={true} onChange={checkAllFunc()}/>
                </div>
                <div className="prof-asist">
                    <label>Asistio el profe?</label>
                    <input type="checkbox" defaultChecked={true}/>
                </div>
                <div className="just-asist">
                    <label>Falta justificada al curso entero</label>
                    <input type="checkbox"/>
                </div>
                <div className="searcher">
                    <input type="text" placeholder="Buscar alumno..."/>
                </div>
            </div>
            
        </div>
    )
}