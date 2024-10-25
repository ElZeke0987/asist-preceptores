
import { useEffect, useState } from "react";
import Params from "./Params";

export default function AlumnItem({almn, allPresence, setAllPresence , allJustified, setAllJustified}){
    const [presenceChecked, setPresenceChecked] = useState(true);
    const [justifiedChecked, setJustifiedChecked] = useState(false);
    useEffect((()=>{
      setPresenceChecked(allPresence);
      if(allJustified)setPresenceChecked(false); 
      setJustifiedChecked(allJustified);
    }, [allPresence, allJustified]))
    useEffect(()=>{
      let elem = document.querySelector("#almn-"+almn.id);
      
      if(justifiedChecked){
        elem.classList.remove("alumn-item-check");
        elem.classList.toggle("alumn-item-just");
        return
      }
      elem.classList.remove("alumn-item-just");
      elem.classList.toggle("alumn-item-check");

    }, [justifiedChecked, presenceChecked])

    async function handleStyleCheckTourn (e, setters){
        // Si se hace click sobre el checkbox de la presencia
        if (e.target.parentElement.classList.contains('presence-cont')||e.target.classList.contains('presence-cont')) {
          setJustifiedChecked(false)
          setPresenceChecked(!presenceChecked);

        }
        // Si se hace click sobre el checkbox de falta justificada
        if (e.target.parentElement.classList.contains('justas-cont')||e.target.classList.contains('justas-cont')) {
          setPresenceChecked(false);
          setJustifiedChecked(!justifiedChecked);

        }
    };

  async function handleAlumnClick (e) {
    if(e.target.parentElement.classList.contains('presence-cont')||e.target.classList.contains('justas-cont')||
    e.target.parentElement.classList.contains('justas-cont')||e.target.classList.contains('presence-cont')) {// Si son los inputs mismos cambiar ahi
        console.log("Click on inputs");   
    }else{
        if (e.type === "click") {// Solo click para alternar el checkbox de presence-cont
            setJustifiedChecked(false);
            setPresenceChecked(!presenceChecked);
            
        }
        // Doble click para alternar el checkbox de justas-cont
        if (e.type === "dblclick") {
            setPresenceChecked(false);
            setJustifiedChecked(!justifiedChecked);
        }
    }
    
    if(presenceChecked==false)setAllPresence(false);
    if(justifiedChecked==false)setAllJustified(false);
  };


  //useEffect(()=>console.log("Presence or justified changed: \n p: ", presenceChecked, "\n j: ", justifiedChecked, "\n"), [presenceChecked, justifiedChecked])
  
  
  let paramsHandler=[
    {
      ["setJAs"]: setJustifiedChecked,
      ["setPAs"]: setPresenceChecked
    },
    {
      ["varJAs"]: justifiedChecked,
      ["varPAs"]: presenceChecked
    }
  ] 
  return (
    <div className="alumn-item alumn-item-check" id={"almn-"+almn.id} onDoubleClick={handleAlumnClick} onClick={handleAlumnClick}>
      <div className="pres-check presence-cont" onClick={(e)=>handleStyleCheckTourn(e, paramsHandler[0], paramsHandler[1])}>
        <label>Presente:</label>
        <input
          className="pres-alumn"
          type="checkbox"
          checked={presenceChecked}
        />
      </div>

      Alumno:<span className="name">{almn.nombre} {almn.apellido}</span>
      <div>Grupo de taller: <span className="taller-grupo">{almn.grupo_tal}</span></div>
      <div>DNI: {almn.dni}</div>
      <div>Inasistencias: {almn.inasistencias}</div>

      <div className="pres-check justas-cont" onClick={(e)=>handleStyleCheckTourn(e, paramsHandler[0], paramsHandler[1] )}>
        <label>Falta justificada:</label>
        <input
          className="just-asist-alumn"
          type="checkbox"
          checked={justifiedChecked}
        />
      </div>
    </div>
  );
}
