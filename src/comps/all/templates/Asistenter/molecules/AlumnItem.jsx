import { handleAlumnClick, handleStyleCheckTourn } from "../../../../styling";
import { useState } from "react";

export default function AlumnItem({almn}){
    const [presenceChecked, setPresenceChecked] = useState(true);
    const [justifiedChecked, setJustifiedChecked] = useState(false);

    const handleStyleCheckTourn = (e) => {
        // Si se hace click sobre el checkbox de la presencia
        if (e.target.parentElement.classList.contains('presence-cont')) {
          setJustifiedChecked(false)
          setPresenceChecked(!presenceChecked);
        }
        // Si se hace click sobre el checkbox de falta justificada
        if (e.target.parentElement.classList.contains('justas-cont')) {
          setPresenceChecked(false);
          setJustifiedChecked(!justifiedChecked);
        }
    };

  const handleAlumnClick = (e) => {
    // Solo click para alternar el checkbox de presence-cont
    if(e.target.parentElement.classList.contains('presence-cont')||e.target.classList.contains('justas-cont')) {
        console.log("e.target  ", e.target)
        
    }else{
        if (e.detail === 1) {
            setPresenceChecked(!presenceChecked);
            setJustifiedChecked(false);
        }
        // Doble click para alternar el checkbox de justas-cont
        if (e.type === "dblclick") {
            setPresenceChecked(false);
            setJustifiedChecked(!justifiedChecked);
        }
    }
  };

  return (
    <div className="alumn-item" id={almn.id} onDoubleClick={handleAlumnClick} onClick={handleAlumnClick}>
      <div className="pres-check presence-cont" onClick={handleStyleCheckTourn}>
        <label>Presente:</label>
        <input
          className="pres-alumn"
          type="checkbox"
          checked={presenceChecked}
          onChange={() => setPresenceChecked(!presenceChecked)}
        />
      </div>

      Alumno:<span className="name">{almn.nombre} {almn.apellido}</span>
      <div>Grupo de taller: <span className="taller-grupo">{almn.grupo_tal}</span></div>
      <div>DNI: {almn.dni}</div>
      <div>Inasistencias: {almn.inasistencias}</div>

      <div className="pres-check justas-cont" onClick={handleStyleCheckTourn}>
        <label>Falta justificada:</label>
        <input
          className="just-asist-alumn"
          type="checkbox"
          checked={justifiedChecked}
          onChange={() => setJustifiedChecked(!justifiedChecked)}
        />
      </div>
    </div>
  );
}
