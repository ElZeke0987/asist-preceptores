import { handleAlumnClick, handleStyleCheckTourn } from "../../../../styling";

export default function AlumnItem({almn}){
    console.log("rendering: ", almn.nombre);
    return(
        <div className="alumn-item" id={almn.id} onDoubleClick={handleAlumnClick} onClick={handleAlumnClick}>
            <div className="pres-check presence-cont" onClick={handleStyleCheckTourn}>
                <label>Presente:</label>
                <input className="pres-alumn" type="checkbox" defaultChecked={true}/>
            </div>
                
            Alumno:<span className="name">{almn.nombre}  {almn.apellido}</span>
            <div>Grupo de taller: <span className="taller-grupo">{almn.grupo_tal}</span></div>
            <div>DNI: {almn.dni}</div>
            <div>Inasistencias: {almn.inasistencias}</div>
            <div className="pres-check justas-cont" onClick={handleStyleCheckTourn}>
                <label>Falta justificada:</label>
                <input className="just-asist-alumn" type="checkbox" />
            </div>
        </div>
    )
}