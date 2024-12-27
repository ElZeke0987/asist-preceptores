
import { useEffect, useState } from "react";

export default function AlumnItem({almn, ind, allPresence, setAllPresence , allJustified, setAllJustified, profAsist, alumnsList, setAlumnsList}){
  const [presenceChecked, setPresenceChecked] = useState(true);
  const [justifiedChecked, setJustifiedChecked] = useState(false);

  //Efectos de cambio de la variable de todos los checked, la idea es que ponga todos los checked individuales en true, y si uno cambia poner el checked general en false
  useEffect(()=>{if(allJustified)setJustifiedChecked(true)}, [allJustified])
  useEffect(()=>{if(allPresence)setPresenceChecked(true)}, [allPresence])

  useEffect(()=>{
      console.log("Justificando porque el profe falto");
      if(profAsist==false){
          setAllJustified(true);
          return
      }
      setJustifiedChecked(false)
  },[profAsist])

  useEffect(()=>{//Efecto del cambio de un solo checked
    if(justifiedChecked==false){
      setAllJustified(false)
    }
    if(presenceChecked==false){
      setAllPresence(false)
    }
    console.log("almn test: ", almn)
    if(!almn)return
    alumnsList[ind].pres=presenceChecked;
    alumnsList[ind].just=justifiedChecked
    console.log("new alumns list: ", alumnsList)
    // almn.pres=presenceChecked;
    // almn.just=justifiedChecked;
    console.log("Setting this new JC and PC: ", justifiedChecked, presenceChecked)
  }, [justifiedChecked, presenceChecked])

    function handleStyleCheckTourn (e, setters){
        // Si se hace click sobre el checkbox de la presencia
        if (e.target.parentElement.classList.contains('presence-cont')||e.target.classList.contains('presence-cont')) {
          setPresenceChecked(!presenceChecked);

        }
        // Si se hace click sobre el checkbox de falta justificada
        if (e.target.parentElement.classList.contains('justas-cont')||e.target.classList.contains('justas-cont')) {
          setJustifiedChecked(!justifiedChecked);

        }
    };

    function handleInputChangePres(e){
      let inp = e.target;
      if(allPresence)setPresenceChecked(true);//Tener en cuenta que si allPresence es true, los checked individuales siempre seran true hasta que se cambien
    }
  function handleAlumnClick (e) {
    if(e.target.parentElement.classList.contains('presence-cont')||e.target.classList.contains('justas-cont')||
    e.target.parentElement.classList.contains('justas-cont')||e.target.classList.contains('presence-cont')) {// Si son los inputs mismos cambiar ahi
        console.log("Click on inputs");   
    }else{
        if (e.type === "click") {// Solo click para alternar el checkbox de presence-cont
            setPresenceChecked(!presenceChecked);
            
        }
        // Doble click para alternar el checkbox de justas-cont
        if (e.type === "dblclick") {
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
  const classString=
  presenceChecked==false&&justifiedChecked==false?"":""+
  justifiedChecked&&presenceChecked==false?"alumn-item-just":"" + 
  presenceChecked&&justifiedChecked==false?"alumn-item-check":"" + 
  justifiedChecked&&presenceChecked?"alumn-item-just":"" ;
  return (
    <div className={"alumn-item " + classString} 
    id={"almn-"+almn.id} 
    onDoubleClick={handleAlumnClick} onClick={handleAlumnClick}>
      <div className="pres-check presence-cont" onClick={(e)=>handleStyleCheckTourn(e, paramsHandler[0], paramsHandler[1])}>
        <label>Presente:</label>
        <input
          className="pres-alumn"
          type="checkbox"
          checked={presenceChecked}
          onChange={handleInputChangePres}
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
