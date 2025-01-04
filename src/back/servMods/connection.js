import { QueryTypes, Sequelize } from "sequelize"
let one = true;

function getQueryType(qry){
    let queryTypes = {
        "INSERT": QueryTypes.INSERT,
        "SELECT": QueryTypes.SELECT,
        "UPDATE": QueryTypes.UPDATE,
        "DELETE": QueryTypes.DELETE
    }
    return queryTypes[qry.split(" ")[0]]
}

export async function mySQLConnection(query, dataArray){
    let conn = new Sequelize("escuela", "root", "", {
        host: "localhost",
        dialect: "mysql",
        //logging: false,

    })
    try{
        const [results, fields]=await conn.query({
            query,
            values: dataArray,
            type: getQueryType(query),
            raw: true,
        });
        if(results)return results;    
    }catch (error){
        throw error
    }
    finally{
        await conn.close()
    }
}


