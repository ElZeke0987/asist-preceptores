


export default function Params(){
    return (
        <div className="genera-params">
            <div className="tourn-params">
                <div className="tourn-select">
                    <label>
                        <input type="radio" id='morn' name="tourn"/> T.M.
                    </label>
                    <label>
                        <input type="radio" id='afnoon' name="tourn"/> T.T.
                    </label>
                    <label>
                        <input type="radio" id='night' name="tourn"/> T.V.
                    </label>
                </div>
                <select className="course-list">
                    <option></option>
                </select>
                
                
            </div>
            <div className="course-params">
                <select className="modulo">
                    <option value="taller">Taller</option>
                    <option value="5to_mod">5to Modulo</option>
                    <option value="aula">Aula</option>
                    <option value="edu_fis">Educacion fisica</option>
                </select>
                <div className="grupo-taller" style="display:none">
                    <label>
                        <input type="radio" id="a" name="group"/> Grupo A
                    </label>
                    <label>
                        <input type="radio" id="b" name="group"/> Grupo B
                    </label>
                    <label>
                        <input type="radio" id="both" name="group"/> Ambos
                    </label>
                </div>
                <div className="check-all">
                    <label>Check all fields</label>
                    <input type="checkbox" checked={true}/>
                </div>
                <div className="prof-asist">
                    <label>Asistio el profe?</label>
                    <input type="checkbox" checked={true}/>
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