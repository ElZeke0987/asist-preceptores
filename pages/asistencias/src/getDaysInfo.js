export function obtenerInfoDays(anio, mes){
    const primerDiaDate = new Date(anio, mes, 1)
    const ultimoDiaDate = new Date(anio, mes+1, 0)

    /* Si el ultimo dia del mes es 31, es porque esa es la cantidad de dias */
    const cantDias = ultimoDiaDate.getDate();

    const primerDia = primerDiaDate.getDay();//Dia de la semana en la que empieza el mes
    const ultimoDia = ultimoDiaDate.getUTCDate();//Ultimo dia del mes

    return({
        
        ultimoDia,
        cantDias,
        primerDia/*: primerDia==0?7:primerDia*/,
        idMes: mes,
    })    

}