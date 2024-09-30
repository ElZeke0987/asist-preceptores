import Params from "./molecules/Params"
import { requestToPostInform } from "./molecules/mods/Reqs"

export default function AsistenterPage(){
    return(
        <>
            <Params/>
            <div className="alumn-list">
                <div className='list'>

                </div>
                <div className="submit-presence">
                    <button onClick={requestToPostInform}>Enviar informe</button>
                </div>
            </div>
        </>
    )
}