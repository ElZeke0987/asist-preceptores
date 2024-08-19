const mysql = require("mysql");

let conn = mysql.createConnection({
    host: "127.0.0.1",
    database: "escuela",
    user: "root",
    password: ""
})

const { body, validationResult } = require("express-validator");

const express = require("express");
const fs = require("fs");
const path = require("path");
const { error } = require("console");

let app = express();
let public = path.join(__dirname, "public");

app.use(express.static(public));
app.use(express.json());


app.get("/", (req, res)=>{
    fs.readFile(path.join(public, "index.html"), (err, page)=>{
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
        return res.status(400).json({error: errors.array()});
    }
    res.send({
        msg: "Inicio de sesion exitoso"
    })
})

app.post("/register-acount",[
    body("username", "Username required").not().isEmpty(),
    body("email", "An email is required").not().isEmpty().isEmail(),
    body("pass", "Password required").not().isEmpty(),
    body("rPass", "Repeat password please").not().isEmpty(),
    body("rPass", "Both password fields will be the same").custom((value, { req })=>{
        if(value != req.body.pass){
            throw new Error("Passwords do not match");
            return false;
        }
        return true;
    })
],
(req, res)=>{
    let errors = validationResult(req);
    res.setHeader("Content-Type", "application/json");
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()});
    }
    res.send({
        msg: "Registro exitoso"
    })
    
})

let PORT=3000;
let HOSTNAME="127.0.0.1";
app.listen(PORT, HOSTNAME, (ERR)=>{
    if(ERR)throw ERR;
    console.log("Listening: http://"+HOSTNAME+":"+PORT);
})