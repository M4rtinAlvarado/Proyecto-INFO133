"use client"
import Form from "./components/form"
import {useState} from "react"
import { Button } from '@chakra-ui/react'
import Link from "next/link"


export default function Home() {
  const [data, setData] = useState()

  const funcionSetQuery = (query) => {
      setData(query)
  }
  
  return (
    <div>
      {/*
      <h1>{data}</h1>
      <Form funcionSetQuery={funcionSetQuery}/>
        */}
      <div className="div-title">
        <h1 className="title">Bienvenido a Sitio Administrativo</h1>
        <h1 className="title">Salón de Belleza</h1>
      </div>
      <div className="div-ingresar">
        <h2>Ingresar como:</h2>
        <Link href={'adminPage'}>
          <Button margin={"20px"} width={"300px"} height={"100px"}>Administrador</Button>
        </Link>
        <Link href={'/empleadoPage'}>
          <Button margin={"20px"} width={"300px"} height={"100px"}>Empleado</Button>
        </Link>
      </div>
    </div>
  )
}