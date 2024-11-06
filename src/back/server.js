import * as mysql from "mysql2/promise";
import { mySQLConnection } from "./servMods/connection.js";
import { body, validationResult } from "express-validator";
import { readFile } from "fs";
import express from "express";
import cors from "cors";
import postNormals from "./servMods/endpoints/pagepoints.js";
import {join, dirname} from "path";
import { fileURLToPath } from "url";

export const __dirname = dirname(fileURLToPath(import.meta.url))
let app = express();
let publico = join(__dirname, "../public");
const proyect = join(__dirname, "../../");
const pages = join(proyect, "pages");
app.use( cors() )
app.use("/",express.static(join(pages, "index/dist")));
app.use(express.json());

console.log("rutas: ", pages);

const canAsistance=["prec", "adm"];
const userInfo={
    username: "elpepe",
    email: "pepe@gmail.com",
    pass: "1234%t&6eE",
}
app.use("/asistenter", (req, res, next)=>{
    //let userInfo = req.body.userinfo;
    const rutaIndex = join(pages, "asistenter/dist/index.html");
    if(userInfo){
        mySQLConnection("SELECT * FROM cuentas WHERE username=? AND email=? AND password=?", [userInfo.username, userInfo.email, userInfo.pass])
        .then(results=>{
            const user = results[0];
            
            if (canAsistance.includes(user.rol)){
                console.log("\n Ruta index: ", join(pages, "asistenter/dist"), `\n`);
                next()
            }
        })
    }else {console.log("No hay cuenta iniciada, que estas intentando? neandertal")};
}
);

app.use("/asistenter", express.static(join(pages, "asistenter/dist")));
//setListenerPages(app);

app.post("/asistenter", pageMiddles, (req, res)=>{
    res.setHeader("Content-Type", "text/html")
    res.sendFile(join(pages, "asistenter/dist/index.html"));
})


app.get("/", (req, res)=>{
    res.setHeader("Content-Type", "text/html")
    res.sendFile(join(pages,"index/dist/index.html"));
})

import { logMiddles, pageMiddles, registerMiddles } from "./servMods/endpoints/middles.js";
import { logPoint, regPoint } from "./servMods/endpoints/accountPoints.js";

app.post("/login-account", logMiddles,(req, res)=>logPoint(req, res));
app.post("/register-account",registerMiddles,(req, res)=>regPoint(req, res));

import { loadCourses, loadAlumns } from "./servMods/endpoints/loadPoints.js";
import { submitPresence } from "./servMods/endpoints/presencePoints.js";
import setListenerPages from "./servMods/endpoints/pagepoints.js";

app.post("/load-courses", (req, res)=>loadCourses(req, res))

app.post("/load-alumns", (req,res)=>loadAlumns(req, res))

app.post("/submit-presence",(req, res)=> submitPresence(req, res))

let PORT= process.env.PORT || 3001;
let HOSTNAME="127.0.0.1";
app.listen(PORT, HOSTNAME, (ERR)=>{
    if(ERR)throw ERR;
    console.log("Listening: http://"+HOSTNAME+":"+PORT);
})

