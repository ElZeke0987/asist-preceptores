import * as mysql from "mysql2/promise";
import { mySQLConnection } from "./servMods/connection.js";
import { body, validationResult } from "express-validator";
import express from "express";
import { readFile } from "fs";
import {join, dirname} from "path";
import { fileURLToPath } from "url";

export const __dirname = dirname(fileURLToPath(import.meta.url))
let app = express();
let publico = join(__dirname, "../public");

app.use(express.static(publico));
app.use(express.json());
app.use( cors )

app.get("/", (req, res)=>{
    fs.readFile(join(publico, "index.html"), (err, page)=>{
        if(err)throw err;
        res.setHeader("Content-Type", "text/html")
        res.sendFile(page);
    })
})
import { logMiddles, registerMiddles } from "./servMods/endpoints/middles.js";
import { logPoint, regPoint } from "./servMods/endpoints/accountPoints.js";

app.post("/login-account", logMiddles,(req, res)=>logPoint(req, res));
app.post("/register-account",registerMiddles,(req, res)=>regPoint(req, res));

import { loadCourses, loadAlumns } from "./servMods/endpoints/loadPoints.js";
import { submitPresence } from "./servMods/endpoints/presencePoints.js";

app.post("/load-courses", (req, res)=>loadCourses(req, res))

app.post("/load-alumns", (req,res)=>loadAlumns(req, res))

app.post("/submit-presence",(req, res)=> submitPresence(req, res))

let PORT= process.env.PORT || 3000;
let HOSTNAME="127.0.0.1";
app.listen(PORT, HOSTNAME, (ERR)=>{
    if(ERR)throw ERR;
    console.log("Listening: http://"+HOSTNAME+":"+PORT);
})

