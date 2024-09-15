export function createDatabase(){
    const dbReq= indexedDB.open("baseCliente", 2);
    dbReq.onupgradeneeded=(ev)=>{
        let db = ev.target.result;
        if(!db.objectStoreNames.contains("logInfo")){
            db.createObjectStore("logInfo", { keyPath: "id" });
        }
    }
    dbReq.onsuccess = (ev)=>{
        console.log("Database created succesfully");
    }
}

export function readWriteOnly (method, logInfo){
    
    const prom = new Promise((resolve, reject) => {
        const db = indexedDB.open('baseCliente', 2);
        db.onsuccess = (ev)=>{
            let trn = ev.target.result.transaction(["logInfo"], method);
            trn.onerror = (event) => {
                reject("Error executing transaction:", event.target.error);
            };
            const obj = trn.objectStore("logInfo");
            let req;
            if(method=="readonly"){req=obj.get(1)}
            else if(method=="readwrite"){logInfo.id=1; req=obj.add(logInfo)}
            else{ req = obj.delete(1)}
            req.onsuccess=(ev)=>{
                resolve(ev.target.result);
            }
        }
    })
    return prom;
}
/*
module.exports = {
    readWriteOnly,
}*/