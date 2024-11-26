import * as mysql from "mysql2/promise";
import { mySQLConnection } from "./servMods/connection.js";
import { body, validationResult } from "express-validator";
import express from "express";
import cors from "cors";
import {join, dirname} from "path";
import { fileURLToPath } from "url";

export const __dirname = dirname(fileURLToPath(import.meta.url))
let app = express();
let publico = join(__dirname, "../public");
const proyect = join(__dirname, "../../");
const pages = join(proyect, "pages");

app.use( cors() )
app.use(express.json());

const canAsistance=["prec", "adm"];

function middleRole(req, res, next){
    let userInfo = req.body.userinfo;
    const rutaIndex = join(pages, "asistenter/dist/index.html");
    if(userInfo){
        mySQLConnection("SELECT * FROM cuentas WHERE username=? AND email=? AND password=?", [userInfo.username, userInfo.email, userInfo.pass])
        .then(results=>{
            const user = results[0];
            if (canAsistance.includes(user.rol)){
                console.log("\n url enviada: ", req.path, `\n`);
                next();
                return
            }
            res.status(403).send("acceso no autorizado");
            next()
        })
    }else {console.log("\n url no enviada: ", req.path, `\n`); next()};
}

app.use("/asistenter", (req, res, next)=>{
    middleRole(req, res, next);
});

app.get("/", (req, res)=>{
    res.setHeader("Content-Type", "text/html")
    res.sendFile(join(pages,"index/dist/index.html"));
})

app.get("/asist-get", (req, res)=>{
    res.redirect("/asistenter");
})

app.post("/asistenter", pageMiddles, (req, res)=>{
    res.setHeader("Content-Type", "text/html");
    res.sendFile(join(pages, "asistenter/dist/index.html"));
})

app.post("/login", pageMiddles, (req, res)=>{
    res.setHeader("Content-Type", "text/html");
    res.sendFile(join(pages, "login/dist/index.html"));
})

app.post("/register", pageMiddles, (req, res)=>{
    res.setHeader("Content-Type", "text/html");
    res.sendFile(join(pages, "register/dist/index.html"));
})


app.use("/",express.static(join(pages, "/index/dist")));

app.use("/asistenter",express.static(join(pages, "/asistenter/dist")));

app.use("/login", express.static(join(pages, "/login/dist")));
app.use("/register", express.static(join(pages, "/register/dist")));


import { logMiddles, pageMiddles, registerMiddles } from "./servMods/endpoints/middles.js";
import { logPoint, regPoint } from "./servMods/endpoints/accountPoints.js";

app.post("/login-account", logMiddles,(req, res)=>logPoint(req, res));
app.post("/register-account",registerMiddles,(req, res)=>regPoint(req, res));

import { loadCourses, loadAlumns } from "./servMods/endpoints/loadPoints.js";
import { submitPresence } from "./servMods/endpoints/presencePoints.js";

app.post("/load-courses", (req, res)=>loadCourses(req, res))

app.post("/load-alumns", (req,res)=>loadAlumns(req, res))

app.post("/submit-presence",(req, res)=> submitPresence(req, res))

let PORT= process.env.PORT || 3001;
let HOSTNAME="127.0.0.1";
app.listen(PORT, HOSTNAME, (ERR)=>{
    if(ERR)throw ERR;
    console.log("Listening: http://"+HOSTNAME+":"+PORT);
})

