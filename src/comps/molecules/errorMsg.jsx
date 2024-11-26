export default function ErrorMsg({msg="Error in this input", obj, defClass, onXClick}){
    return <div className={`error-msg-cont err ${defClass}`}>
                <div className="err-text">{obj?"Error in "+obj: msg}</div>
                <div className="err-q" onClick={e=>onXClick(e)}>X</div>
            </div>
}