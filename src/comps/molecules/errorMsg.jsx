export default function ErrorMsg({msg="Error in this input",  onXClick}){
    return  <div>
                <div className={`error-msg-cont err`}>
                    <div className="err-text">{msg}</div>
                    <div className="err-q" onClick={e=>onXClick(e)}>X</div>
                </div>
            </div>
}