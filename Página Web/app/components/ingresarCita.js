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


export default function IngresarCita({ insertCita, insertCliente, sede, empleados, servicios, horarios, comunas, clientes, fetchData }) {
    let date = new Date().toJSON().slice(0, 10)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const [fecha, setFecha] = useState("")
    const [empleado, setEmpleado] = useState("")
    const [servicio, setServicio] = useState("")
    const [horario, setHorario] = useState("")
    const [rut, setRut] = useState("")

    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [comuna, setComuna] = useState("")
    const [sexo, setSexo] = useState("")


    function handleSelect(id) {
        var select = document.getElementById(id);
        var valor = select.options[select.selectedIndex].value;
        if (valor != "") {
            switch (id) {
                case "id_empleado":
                    setEmpleado(valor)
                    break
                case "id_servicio":
                    setServicio(valor)
                    break
                case "id_horario":
                    setHorario(valor)
                    break
                case "id_comuna":
                    setComuna(valor)
                    break
                case "sexo":
                    setSexo(valor)
                    break
            }
        }
    }

    function insertData() {
        if (empleado != "" && servicio != "" && horario != "" && rut != "" && !isNaN(rut) && fecha != "") {
            var esClienteNuevo = true
            for (const i of clientes) {
                if (i.rut_cliente == rut) {
                    esClienteNuevo = false
                    var cita = { 'id_sede': sede, 'id_empleado': empleado, 'id_servicio': servicio, 'id_horario': horario, 'rut_cliente': rut }
                    clearPage()
                    toast({
                        title: 'Ingreso Correcto',
                        description: "La cita ha sido agendada correctamente",
                        status: 'success',
                        duration: 7000,
                        isClosable: true,
                    })
                    insertCita(cita)
                }
            }
            if (esClienteNuevo) {
                toast({
                    title: 'Ingrese nuevo cliente',
                    description: "El cliente ingresado no está registrado",
                    duration: 7000,
                    isClosable: true,
                })
                onOpen()
            }

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

    function nuevoCliente() {
        if (nombre != "" && apellido != "" && comuna != "" && sexo != "") {
            var cliente = { 'nombre': nombre, 'apellido': apellido, 'comuna': comuna, 'sexo': sexo, 'rut': rut }
            insertCliente(cliente)
            var cita = { 'id_sede': sede, 'id_empleado': empleado, 'id_servicio': servicio, 'id_horario': horario, 'rut_cliente': rut }
            insertCita(cita)
            toast({
                title: 'Ingreso Correcto',
                description: "La cita ha sido agendada correctamente",
                status: 'success',
                duration: 7000,
                isClosable: true,
            })
            clearPage()
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

    function clearPage() {
        setFecha("")
        setApellido("")
        setComuna("")
        setEmpleado("")
        setHorario("")
        setNombre("")
        setRut("")
        setServicio("")
        setSexo("")
        onClose()
    }

    async function a(){
        const citas = await fetchData(`select c.id_cita, e.id_empleado, e.id_sede, c.fecha from cita c inner join empleado e on c.id_empleado = e.id_empleado where c.fecha = '${fecha}' and e.id_sede = ${sede}`)
        console.log(citas)
    }

    useEffect(() => {
        a()
    }, [fecha])

    return (
        <div>
            <div className="form">
                <h2>Ingrese datos de la cita</h2>
                <div className="form-div">
                    <p>Fecha</p>
                    <input type='date' className='form-input' onChange={(e) => setFecha(e.target.value)} value={fecha} min={date} max={'2025-12-31'}></input>

                    <p>Empleado</p>
                    <select name="id_empleado" id="id_empleado" required className="form-select" onChange={(e) => handleSelect(e.target.id)} value={empleado}>
                        <option value="" disabled selected hidden></option>
                        {empleados.map((x) => (
                            <option value={x.id_empleado}>{x.nombre} {x.apellido}</option>
                        ))}
                    </select>

                    <p>Servicio</p>
                    <select name="id_servicio" id="id_servicio" required className="form-select" onChange={(e) => handleSelect(e.target.id)} value={servicio}>
                        <option value="" disabled selected hidden></option>
                        {servicios.map((x) => (
                            <option value={x.id_servicio}>{x.nombre}</option>
                        ))}
                    </select>

                    <p>Horario</p>
                    <select name="id_horario" id="id_horario" required className="form-select" onChange={(e) => handleSelect(e.target.id)} value={horario}>
                        <option value="" disabled selected hidden></option>
                        {horarios.map((x) => (
                            <option value={x.id_horario}>{x.horario}</option>
                        ))}
                    </select>

                    <p>Rut del cliente</p>
                    <input required type="number" name='rut' id='rut' placeholder='Rut' className="form-input" onChange={(e) => setRut(e.target.value)} value={rut} />
                </div>

                <div className="div-buttons">
                    <div>
                        <Link href={`/empleadoPage/${sede}`}>
                            <button className="form-button">Volver</button>
                        </Link>
                    </div>
                    <div>
                        <button onClick={insertData} className="form-button">Ingresar</button>
                    </div>
                </div>
            </div>

            <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
                <ModalOverlay />
                <ModalContent bgColor={"aqua"} padding={"10px"}>
                    <ModalHeader>Ingresar Nuevo Cliente</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody margin={"20px"}>
                        <div className="form-div-cliente">
                            <div className="div-default-R">
                                <div className="div-default-C">
                                    <p>Nombre</p>
                                    <input required type="text" name='nombre_cliente' id='nombre_cliente' className='form-client-input' onChange={(e) => setNombre(e.target.value)} value={nombre} />
                                </div>
                                <div className="div-default-C">
                                    <p>Apellido</p>
                                    <input required type="text" name='apellido_cliente' id='apellido_cliente' className="form-client-input" onChange={(e) => setApellido(e.target.value)} value={apellido} />
                                </div>
                            </div>

                            <div className="div-default-R" >
                                <div className="div-default-C">
                                    <p>Comuna</p>
                                    <select name="id_comuna" id="id_comuna" required className="form-client-select" onChange={(e) => handleSelect(e.target.id)} value={comuna}>
                                        <option value="" disabled selected hidden></option>
                                        {comunas.map((x) => (
                                            <option value={x.id_comuna}>{x.nombre_comuna}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="div-default-C">
                                    <p>Sexo</p>
                                    <select name="sexo" id="sexo" required className="form-client-select" onChange={(e) => handleSelect(e.target.id)} value={sexo}>
                                        <option value="" disabled selected hidden></option>
                                        <option value="1">Masculino</option>
                                        <option value="2">Femenino</option>
                                        <option value="3">Otro</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </ModalBody>

                    <ModalFooter marginTop={"50px"}>
                        <Button onClick={nuevoCliente}>Ingresar Cita</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}