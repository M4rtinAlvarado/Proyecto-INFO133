import fetchDataFromDB from "../../utils/fetch";
import insertDataToDB from "../../utils/insert";
import { redirect } from "next/navigation"
import IngresarPago from "../../components/ingresarPago";


export default async function Form({params, useSearchParams}) {
    const sede = params.sede
    const citas = []

    async function addPago(id_cita, fecha) {
        "use server"
        try {
            let aux = await fetchDataFromDB(`select * from servicio s inner join cita c on c.id_servicio = s.id_servicio where id_cita = ${id_cita}`)
            const total = parseInt(aux[0].precio_servicio)
            insertDataToDB(`insert into pago (fecha, monto) values ('${fecha}', ${total})`)
            let aux2 = await fetchDataFromDB('select count(*) from pago')
            const id_pago = parseInt(aux2[0].count)
            aux2 = await fetchDataFromDB('select count(*) from pago')
            const id_pago2 = parseInt(aux2[0].count)
            console.log(id_pago2)
            insertDataToDB(`update cita set id_pago = ${id_pago2} where id_cita = ${id_cita}`)
           
        }
        catch (err) {
            console.log(err)
        }
        redirect(`/ingresarPago/${sede}`)
    }

    async function fetchData(query){
        "use server"
        let aux = await fetchDataFromDB(query)
        return aux
    }

    return (
        <div className="fondo2">
            <div className="form-div">
                <IngresarPago addPago={addPago} fetchData = {fetchData} citas = {citas} sede={sede}/>
            </div>
        </div>
    )
}