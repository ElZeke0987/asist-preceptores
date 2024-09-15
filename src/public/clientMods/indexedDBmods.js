export function readWriteOnly (method, logInfo){
    const db = indexedDB.open('baseCliente', 1);
    const trn = db.transaction(["logInfo"], method);
    const obj = trn.objectStore("logInfo");

    let req = method == "readonly"? obj.get(1) : obj.add(logInfo);

    req.addEventListener("success", ()=>{
        console.log("IDB: Usuario guardado");
    })

}