"use client"
import {useState} from "react"
import { Button } from '@chakra-ui/react'
import Link from "next/link"



export default function adminPage({params, useSearchParams}) {
  const sede = params.sede
  
  return (
    <div className="fondo">
      <div className="div-title">
        <h1 className="title">Administrador</h1>
      </div>
      <div className="div-ingresar-2">
        <h2>Elija una acción:</h2>
        <div className="div-ingresar-R">
          <Link href={`/ingresarAdmin/${sede}`}>
            <Button margin={"20px"} width={"300px"} height={"100px"} bgColor={"#f0dac5"}>Ingresar</Button>
          </Link>
        </div>
        <Link href={'/'}>
          <Button margin={"60px"} width={"150px"} height={"40px"} bgColor={"#c4697b"}>Volver</Button>
        </Link>
      </div>
    </div>
  )
}