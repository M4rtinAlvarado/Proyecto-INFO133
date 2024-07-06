"use client"
import {useState} from "react"
import { Button } from '@chakra-ui/react'
import Link from "next/link"



export default function adminPage() {
  
  return (
    <div>
      <div className="div-title">
        <h1 className="title">Empleado</h1>
      </div>
      <div className="div-ingresar-2">
        <h2>Elija una acción:</h2>
        <div className="div-ingresar-R">
          <Link href={'ingresarCita'}>
            <Button margin={"20px"} width={"300px"} height={"100px"}>Ingresar Cita</Button>
          </Link>
          <Link href={'ingresarVenta'}>
            <Button margin={"20px"} width={"300px"} height={"100px"}>Ingresar Venta</Button>
          </Link>
        </div>
        <Link href={'/'}>
          <Button margin={"60px"} width={"150px"} height={"40px"}>Volver</Button>
        </Link>
      </div>
    </div>
  )
}