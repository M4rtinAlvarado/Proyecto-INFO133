import fetchDataFromDB from "../utils/fetch"


export default async function Show() {
    const data = await fetchDataFromDB("select count(*) from producto")
    console.log(data)
    return (
        <div>
            {data[0].count}
        </div>
    )
}