"use client"
import { Input, Button, useToast } from '@chakra-ui/react'
import { useState, useEffect } from "react"
import Link from "next/link"
import React from "react"
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box
} from '@chakra-ui/react'


export default function IngresarAdmin({ addEmpleado, addStock, cargos, sede, productos }) {
    const toast = useToast()
    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [rut, setRut] = useState("")
    const [cargo, setCargo] = useState("")
    const [sueldo, setSueldo] = useState("")
    const [comision, setComision] = useState("")
    const [producto, setProducto] = useState("")
    const [cantidad, setCantidad] = useState("")

    function handleSelect(id) {
        var select = document.getElementById(id);
        var valor = select.options[select.selectedIndex].value;
        if (valor != "") {
            switch (id) {
                case "id_cargo":
                    setCargo(valor)
                    break
                case "id_producto":
                    setProducto(valor)
                    break
            }
        }
    }

    function nuevoEmpleado(){
        if(nombre != "" && apellido != "" && rut != "" && cargo != "" && sueldo != "" && comision != ""){
            addEmpleado(nombre, apellido, rut, cargo, sueldo, comision)
            setApellido("")
            setNombre("")
            setCargo("")
            setComision("")
            setRut("")
            setSueldo("")
            toast({
                title: 'Ingreso Correcto',
                description: "El empleado se ha agregado correctamente",
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

    function stock(){
        if (producto != "" && cantidad != ""){
            addStock(parseInt(producto), parseInt(cantidad))
            setProducto("")
            setCantidad("")
            toast({
                title: 'Ingreso Correcto',
                description: "El stock se ha ingresado correctamente",
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

    return (
        <div className="form-1">
            <h2>Elija la acción</h2>
            <Accordion allowMultiple>
                <AccordionItem marginBottom={"10px"} borderRadius={"10px"} padding={"5px"} bgColor={"#f0dac5"}>
                    <AccordionButton color={"black"}>
                        <Box as='span' flex='1' textAlign='left' >
                            Ingresar Empleado
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel marginLeft={"20px"} color={"black"}>
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
                        <div className='div-default-R'>
                            <div className="div-default-C">
                                <p>Rut</p>
                                <input required type="number" name='rut' id='rut' className="form-client-input" onChange={(e) => setRut(e.target.value)} value={rut} />
                            </div>
                            <div className="div-default-C">
                                <p>Cargo</p>
                                <select name="id_cargo" id="id_cargo" required className="form-client-select" onChange={(e) => handleSelect(e.target.id)} value={cargo}>
                                    <option value="" disabled selected hidden></option>
                                    {cargos.map((x) => (
                                        <option value={x.id_cargo}>{x.nombre_cargo}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='div-default-R'>
                            <div className="div-default-C">
                                <p>Sueldo</p>
                                <input required type="number" name='rut' id='rut' className="form-client-input" onChange={(e) => setSueldo(e.target.value)} value={sueldo} />
                            </div>
                            <div className="div-default-C">
                                <p>Comisión</p>
                                <input required type="number" name='rut' id='rut' className="form-client-input" onChange={(e) => setComision(e.target.value)} value={comision} />
                            </div>
                        </div>
                        <div className='div-default-C'>
                            <div className="div-buttons">
                                <div>
                                    <button className="form-admin-button" onClick={nuevoEmpleado}>Ingresar</button>
                                </div>
                            </div>
                        </div>
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem marginBottom={"10px"} borderRadius={"10px"} padding={"5px"} bgColor={"#f0dac5"}>
                    <AccordionButton  color={"black"}>
                        <Box as='span' flex='1' textAlign='left'>
                            Ingresar Stock
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel marginLeft={"20px"} color={"black"}>
                        <div className='div-default-R'>
                            <div className="div-default-C">
                                <p>Producto</p>
                                <select name="id_producto" id="id_producto" required className="form-client-select" onChange={(e) => handleSelect(e.target.id)} value={producto}>
                                    <option value="" disabled selected hidden></option>
                                    {productos.map((x) => (
                                        <option value={x.id_producto}>{x.id_producto} {x.nombre_producto} {x.marca}</option>
                                    ))}
                                </select>

                            </div>
                            <div className="div-default-C">
                                <p>Cantidad</p>
                                <input required type="number" name='cantidad' id='cantidad' className="form-client-input" onChange={(e) => setCantidad(e.target.value)} value={cantidad} />
                            </div>
                        </div>
                        <div className='div-default-C'>
                            <div className="div-buttons">
                                <div>
                                    <button className="form-admin-button" onClick={stock}>Ingresar</button>
                                </div>
                            </div>
                        </div>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
            <div className='div-buttons'>
                <Link href={`/adminPage/${sede}`}>
                    <button className="form-button">Volver</button>
                </Link>
            </div>
        </div>

    )
}