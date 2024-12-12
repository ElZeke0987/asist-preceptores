export default function ResultUser({alumnItem, type="account"}){
    return(
        <div className={"result-item result-"+type}>
            username: {alumnItem.username||alumnItem.cuenta_id}
        </div>
    )
}