import fetchDataFromDB from "../utils/fetch";
import insertDataToDB from "../utils/insert";
import Show from "../components/show";
import { redirect } from "next/navigation"
import Link from "next/link"


export default async function Form() {
    //const productos = await fetchDataFromDB("select * from sede")
    const productos = [{id_producto: 1, nombre_producto: "a"}, {id_producto: 2, nombre_producto: "b"}]

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
                <h2>Ingrese datos de la Venta</h2>
                <div className="form-div">
                    <p>Ingrese Producto</p>
                    <select name="id_producto" id="id_producto" required>
                        <option value="" disabled selected hidden></option>
                        {productos.map((x) => (
                            <option value={x.id_producto}>{x.nombre_producto}</option>
                        ))}
                    </select>
                    <p>Cantidad</p>
                    <input required type="number" name='cantidad' id='cantidad' placeholder='Cantidad' />
                    <button>Añadir Producto</button>
                </div>
                
                <div className="div-buttons">
                    <button type="submit" className="form-button">Ingresar</button>
                    <Link href="/empleadoPage">
                        <button className="form-button">Volver</button>
                    </Link>
                </div>
            </form>
        </div>
    )
}