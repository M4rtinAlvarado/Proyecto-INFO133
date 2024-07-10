
import fetchDataFromDB from "./utils/fetch"
import Main from "./components/main"


export default async function Home() {
  const sedes = await fetchDataFromDB("select * from sede")
  
  return(
    <Main sedes={sedes}/>
  )
}