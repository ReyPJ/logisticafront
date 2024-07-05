'use client';
import React, { useEffect, useState } from 'react';
import { Order, Address } from "../interfaces/Order";
import api from "../utils/api";

const NexOrdersTab: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fecthOrderData = async () => {
            try {
                const response = await api.get<Order[]>('/');
                setOrders(response.data);
                console.log('Respuesta de la API:', response.data)
            } catch (error) {
                console.error('Error al obtener los datos de las ordenes:', error)
            }
        };

        fecthOrderData();

    }, []);

    const parseAddress = (address: string): Address => {
        try {
            return JSON.parse(address);
        } catch (error) {
            // console.error('Error al parsear la dirección:', error)
            return {} as Address;
        }
    };

    const handleOrderPrepared = async (orderId: number) => {
        try {
            const response = await api.post(`/${orderId}/prepared/`);
            if (response.status === 201) {
                console.log('Orden marcada como preparada:', orderId);
                setOrders(prevOrders =>
                    prevOrders.map(order =>
                        order.id === orderId ? { ...order, status: 'prepared' } : order
                    )
                );
                alert('Orden marcada como preparada');
            }
        } catch (error) {
            console.error('Error al preparar la orden:', error);
            alert('Ocurrió un error al preparar la orden');
        }
    }

    return (
        <div className="with-full mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Lista de Ordenes</h1>
            <div className="overflow-x-auto rounded-lg">
                <table className="min-w-full bg-white shadow-md overflow-hidden table-fixed">
                    <thead className="bg-red-600 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left">Nombre</th>
                            <th className="py-3 px-6 text-left">Apellido</th>
                            <th className="py-3 px-6 text-left">Dirección</th>
                            <th className="py-3 px-6 text-left">Producto(s)</th>
                            <th className="py-3 px-6 text-left">Cantidad</th>
                            <th className="py-3 px-6 text-left">SKU</th>
                            <th className="py-3 px-6 text-left">Método de envío</th>
                            <th className="py-3 px-6 text-left">Fecha de creación</th>
                            <th className="py-3 px-6 text-left">Estado</th>
                            <th className="py-3 px-6 text-left">Accion</th>
                        </tr>
                    </thead>
                    {orders.length === 0 ? (
                        <tbody>
                            <tr>
                                <td className="py-3 px-6 text-center text-xl" colSpan={9}>No hay ordenes disponibles aún...</td>
                            </tr>
                        </tbody>
                    ) : (
                        <tbody>
                            {orders.map((order, index) => {
                                const shippingAddress = parseAddress(order.shipping_address);
                                return (
                                    <tr key={order.id} className={`border-b ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                                        <td className="py-3 px-6">{order.customer_name}</td>
                                        <td className="py-3 px-6">{order.customer_last_name}</td>
                                        <td className="py-3 px-6">
                                            {`${shippingAddress.address_1}, ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.postcode}`}
                                        </td>
                                        <td className="py-3 px-6">{order.item[0]?.name || 'N/A'}</td>
                                        <td className="py-3 px-6">{order.item[0]?.quantity || 'N/A'}</td>
                                        <td className="py-3 px-6">{order.item[0]?.sku || 'N/A'}</td>
                                        <td className="py-3 px-6">{order.shipping_lines[0]?.method_title || 'N/A'}</td>
                                        <td className="py-3 px-6">{new Date(order.created_at).toLocaleDateString()}</td>
                                        <td className="py-3 px-6">{order.status}</td>
                                        <td className='py-3 px-6'>
                                            <button
                                                className='text-blue-500 hover:text-blue-700'
                                                onClick={() => handleOrderPrepared(order.id)}
                                            >
                                                Marcar como preparado
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    )

};



export default NexOrdersTab;