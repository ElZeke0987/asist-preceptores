
import * as mysql from "mysql2/promise";
import { QueryTypes, Sequelize } from "sequelize"
let one = true;
export async function mySQLConnection(query, dataArray = []){
    
    let conn = new Sequelize("escuela", "root", "", {
        host: "localhost",
        dialect: "mysql"
    })
    try{
        const [results, fields]=await conn.query(conn.escape(query), {
            replacements: getReplacements(dataArray),
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

const seqConst={
    "varchar": Sequelize.STRING,
    "int": Sequelize.INTEGER,
    "PRI": true,
    "auto_increment": true,
}

export async function seqTabletoModel(sequelize, tableName) {
    sequelize.query(`DESCRIBE ${tableName}`).then(tableColsInfo => {
        tableColsInfo.forEach(colInfo => {
          const modelName = tableName.charAt(0).toUpperCase() + tableName.slice(1);
          const model = sequelize.define(modelName,{
            id: {

            }
          });
          console.log(`Model ${modelName} created`);
        });
    });
}

export async function seqSearch(tabla, campos, filtro){
    let conn = new Sequelize("escuela", "root", "", {
        host: "localhost",
        dialect: "mysql"
    })
    seqTablesToModel(sequelize)
    try{
        let mdl = conn.model(tabla);
        let res = await mdl.findAll({
            attributes: campos,
            where: filtro
        })
    }catch(err){
        throw err
    }finally{
        conn.close()
    }     
}
export async function seqCreate(tabla, datos){
    let conn = new Sequelize("escuela", "root", "", {
        host: "localhost",
        dialect: "mysql"
    })
    conn.import(__dirname + "/model").then(m=>console.log(m));
    const model= conn.model(tabla);
    const regis = model.create()
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

