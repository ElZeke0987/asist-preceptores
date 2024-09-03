import * as mysql from "mysql2/promise";
import { mySQLConnection, vldExistence } from "./servMods/connection.js";
import { body, validationResult } from "express-validator";
import express from "express";
import { readFile } from "fs";
import {join, dirname} from "path";
import { error, time } from "console";
import { fileURLToPath } from "url";

let __dirname = dirname(fileURLToPath(import.meta.url))
let app = express();
let publico = join(__dirname, "../public");

app.use(express.static(publico));
app.use(express.json());

app.get("/", (req, res)=>{
    fs.readFile(join(publico, "index.html"), (err, page)=>{
        if(err)throw err;
        res.setHeader("Content-Type", "text/html")
        res.sendFile(page);
    })
})

app.post("/login-account",[
    body("userOEmail").notEmpty().withMessage("Usuario o email faltante"),
    body("password").notEmpty().withMessage("Campo de contraseña vacio")
],(req, res)=>{
    let dataBody = req.body;
    let errors = validationResult(req);
    res.setHeader("Content-Type", "application/json");
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    let queryLog = `
    SELECT * FROM cuenta 
    WHERE username = ?
    OR email = ? 
    AND password = ?`;
    mySQLConnection(queryLog, [dataBody.userOEmail, dataBody.userOEmail, dataBody.password])
})

app.post("/register-account",
    [
    body("username", "Username required").not().isEmpty(),
    body("email", "email is required").not().isEmpty(),
    body("email", "Write correctly the email").isEmail(),
    body("tel", "tel number is required").not().isEmpty(),
    body("pass", "Password required").not().isEmpty(),
    body("rPass", "Repeat password please").not().isEmpty(),
    body("rPass", "Both password fields will be the same").custom((value, { req })=>{
        if(value != req.body.pass){throw new Error("Passwords do not match");return false;}
        return true;
    }),
    body("username", "username already exists").custom(value=> {console.log("Verificacion de usuario existente: ",vldExistence("username", value))}),
    body("email", "email already exists").custom(value=>{console.log("Verificacion de email existente: ",vldExistence("email", value))}),
    ],
    (req, res)=>{
        let body = req.body;
        let errors = validationResult(req);
        res.setHeader("Content-Type", "application/json");
        if(!errors.isEmpty()){return res.status(400).json({errors: errors.array()})}
        let telNumber = body.tel != "" ? body.tel:"NULL";
        let queryIns=`
        INSERT INTO cuenta (id, username, email, password, reg_date, telefono,imagen) 
        VALUES (NULL, ?, ?, ?, current_timestamp(), 
        ?, NULL)`
        mySQLConnection(queryIns, [body.username, body.email, body.pass, telNumber])
})

import { loadCourses, loadAlumns } from "./servMods/endpoints/loadPoints.js";
import { submitPresence } from "./servMods/endpoints/presencePoints.js";

app.post("/load-courses", (req, res)=>loadCourses(req, res))

app.post("/load-alumns", (req,res)=>loadAlumns(req, res))

app.post("/submit-presence",(req, res)=> submitPresence(req, res))

let PORT=3000;
let HOSTNAME="127.0.0.1";
app.listen(PORT, HOSTNAME, (ERR)=>{
    if(ERR)throw ERR;
    console.log("Listening: http://"+HOSTNAME+":"+PORT);
})

