export default function AlumnItem({almn}){
    console.log("rendering: ", almn.nombre);
    return(
        <div className="alumn-item" id="${almn.id}">
            <label>Presente:<input className="pres-alumn" type="checkbox" checked={true}/></label><br/>
            Alumno:<span className="name">${almn.nombre} {almn.apellido}</span>
            <div>Grupo de taller: <span className="taller-grupo">{almn.grupo_tal}</span></div>
            <div>DNI: {almn.dni}</div>
            <div>Inasistencias: ${almn.inasistencias}</div>
            <label >Falta justificada: <input className="just-asist-alumn" type="checkbox"/> </label>
        </div>
    )
}