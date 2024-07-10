"use client"
import {
    Input, Button, useToast,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import { useState, useEffect } from "react"
import Link from "next/link"
import React from "react"


export default function IngresarVenta({ addData, productos, sede }) {
    const toast = useToast()
    const [prod, setProd] = useState("")
    const [cant, setCant] = useState("")
    const [seleccion, setSeleccion] = useState([])

    function selectProd() {
        var selectProd = document.getElementById("id_producto");
        var valor = selectProd.options[selectProd.selectedIndex].value;
        setProd(valor)
    }

    function addSeleccion() {
        if (prod != "" && cant != "" && !isNaN(cant)) {
            var repetido = false
            for (const i of seleccion) {
                if (i.id_producto == prod) {
                    repetido = true
                    i.cantidad = parseInt(cant) + parseInt(i.cantidad)
                    setSeleccion(seleccion)
                    cleanPage()
                }
            }
            if (!repetido) {
                var aux = seleccion
                aux.push({ 'id_producto': parseInt(prod), 'cantidad': parseInt(cant) })
                setSeleccion(aux)
                cleanPage()
            }
            toast({
                title: 'Producto Agregado',
                description: "El producto se ha agregado correctamente",
                status: 'success',
                duration: 7000,
                isClosable: true,
            })
        }
        else {
            toast({
                title: 'Información Incompleta',
                description: "Debe rellenar todas las casillas",
                status: "warning",
                duration: 4000,
                isClosable: true,
            })
        }
    }

    function insertProducts() {
        if (seleccion.length != 0) {
            addData(seleccion)
            toast({
                title: 'Ingreso Correcto',
                description: "La venta ha sido ingresada correctamente",
                status: 'success',
                duration: 7000,
                isClosable: true,
            })
            cleanPage()
            setSeleccion([])
        }
        else {
            toast({
                title: 'Información Incompleta',
                description: "No se ha seleccionado ningún producto",
                status: "warning",
                duration: 4000,
                isClosable: true,
            })
        }
    }

    function cleanPage() {
        setCant("")
        setProd("")
    }


    return (
        <div>
            <div className="form">
                <h2>Ingrese datos de la Venta</h2>
                <div className="form-div">
                    <p>Ingrese Producto</p>
                    <select name="id_producto" id="id_producto" required className="form-select" onChange={selectProd} value={prod}>
                        <option value="" disabled selected hidden></option>
                        {productos.map((x) => (
                            <option value={x.id_producto}>{x.id_producto} {x.nombre_producto} {x.marca}</option>
                        ))}
                    </select>
                    <p>Cantidad</p>
                    <input required type="number" name='cantidad' id='cantidad' placeholder='Cantidad' className="form-input" onChange={(e) => setCant(e.target.value)} value={cant} />
                    <button onClick={addSeleccion}>Añadir Producto</button>
                </div>

                <div className='div-prod-select'>
                    <p>Productos Seleccionados</p>
                    <TableContainer>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Producto</Th>
                                    <Th>Cantidad</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {seleccion.map((x) => (
                                    <Tr>
                                        <Td>{x.id_producto} {productos[x.id_producto - 1].nombre_producto} {productos[x.id_producto - 1].marca}</Td>
                                        <Td>{x.cantidad}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </div>

                <div className="div-buttons">
                    <div>
                        <Link href={`/empleadoPage/${sede}`}>
                            <button className="form-button">Volver</button>
                        </Link>
                    </div>
                    <div>
                        <button className="form-button" onClick={insertProducts}>Ingresar Venta</button>
                    </div>
                </div>
            </div>
        </div >
    )
}