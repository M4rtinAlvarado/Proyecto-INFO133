import fetchDataFromDB from "../../utils/fetch";
import insertDataToDB from "../../utils/insert";
import { redirect } from "next/navigation"
import IngresarAdmin from "../../components/ingresarAdmin";


export default async function Form({params, searchParams}) {
    //const cargos = await fetchDataFromDB("select * from cargo")
    //const productos = await fetchDataFromDB("select * from producto")
    const cargos = [{ id_cargo: 1, nombre: "Cajero"}, { id_cargo: 2, nombre: "Peluquero"}]
    const productos = [{ id_producto: 1, nombre_producto: "a" , precio_compra:2000}, { id_producto: 2, nombre_producto: "b" , precio_compra: 2004}]
    const sede = params.sede



    async function addEmpleado(nombre, apellido, rut, cargo, sueldo, comision) {
        "use server"
        try {
            //insertDataToDB(`INSERT INTO venta (id_tienda, id_comuna, nombre) VALUES (${i}, ${j}, '${k}')`)
        }
        catch (err) {
            console.log(err)
        }
        redirect(`/ingresarAdmin/${sede}`)
    }

    async function addStock(producto, cantidad) {
        "use server"
        try {
            //insertDataToDB(`INSERT INTO venta (id_tienda, id_comuna, nombre) VALUES (${i}, ${j}, '${k}')`)
        }
        catch (err) {
            console.log(err)
        }
        redirect(`/ingresarAdmin/${sede}`)
    }

    return (
        <div className="form-div">
            <IngresarAdmin addEmpleado={addEmpleado} addStock={addStock} cargos={cargos} sede={sede} productos={productos}/>
        </div>
    )
}