'use client';
import { useEffect } from "react"
import api from "../utils/api"

export default function Prepared() {

    useEffect(() => {
        const fetchPreparedOrders = async () => {
            try {
                const response = await api.get('/?status=prepared')
                console.log('Respuesta de la API:', response.data)
            } catch (error) {
                console.error('Error al obtener los datos de las ordenes preparadas:', error)
            }
        }

        fetchPreparedOrders()

    }, [])

    return (
        <div>
            Ordenes preparadas
        </div>
    )
}