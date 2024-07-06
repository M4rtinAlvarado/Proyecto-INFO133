import fetchDataFromDB from "../utils/fetch";
import insertDataToDB from "../utils/insert";
import Show from "../components/show";
import { redirect } from "next/navigation"
import Link from "next/link"


export default async function Form() {
    //const sedes = await fetchDataFromDB("select * from sede")
    //const empleados = await fetchDataFromDB("select * from empleado where id_cargo !=  AND id_sede = ")
    //const servicios = await fetchDataFromDB("select * from servicio s")
    const sedes = [{id_sede: 1, nombre_sede: "a"}, {id_sede: 2, nombre_sede: "b"}]
    const empleados = []
    const servicios = []
    const horarios = []

    async function insertData(data) {
        "use server"
        let id_sede = data.get("id_sede")?.valueOf()
        let id_empleado = data.get("id_empleado")?.valueOf()
        let id_servicio = data.get("id_servicio")?.valueOf()
        try {
            insertDataToDB(`INSERT INTO tienda (id_tienda, id_comuna, nombre) VALUES (${id_tienda}, ${id_comuna}, '${nombre}')`)
        }
        catch (err) {
            console.log(err)
        }
        redirect('/ingresarCita')
    }

    return (
        <div>
            <form action={insertData} className="form">
                <h2>Ingrese datos de la cita</h2>
                <div className="form-div">
                    <p>Sede</p>
                    <select name="id_sede" id="id_sede" required>
                        <option value="" disabled selected hidden></option>
                        {sedes.map((x) => (
                            <option value={x.id_sede}>{x.nombre_sede}</option>
                        ))}
                    </select>

                    <p>Empleado</p>
                    <select name="id_empleado" id="id_empleado" required>
                        <option value="" disabled selected hidden></option>
                        {empleados.map((x) => (
                            <option value={x.id_empleado}>{x.nombre} {x.apellido}</option>
                        ))}
                    </select>

                    <p>Servicio</p>
                    <select name="id_servicio" id="id_servicio" required>
                        <option value="" disabled selected hidden></option>
                        {servicios.map((x) => (
                            <option value={x.id_servicio}>{x.nombre}</option>
                        ))}
                    </select>

                    <p>Horario</p>
                    <select name="id_horario" id="id_horario" required>
                        <option value="" disabled selected hidden></option>
                        {horarios.map((x) => (
                            <option value={x.id_horario}>{x.horario}</option>
                        ))}
                    </select>

                    <div className="form-div-cliente">
                        <h3>Ingrese datos del Cliente</h3>
                        <p>Nombre</p>
                        <input required type="text" name='nombre_cliente' id='nombre_cliente' placeholder='Nombre' />
                        <p>Apellido</p>
                        <input required type="text" name='apellido_cliente' id='apellido_cliente' placeholder='Apellido' />
                        <p>Rut</p>
                        <input required type="number" name='rut_cliente' id='rut_cliente' placeholder='Rut' />
                        
                        <input required type="time" name='nombre' id='nombre' placeholder='nombre' />
                    </div>
                </div>
                
                <div className="div-buttons">
                    <Link href="/empleadoPage">
                        <button className="form-button">Volver</button>
                    </Link>
                    <button type="submit" className="form-button">Ingresar</button>
                </div>
            </form>
        </div>
    )
}