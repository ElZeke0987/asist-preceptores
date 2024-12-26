export default function MultiOpt({actualValue, shouldBe=true, checkedClass="checked-opt", onClickHandle, elementId, nameInp, typeInp, labelText, clases}){
    //ShouldBe es lo que deberia ser, para estar chekced
    //Este es un manejador para los estados de la seleccion entre diversas cosas
    return(
        <div className={clases+actualValue==shouldBe?checkedClass:""} id={elementId||actualValue} onClick={onClickHandle}>
                            
            <input type={typeInp} name={nameInp} checked={actualValue==shouldBe} /> 
            <label>
                {labelText}
            </label>

        </div>
    )
}