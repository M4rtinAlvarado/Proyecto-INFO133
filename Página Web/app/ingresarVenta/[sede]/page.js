import fetchDataFromDB from "../../utils/fetch";
import insertDataToDB from "../../utils/insert";
import { redirect } from "next/navigation"
import IngresarVenta from "../../components/ingresarVenta";


export default async function Form({params, useSearchParams}) {
    const sede = params.sede
    const productos = await fetchDataFromDB(`select * from producto p inner join sede_producto sd on p.id_producto = sd.id_producto where sd.id_sede = ${sede} and sd.stock > 0 `)
    let date = new Date().toJSON().slice(0, 10)

    async function addData(seleccion) {
        "use server"
        var total = 0
        for(const i of seleccion){
            total += productos[i.id_producto - 1].precio_compra * i.cantidad
        }
        
        
        
        try {
            insertDataToDB(`insert into pago (fecha, monto, estado) values ('${date}', ${total})`)
            let aux = await fetchDataFromDB('select count(*) from pago')
            const id_pago = parseInt(aux[0].count)
            console.log(id_pago)
            insertDataToDB(`INSERT INTO venta (fecha, total, id_pago) VALUES ('${date}', ${total}, ${id_pago})`)
            let aux2 = await fetchDataFromDB('select count(*) from venta')
            const id_venta = parseInt(aux2[0].count)
            console.log(id_venta)
            aux2 = await fetchDataFromDB('select count(*) from venta')
            const id_venta2 = parseInt(aux2[0].count)
            console.log(id_venta2)
            for(const i of seleccion){
                insertDataToDB(`INSERT INTO venta_producto (id_venta, id_producto, cantidad) VALUES (${id_venta2}, ${i.id_producto}, ${i.cantidad})`)
            }
            //actualizar sd.stock
        }
        catch (err) {
            console.log(err)
        }
        redirect(`/ingresarVenta/${sede}`)
    }

    return (
        <div className="form-div">
            <IngresarVenta addData={addData} productos={productos} sede={sede}/>
        </div>
    )
}