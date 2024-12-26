import { useEffect } from "react"

export function alumnIdSelEff(alumnsLoadFinal, setAlumnObjSel, alumnIdSel){//La lista final despues de todos los filtros, seria la de los grupos
//Hay que probar si dejar que sea en la lista pequeña y filtrada es buena opcion o si usar la lista total de alumnos para buscar al mismo, buscar cual es mas propensa a errores
    alumnsLoadFinal.forEach((v, i)=>{//Cuando se elija un alumno
        if(v.id==alumnIdSel.id){
            setAlumnObjSel(
            {
                id: v.id,
                nom_comp: v.nom_comp,
                nombre: v.nombre,
                apellido: v.apellido,
                dni: v.dni,
                grupo_tal: v.grupo_tal,
                cuenta_id: v.cuenta_id,
                inasistencias: v.inasistencias,
                inas_tal: v.inas_tal,
                inas_aula: v.inas_aula,
                inas_preh: v.inas_preh,
                inas_fis: v.inas_fis,
            })
        }
    })
}

//El filtro se aplica aca, cada vez que se va cambiando el curso
export function courseIdSelEff(data, courseIdSel, setAlumnsLoadCourse, alumnsLoadCourse){
    data?.alumnList.forEach(async (v, i)=>{//alumnosList se carga una vez
        if(v.curso_id==courseIdSel.id){
            const objToPush={
                id: v.id,
                nom_comp: v.nom_comp,
                nombre: v.nombre,
                apellido: v.apellido,
                dni: v.dni,
                grupo_tal: v.grupo_tal,
                cuenta_id: v.cuenta_id,
                inasistencias: v.inasistencias,
                inas_tal: v.inas_tal,
                inas_aula: v.inas_aula,
                inas_preh: v.inas_preh,
                inas_fis: v.inas_fis,
            };
            await setAlumnsLoadCourse([...alumnsLoadCourse, objToPush])//Se desestructura el array para crear uno nuevo con el nuevo objeto
            
            return
        }
        
    })
    
}

//El segundo filtro, para los grupos de taller y esas cosas, se puede aplicar sobre los alumnos ya filtrados de curso
export function grpIdSelEff(grp, alumnsLoadCourse, alumnsLoadGrp, setAlumnsLoadGrp){
    alumnsLoadCourse.forEach(async v => {
        if(grp=="all"||grp==undefined){
            await setAlumnsLoadGrp(alumnsLoadCourse)
            return
        }
        if(v.grupo_tal===grp){
            const objToAdd={
                id: v.id,
                nom_comp: v.nom_comp,
                nombre: v.nombre,
                apellido: v.apellido,
                dni: v.dni,
                grupo_tal: v.grupo_tal,
                cuenta_id: v.cuenta_id,
                inasistencias: v.inasistencias,
                inas_tal: v.inas_tal,
                inas_aula: v.inas_aula,
                inas_preh: v.inas_preh,
                inas_fis: v.inas_fis,
            };
            await setAlumnsLoadGrp([...alumnsLoadGrp, objToAdd]);
        }
    });
}