import fetchDataFromDB from "../utils/fetch"


export default async function Show() {
    const data = await fetchDataFromDB("select * from tienda")
    return (
        <div>
            {data.map((x) => (
                <h1>{x.id_tienda} {x.nombre}</h1>
            ))}
        </div>
    )
}