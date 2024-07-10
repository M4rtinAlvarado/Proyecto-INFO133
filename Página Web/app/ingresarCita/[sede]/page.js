import fetchDataFromDB from "../../utils/fetch";
import insertDataToDB from "../../utils/insert";
import Show from "../../components/show";
import { redirect } from "next/navigation"
import Link from "next/link"
import { background } from "@chakra-ui/react";
import IngresarCita from "../../components/ingresarCita";


export default async function Form({params, searchParams}) {
    const sede = params.sede
    const comunas = await fetchDataFromDB("select * from comuna")
    const empleados = await fetchDataFromDB(`select id_empleado, nombre, apellido from empleado where id_sede = ${sede}`)
    const servicios = await fetchDataFromDB("select * from servicio")
    const clientes = await fetchDataFromDB("select * from cliente")
    const horarios = await fetchDataFromDB("select * from horario")

    async function insertCita(data) {
        "use server"
        let id_empleado = data.id_empleado
        let id_servicio = data.id_servicio
        let id_horario = data.id_horario
        let rut_cliente = data.rut_cliente
        let fecha = data.fecha
        let estado = 1
        try {
            let aux = await fetchDataFromDB(`select id_cliente from cliente where rut_cliente = '${rut_cliente}' `)
            const id_cliente = parseInt(aux[0].id_cliente)

            insertDataToDB(`INSERT INTO cita (fecha, id_horario, estado, id_cliente, id_servicio, id_empleado, id_pago) VALUES ('${fecha}', ${id_horario}, ${estado}, ${id_cliente}, ${id_servicio}, ${id_empleado}, NULL)`)
        }
        catch (err) {
            console.log(err)
        }
        redirect(`/ingresarCita/${sede}`)

    }

    async function insertCliente(data) {
        "use server"
        let nombre = data.nombre
        let apellido = data.apellido
        let comuna = data.comuna
        let sexo = data.sexo
        let rut = data.rut
        try {
            insertDataToDB(`INSERT INTO cliente (nombre_cliente, apellido_cliente, rut_cliente, id_sexo, id_comuna) VALUES ('${nombre}', '${apellido}', '${rut}', ${sexo}, ${comuna})`)
        }
        catch (err) {
            console.log(err)
        }
        redirect(`/ingresarCita/${sede}`)

    }

    async function fetchData(query){
        "use server"
        let aux = await fetchDataFromDB(query)
        return aux
    }

    return (
        <div className="form-div">
            <IngresarCita insertCita={insertCita} insertCliente={insertCliente} sede={sede} empleados={empleados} servicios={servicios} horarios={horarios} comunas={comunas} clientes = {clientes} fetchData={fetchData}/>
        </div>
    )
}