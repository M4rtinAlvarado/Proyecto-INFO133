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
    const [fecha, setFecha] = useState(date)
    const [horariosAct, setHorariosAct] = useState(horarios)
    const [empleadosAct, setEmpleadosAct] = useState(empleados)
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

    async function insertData() {
        if (empleado != "" && servicio != "" && horario != "" && rut != "" && !isNaN(rut) && fecha != "") {
            let clientesRep = await fetchData(`select * from cliente where rut_cliente = '${rut}'`)
            if (clientesRep.length != 0) {
                var cita = { 'id_empleado': parseInt(empleado), 'id_servicio': parseInt(servicio), 'id_horario': parseInt(horario), 'rut_cliente': rut, 'fecha': fecha }
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
            else {
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
            var cliente = { 'nombre': nombre, 'apellido': apellido, 'comuna': parseInt(comuna), 'sexo': parseInt(sexo), 'rut': rut }
            insertCliente(cliente)
            var cita = { 'id_empleado': parseInt(empleado), 'id_servicio': parseInt(servicio), 'id_horario': parseInt(horario), 'rut_cliente': rut, 'fecha': fecha }
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

    async function updateEmpleados(){
        if(servicio != ""){
            const empleadosAux = await fetchData(`select e.id_empleado, e.nombre, e.apellido from empleado e inner join cargo c on e.id_cargo = c.id_cargo inner join servicio s on s.id_cargo = c.id_cargo where s.id_servicio = ${servicio} and e.id_sede = ${sede}`)
            setEmpleadosAct(empleadosAux)
            setEmpleado("")
            setHorario("")
        }
    }

    async function updateHorarios(){
        if(empleado != ""){
            const horariosAux = await fetchData(`select * from horario h where h.id_horario not in(select h.id_horario from horario h inner join cita c on c.id_horario = h.id_horario inner join empleado e on c.id_empleado = e.id_empleado where e.id_empleado = ${empleado} and c.fecha = '${fecha}'); `)
            setHorariosAct(horariosAux)
            setHorario("")
        }
    }

    useEffect(() => {
        updateEmpleados()
    }, [servicio])

    useEffect(() => {
        updateHorarios()
    }, [empleado, fecha])


    return (
        <div>
            <div className="form">
                <h2>Ingrese datos de la cita</h2>
                <div className="form-div">
                    <p>Fecha</p>
                    <input type='date' className='form-input' onChange={(e) => setFecha(e.target.value)} value={fecha} min={date} max={'2025-12-31'}></input>

                    <p>Servicio</p>
                    <select name="id_servicio" id="id_servicio" required className="form-select" onChange={(e) => handleSelect(e.target.id)} value={servicio}>
                        <option value="" disabled selected hidden></option>
                        {servicios.map((x) => (
                            <option value={x.id_servicio}>{x.nombre}</option>
                        ))}
                    </select>

                    <p>Empleado</p>
                    <select name="id_empleado" id="id_empleado" required className="form-select" onChange={(e) => handleSelect(e.target.id)} value={empleado}>
                        <option value="" disabled selected hidden></option>
                        {empleadosAct.map((x) => (
                            <option value={x.id_empleado}>{x.nombre} {x.apellido}</option>
                        ))}
                    </select>

                    <p>Horario</p>
                    <select name="id_horario" id="id_horario" required className="form-select" onChange={(e) => handleSelect(e.target.id)} value={horario}>
                        <option value="" disabled selected hidden></option>
                        {horariosAct.map((x) => (
                            <option value={x.id_horario}>{x.hora_inicio} - {x.hora_fin}</option>
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