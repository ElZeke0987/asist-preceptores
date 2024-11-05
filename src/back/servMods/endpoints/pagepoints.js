import {join, dirname} from "path";
import { fileURLToPath } from "url";
import { readdir, readFile, stat} from "fs";
import { join } from "path";
import express from "express";
import { pageMiddles } from "./middles";
import { mySQLConnection } from "../connection";

const __dirname = dirname(fileURLToPath(import.meta.url))
let publico = join(__dirname, "../public");

let pageNoUsed=["login", "", "register"];
const canAsistance=["prec", "adm"];

export default function setListenerPages(app){
    const baseDir="D:\@ARCHIVOS_USUARIO@\Desktop\Paginas de practica\Asistente para preces\as-pr-v0.6\asist-preceptores\pages";
    readdir(baseDir, (err, fls)=>{
        if(err){
            console.log("Ocurrio un error: ", err);
            return
        }
        fls.forEach(page=>{
            console.log("page dir ", page);
            const rutaPublic = join(baseDir, page, "public");
            const rutaIndex = join(rutaPublic, "index.html");

            app.use(express.static(rutaPublic));

            if(pageNoUsed.includes(page)){
                app.get(`/${page}`, pageMiddles, (req, res)=>{
                    res.setHeader("Content-Type", "text/html")
                    res.sendFile(rutaIndex);
                })
                return
            }
            app.post(`/${page}`, pageMiddles,(req, res)=>{
                const userInfo = req.body.userInfo
                if(userInfo){
                    mySQLConnection("SELECT * FROM cuentas WHERE username=? AND email=? AND password=?", [userInfo.username, userInfo.email, userInfo.pass]).then(results=>{
                        const user = results[0];
                        console.log("Verificando si es posible que tu cuenta tome asistencia");
                        if (page=="asistenter" && canAsistance.includes(user.rol)){
                            res.setHeader("Content-Type", "text/html")
                            res.sendFile(rutaIndex);
                            return
                        }
                    })
                    return
                }
                console.log("No hay cuenta iniciada, que estas intentando? neandertal");
            })
        })
    })
/*
    pageArr.forEach(page => {
        app.get(page.url, (req, res)=>{
            res.setHeader("Content-Type", "text/html")
            res.sendFile(join(publico, page.dir));
        })
    });*/
}
