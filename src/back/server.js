import * as mysql from "mysql2/promise";
import { mySQLConnection } from "./servMods/connection.js";
import { body, validationResult } from "express-validator";
import express from "express";
import cors from "cors";
import {join, dirname} from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import { verifyPermisions } from "./servMods/extraMods.js";

export const __dirname = dirname(fileURLToPath(import.meta.url))
let app = express();
let publico = join(__dirname, "../public");
const proyect = join(__dirname, "../../");
const pages = join(proyect, "pages");

app.use(cors())
app.use(express.json());
app.use(cookieParser());

const canAsistance=["prec", "adm"];

async function middleRole(req, res, next){
    let cookie = await getAuthCookies(req);
    let userInfo = cookie.decd
    const rutaIndex = join(pages, "asistenter/dist/index.html");
    if(userInfo){
        verifyPermisions(canAsistance, req, res, userInfo, {next})
    }else { next()};
}


app.use("/asistenter", (req, res, next)=>middleRole(req, res, next));
app.use("/role-setter", (req, res, next)=>middleRole(req, res, next));
app.use("/set-role", (req, res, next)=>middleRole(req, res, next));

app.get("/", (req, res)=>{
    res.setHeader("Content-Type", "text/html")
    res.sendFile(join(pages,"index/dist/index.html"));
})

app.get("/asist-get", (req, res)=>{
    res.redirect("/asistenter");
})

app.post("/asistenter", pageMiddles, (req, res)=>{//Verificacion de roles ya hecha en el middleRole
    res.setHeader("Content-Type", "text/html");
    res.sendFile(join(pages, "asistenter/dist/index.html"));
})

app.post("/asistencias", (req, res)=>{
    console.log("")
    res.setHeader("Content-Type", "text/html");
    res.sendFile(join(pages, "asistencias/dist/index.html"));
})

app.post("/login", pageMiddles, (req, res)=>{
    res.setHeader("Content-Type", "text/html");
    res.sendFile(join(pages, "login/dist/index.html"));
})

app.post("/register", pageMiddles, (req, res)=>{
    res.setHeader("Content-Type", "text/nhtml");
    res.sendFile(join(pages, "register/dist/index.html"));
})

app.get("/account", pageMiddles, async (req, res)=>{
    const auth = await getAuthCookies(req);
    if(auth.r==false){
        res.redirect("/");
        return
    }
    
    if(auth.decd.use == undefined){
        console.log("there is no user registered in cookie");
        res.redirect("/");
        return
    }
    res.setHeader("Content-Type", "text/html");
    res.sendFile(join(pages, "account/dist/index.html"));
    
})

app.post("/role-setter", async (req, res)=>{
    const auth = await getAuthCookies(req);
    if(auth.decd.rol!="adm"||auth.decd.rol!="prec"){
        res.status(401).json({msg: "access unauthorized"});
        return;
    }
    res.setHeader("Content-Type", "text/html");
    res.sendFile(join(pages, "role-setter/dist/index.html"));
})


app.use("/",express.static(join(pages, "/index/dist")));
app.use("/asistenter", express.static(join(pages, "/asistenter/dist")));
app.use("/asistencias", express.static(join(pages, "/asistencias/dist")))
app.use("/login", express.static(join(pages, "/login/dist")));
app.use("/register", express.static(join(pages, "/register/dist")));
app.use("/account", express.static(join(pages, "/account/dist")));
app.use("/role-setter", express.static(join(pages, "/role-setter/dist")));


import { logMiddles, pageMiddles, registerMiddles } from "./servMods/endpoints/middles.js";
import { logPoint, regPoint } from "./servMods/endpoints/accountPoints.js";

app.post("/login-account", logMiddles,(req, res)=>logPoint(req, res));

app.post("/register-account",registerMiddles,(req, res)=>regPoint(req, res));

import { loadCourses, loadAlumns, loadAccountsRoSe, loadPetitionsRoSe, loadCoursesAsistencias, loadAsistencias } from "./servMods/endpoints/loadPoints.js";
import { submitPresence } from "./servMods/endpoints/presencePoints.js";
import { readAuthCookies, clearAuthCookie, getAuthCookies } from "./servMods/endpoints/cookiePoints.js";
import { setRole } from "./servMods/endpoints/settersRoles.js";
import { delPetition, setPetition, verifyPetition } from "./servMods/endpoints/setterPetitions.js";


app.get("/read-auth", (req, res)=>readAuthCookies(req, res));

app.get("/clear-auth", (req, res)=>clearAuthCookie(req, res));

app.post("/load-courses", (req, res)=>loadCourses(req, res));

app.post("/load-alumns", (req,res)=>loadAlumns(req, res));

app.post("/submit-presence",(req, res)=> submitPresence(req, res));

app.post("/load-to-set-roles", (req, res)=>req.body.type=="account"?loadAccountsRoSe(req, res): loadPetitionsRoSe(req, res))

app.post("/set-petition", (req, res)=>setPetition(req, res))

app.get("/verify-petition", (req, res)=>verifyPetition(req, res))

app.post("/set-role", (req, res)=>setRole(req, res))

app.post("/del-petition", (req, res)=>delPetition(req.body.petiId, req, res))

app.post("/load-courses-asistencias", (req, res)=>loadCoursesAsistencias(req, res));

app.post("/load-asistencias", (req, res)=>loadAsistencias(req, res))

let PORT= process.env.PORT || 3001;
let HOSTNAME="127.0.0.1";
app.listen(PORT, HOSTNAME, (ERR)=>{
    if(ERR)throw ERR;
    console.log("Listening: http://"+HOSTNAME+":"+PORT);
})

