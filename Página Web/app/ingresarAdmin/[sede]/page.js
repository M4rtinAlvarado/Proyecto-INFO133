import fetchDataFromDB from "../../utils/fetch";
import insertDataToDB from "../../utils/insert";
import { redirect } from "next/navigation"
import IngresarAdmin from "../../components/ingresarAdmin";


export default async function Form({ params, searchParams }) {
    const sede = params.sede
    const cargos = await fetchDataFromDB("select * from cargo")
    const productos = await fetchDataFromDB(`select * from producto p inner join instancia_producto ip on ip.id_producto = p.id_producto where id_sede = ${sede} order by p.id_producto`)



    async function addEmpleado(nombre, apellido, rut, cargo, sueldo, comision) {
        "use server"
        try {
            insertDataToDB(`INSERT INTO empleado (nombre, apellido, rut, id_cargo, id_sede, sueldo, comision) VALUES ('${nombre}', '${apellido}', '${rut}', ${cargo}, ${sede}, ${sueldo}, ${comision})`)
        }
        catch (err) {
            console.log(err)
        }
        redirect(`/ingresarAdmin/${sede}`)
    }

    async function addStock(producto, cantidad) {
        "use server"
        try {
            let aux3 = await fetchDataFromDB(`select * from instancia_producto ip where ip.id_sede = ${sede} and ip.id_producto = ${producto}`)
            const id_instancia_producto = parseInt(aux3[0].id_instancia_producto)
            const stock = parseInt(aux3[0].stock) + cantidad
            insertDataToDB(`update instancia_producto set stock = ${stock} where id_instancia_producto = ${id_instancia_producto}`)
            console.log("aaa")
        }
        catch (err) {
            console.log(err)
        }
        redirect(`/ingresarAdmin/${sede}`)
    }

    return (
        <div className="fondo3">
            <div className="form-div-1">
                <IngresarAdmin addEmpleado={addEmpleado} addStock={addStock} cargos={cargos} sede={sede} productos={productos} />
            </div>
        </div>
    )
}