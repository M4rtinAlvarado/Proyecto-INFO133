import fetchDataFromDB from "../../utils/fetch";
import insertDataToDB from "../../utils/insert";
import Show from "../../components/show";
import { redirect } from "next/navigation"
import Link from "next/link"
import { background } from "@chakra-ui/react";
import IngresarCita from "../../components/ingresarCita";


export default async function Form({params, searchParams}) {
    //const comunas = await fetchDataFromDB("select * from comuna")
    //const empleados = await fetchDataFromDB("select * from empleado where id_cargo !=  AND id_sede = ")
    //const servicios = await fetchDataFromDB("select * from servicio s")
    //const clientes = await fetchDataFromDB("select * from cliente")
    const sede = params.sede
    const empleados = [{id_empleado: 1, nombre:"Juan", apellido: "Perez"}, {id_empleado: 2, nombre:"Juan", apellido: "Salgado"}]
    const servicios = [{id_servicio: 1, nombre: "Corte de pelo"}, {id_servicio: 2, nombre: "Barba"}]
    const horarios = [{id_horario: 1, horario: "1 a 2"}, {id_horario: 2, horario: "2 a 3"}]
    const comunas = [{id_comuna: 1, nombre_comuna: "Valdivia"}, {id_comuna: 2, nombre_comuna: "Mafil"}]
    const clientes = [{rut_cliente: 1}, {rut_cliente:2}, {rut_cliente:3}]

    async function insertCita(data) {
        "use server"
        let id_sede = data.id_sede
        let id_empleado = data.id_empleado
        let id_servicio = data.id_servicio
        let id_horario = data.id_horario
        let rut_cliente = data.rut_cliente
        console.log(id_sede, id_empleado, id_servicio, id_horario, rut_cliente)
        try {
            //insertDataToDB(`INSERT INTO tienda (id_tienda, id_comuna, nombre) VALUES (${id_tienda}, ${id_comuna}, '${nombre}')`)
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
        console.log(nombre, apellido, comuna, sexo, rut)
        try {
            //insertDataToDB(`INSERT INTO cliente (nombre_cliente, apellido_cliente, rut_cliente, sexo, id_comuna) VALUES ('${nombre}', '${apellido}', ${rut}, ${comuna}, ${sexo})`)

            //const clientes = await fetchDataFromDB("select * from cliente")
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