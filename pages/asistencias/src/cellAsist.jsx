export default function CellAsist({actualDateId, day, ind, listAsistencias}){
    return(
        <div className={'cal-day '+day.toLowerCase()} key={ind}>        
            <h3>{day}</h3>
            <div className='day-col'>
                {
                    listAsistencias.map((asist, i)=>{
                        console.log("Rendering asistences")
                        if(!asist){return}
                        console.log("asist ", asist)
                        if(asist.mes==actualDateId&&asist.dia==ind+1){
                            return(
                            <div className={`asist-day ${asist.presencia==1?"asist-pres":"asist-inas"}`} key={i}>
                                {asist.presencia==1?"Pres":"Inas"}
                            </div>
                            )
                        }
                    
                    })
                }
            </div>
        </div>
    )
}