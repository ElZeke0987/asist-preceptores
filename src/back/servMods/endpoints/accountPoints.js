import { validationResult } from "express-validator";
import { mySQLConnection } from "../connection.js";



export function logPoint(req, res){
    let dataBody = req.body;
    let errors = validationResult(req);
    res.setHeader("Content-Type", "application/json");
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    let queryLog = `
    SELECT * FROM cuentas 
    WHERE username = ?
    OR email = ? 
    AND password = ?`;
    mySQLConnection(queryLog, [dataBody.userOEmail, dataBody.userOEmail, dataBody.password]).then(r=>res.status(200));
}

export function regPoint(req, res){
    let body = req.body;
    let errors = validationResult(req);
    res.setHeader("Content-Type", "application/json");
    if(!errors.isEmpty()){return res.status(400).json({errors: errors.array()})}
    let telNumber = body.tel != "" ? body.tel:"NULL";
    let queryIns=`
    INSERT INTO cuentas (id, username, email, password, reg_date, telefono,imagen) 
    VALUES (NULL, ?, ?, ?, current_timestamp(), 
    ?, NULL)`
    mySQLConnection(queryIns, [body.username, body.email, body.pass, telNumber]).then(r=>res.status(200).json({errors: undefined}))
}