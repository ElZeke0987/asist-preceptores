export function obtenerInfoDays(anio, mes){
    const primerDiaDate = new Date(anio, mes, 1)
    const ultimoDiaDate = new Date(anio, mes, 0)

    /* Si el ultimo dia del mes es 31, es porque esa es la cantidad de dias */
    const cantDias = ultimoDiaDate.getDate();

    const primerDia = primerDiaDate.getDay();
    const ultimoDia = ultimoDiaDate.getDay();

    return({
        primerDia,
        ultimoDia,
        cantDias
    })    

}