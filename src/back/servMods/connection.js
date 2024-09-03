
import * as mysql from "mysql2/promise";
let one = true;
export async function mySQLConnection(query, dataArray = []){
    let conn = await mysql.createConnection({
        host: "127.0.0.1",
        database: "escuela",
        user: "root",
        password: ""
    })
    try{
        let [results, fields]=await conn.execute(query, dataArray);
        if(results)return results;    
    }catch (error){
        throw error
    }
    finally{
        await conn.end()
    }
}


export async function vldExistence(fld, val){//Valida la existencia de cierto usuario
    let qry=`SELECT * FROM cuenta WHERE ${fld}='${val}'`;
    return await mySQLConnection(async (conn)=>{
        let [err, result] = await conn.execute(qry)
        if(err)throw err;
        if(results[0]!=undefined) {
            console.log("Field existente para "+val+": true");
            return true;
        }
        console.log("Field existente para "+val+": false");
        return false; 
    })
}

