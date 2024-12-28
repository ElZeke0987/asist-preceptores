const DefaultModulesAsistList = [undefined, undefined, undefined, undefined];

export function effectGeneral(//Ejecutado por el efecto de re renderizado en la pagina
    asist, i, actualDateId, 
    setJustifyItem, 
    asistList, setAsistList,    
    indMod, 
    listAsistencias){//Aca esta toda la logica para hacer que se haga un conjunto de asistencias del mismo dia
    console.log("effect general test: ", asist)
    if (!asist) {return}
    if (asist.presencia == 0) setJustifyItem(true); // Una sola inasistencia hace falta para que se muestre el boton Justificar
    
    console.log("asist ");
    if (asist.mes == actualDateId && asist.dia == ind + 1) {//Verifica que este en el dia de hoy o el dia de la iteracion desde la column
        console.log("adding a new asist: ", asist);
        let newAsistList = [...asistList];
        asistList.forEach((oldAsistObj, oldInd) => {
            if (oldInd == indMod) {
                newAsistList[indMod] = asist; // que se reconstruya la lista de modulos en el dia implica muchas cosas, lo cual hace una lista que sirve para mucho
                console.log("Updated asistList: ", newAsistList);
            }
        });
        setAsistList(newAsistList);
    }
    const nextAsist = listAsistencias[i + 1];
    if (nextAsist && nextAsist?.mes != actualDateId && nextAsist.dia != ind + 1) {//El limite llega aca
        indMod=0;
        setAsistList(DefaultModulesAsistList);
        return;
    }
 }
