'use client'
import { useEffect, useState } from "react";
import { Order } from "../interfaces/Order";
import api from "../utils/api";
import TooltipIcon from "../utils/helpers/tooltipsaved";
import parseAddress from "../utils/helpers/parseAddress";

const OldOrdersTab: React.FC = () => {
    const [oldOrders, setOldOrder] = useState<Order[]>([]);

    useEffect(() => {
        const fetchOldOrders = async () => {
            try {
                const response = await api.get<Order[]>('old-orders/')
                setOldOrder(response.data)
                console.log('Respuesta de la API:', response.data)
            } catch (error) {
                console.error('Error al obtener los datos:', error)
            }
        };

        fetchOldOrders()

    }, []);

    return (
        <div className="w-full mx-auto px-4 py-8">
            <h1 className="md:text-2xl text-xl font-bold mb-6 text-center">Órdenes guardadas en la base de datos</h1>
            {oldOrders.length === 0 ? (
                <div className="text-center text-xl text-gray-600">
                    No hay órdenes disponibles aún...
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {oldOrders.map((order) => (
                        <div key={order.order_id} className="bg-white relative shadow-md rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold">
                                    Cliente: {order.customer_name}
                                </h2>
                                <span className="text-sm text-gray-600">
                                    {new Date(order.created_at).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-gray-700 text-sm font-medium">Orden ID: {order.order_id}</h3>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-gray-700 text-sm font-medium mb-2">Producto</h3>
                                <p className="text-sm text-gray-600">
                                    {order.item[0].name} - {order.item[0].quantity} {order.item[0].quantity === 1 ? 'unidad' : 'unidades'}
                                </p>
                            </div>
                            <TooltipIcon tooltipText={parseAddress(order.shipping_address)}>
                                <span className="text-sm text-gray-700">Direccion.</span>
                            </TooltipIcon>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default OldOrdersTab;