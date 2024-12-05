import { validationResult } from "express-validator";
import { mySQLConnection } from "../connection.js";
import { setInitCookies } from "./cookiePoints.js";



export function logPoint(req, res){
    let dataBody = req.body;
    let errors = validationResult(req);
    res.setHeader("Content-Type", "application/json");
    if(errors.isEmpty()==false){
        console.log("errors in loggin: ", errors)
        res.status(400).json({errors: errors.array()});
        return
    }
    setInitCookies(req, res)
    //res.status(200).json({errors: undefined, userBody: dataBody.userBody})

}
//1234%t&6eE
export function regPoint(req, res){
    let body = req.body;
    let errors = validationResult(req);
    res.setHeader("Content-Type", "application/json");
    if(!errors.isEmpty()){return res.status(400).json({errors: errors.array()})}
    let telNumber = body.tel != "" ? body.tel:"NULL";
    let queryIns=`
    INSERT INTO cuentas (id, username, email, password, reg_date, telefono,imagen, rol) 
    VALUES (NULL, ?, ?, ?, current_timestamp(), 
    ?, NULL, 'visit')`;
    
    mySQLConnection(queryIns, [body.username, body.email, body.pass, telNumber]).then(r=>{
        setInitCookies(req, res);
        //res.status(200).json({errors: undefined, userBody: body})
    }).catch(err=>{throw err})
}