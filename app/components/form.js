"use client"
import { Input, Button } from '@chakra-ui/react'
import {useState, useEffect} from "react"
import React from "react"


export default function Form({funcionSetQuery}) {
    const [query, setQuery] = useState()
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        funcionSetQuery(query)
        setQuery("");
      };

    return (
        <div>
            <Input width="800px" margin="20px" placeholder='Ingrese Consulta' value={query} onChange={(e) => setQuery(e.target.value)}/>
            <Button onClick={handleSubmit} bg="red">Ingresar</Button>
        </div>
    )
}