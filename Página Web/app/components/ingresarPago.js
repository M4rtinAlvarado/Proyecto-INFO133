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


export default function IngresarPago({ addPago, fetchData, citas, sede }) {
    const toast = useToast()
    let date = new Date().toJSON().slice(0, 10)
    const [cita, setCita] = useState("")
    const [fecha, setFecha] = useState("")
    const [citasAct, setCitasAct] = useState(citas)


    function handleSelect(id) {
        var select = document.getElementById(id);
        var valor = select.options[select.selectedIndex].value;
        if (valor != "") {
            switch (id) {
                case "id_cita":
                    setCita(valor)
                    break
            }
        }
    }

    async function insertData() {
        if (cita != "" && fecha != "") {
            addPago(cita, fecha)
            setFecha("")
            setCita("")
            toast({
                title: 'Ingreso Correcto',
                description: "La cita ha sido agendada correctamente",
                status: 'success',
                duration: 7000,
                isClosable: true,
            })
        }
        else{
            toast({
                title: 'Información Incompleta',
                description: "Debe rellenar todas las casillas",
                status: "warning",
                duration: 4000,
                isClosable: true,
            })
        }
    }

    async function updateCitas(){
        if(fecha != ""){
            const citasAux = await fetchData(`select c.id_cita, e.nombre, e.apellido, c2.nombre_cliente, c2.apellido_cliente, c2.rut_cliente from cita c inner join empleado e on c.id_empleado = e.id_empleado inner join cliente c2 on c.id_cliente = c2.id_cliente where c.fecha = '${fecha}' and e.id_sede = ${sede} and c.id_pago is null`)
            setCitasAct(citasAux)
            setCita("")
        }
    }

    useEffect(() => {
        updateCitas()
    }, [fecha])

    return (
        <div>
            <div className="form">
                <h2>Ingrese datos del pago</h2>
                <div className="form-div">

                    <p>Fecha</p>
                    <input type='date' className='form-input' onChange={(e) => setFecha(e.target.value)} value={fecha} max={date}></input>

                    <p>Cita</p>
                    <select name="id_cita" id="id_cita" required className="form-select" onChange={(e) => handleSelect(e.target.id)} value={cita}>
                        <option value="" disabled selected hidden></option>
                        {citasAct.map((x) => (
                            <option value={x.id_cita}>{x.id_cita} Empleado: {x.nombre} {x.apellido},  Cliente: {x.rut_cliente} {x.nombre_cliente} {x.apellido_cliente}</option>
                        ))}
                    </select>
                </div>

                <div className="div-buttons">
                    <div>
                        <Link href={`/empleadoPage/${sede}`}>
                            <button className="form-volver-button">Volver</button>
                        </Link>
                    </div>
                    <div>
                        <button onClick={insertData} className="form-ingresar-button">Ingresar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}