import fetchDataFromDB from "../../utils/fetch";
import insertDataToDB from "../../utils/insert";
import { redirect } from "next/navigation"
import IngresarVenta from "../../components/ingresarVenta";


export default async function Form({params, useSearchParams}) {
    const sede = params.sede
    const productos = await fetchDataFromDB(`select * from producto p inner join instancia_producto ip on p.id_producto = ip.id_producto where ip.id_sede = ${sede} and ip.stock > 0 order by p.id_producto `)
    let date = new Date().toJSON().slice(0, 10)

    async function addData(seleccion) {
        "use server"
        var total = 0
        for(const i of seleccion){
            total += productos[i.id_producto - 1].precio_compra * i.cantidad
        }
        
        
        
        try {
            //crea pago
            insertDataToDB(`insert into pago (fecha, monto) values ('${date}', ${total})`)
            let aux = await fetchDataFromDB('select count(*) from pago')
            const id_pago = parseInt(aux[0].count)
            console.log(id_pago)
            //crea venta
            insertDataToDB(`INSERT INTO venta (fecha, total, id_pago) VALUES ('${date}', ${total}, ${id_pago})`)
            let aux2 = await fetchDataFromDB('select count(*) from venta')
            const id_venta = parseInt(aux2[0].count)
            console.log(id_venta)
            aux2 = await fetchDataFromDB('select count(*) from venta')
            const id_venta2 = parseInt(aux2[0].count)
            console.log(id_venta2)
            for(const i of seleccion){
                let aux3 = await fetchDataFromDB(`select * from instancia_producto ip where ip.id_sede = ${sede} and ip.id_producto = ${i.id_producto}`)
                console.log(aux3)
                const id_instancia_producto = parseInt(aux3[0].id_instancia_producto)
                //crea venta-producto
                insertDataToDB(`INSERT INTO venta_producto (id_venta, id_instancia_producto, cantidad) VALUES (${id_venta2}, ${id_instancia_producto}, ${i.cantidad})`)
                const stock = parseInt(aux3[0].stock) - i.cantidad
                console.log("aa")
                //actualiza stock
                insertDataToDB(`update instancia_producto set stock = ${stock} where id_instancia_producto = ${id_instancia_producto}`)
                console.log("aaa")
            }
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