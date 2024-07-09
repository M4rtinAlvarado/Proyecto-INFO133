"use client"
import { Input, Button } from '@chakra-ui/react'
import { useState, useEffect } from "react"
import Link from "next/link"
import React from "react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    useToast
} from '@chakra-ui/react'


export default function Main({ sedes }) {
const [sede, setSede] = useState("")

  function selectSede() {
      var selectSede = document.getElementById("id_sede");
      document.getElementById("div-ingresar").style.display = "block";
      document.getElementById("div-ingresar-fake").style.display = "none";
      var valor = selectSede.options[selectSede.selectedIndex].value;
      setSede(valor)
  }


  return (
    <div>
      <div className="div-title">
        <h1 className="title">Bienvenido/a a Sitio Administrativo</h1>
        <h1 className="title">Salón de Belleza</h1>

        <div className="div-select-sede">
          <p>Seleccione su Sede</p>
          <select name="id_sede" id="id_sede" required onChange={selectSede} value={sede}>
            <option value="" disabled selected hidden></option>
            {sedes.map((x) => (
              <option value={x.id_sede}>{x.nombre_sede}</option>
            ))}
          </select>
        </div>

      </div>
      <div className="div-ingresar-fake" id="div-ingresar-fake">
      </div>
        <div className="div-ingresar" id="div-ingresar">
          <h2>Ingresar como:</h2>
            <Link href={`adminPage/${sede}`}>
              <Button margin={"20px"} width={"300px"} height={"100px"}>Administrador</Button>
            </Link>
            <Link href={`empleadoPage/${sede}`}>
              <Button margin={"20px"} width={"300px"} height={"100px"}>Empleado</Button>
            </Link>
        </div>
      
    </div>
  )
}