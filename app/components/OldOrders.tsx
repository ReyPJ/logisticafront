'use client'
import { useEffect, useState } from "react";
import { Order } from "../interfaces/Order";
import api from "../utils/api";
import parseAddress from "../utils/helpers/parseAddress";
import { FaFolder, FaFolderOpen } from "react-icons/fa";

interface OrdersByDate {
    [date: string]: Order[];
}

const OldOrdersTab: React.FC = () => {
    const [ordersByDate, setOrdersByDate] = useState<OrdersByDate>({});
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    useEffect(() => {
        const fetchOldOrders = async () => {
            try {
                const response = await api.get<Order[]>('old-orders/')
                const orders = response.data
                const groupedOrders: OrdersByDate = orders.reduce((acc, order) => {
                    const date = new Date(order.created_at).toLocaleDateString();
                    if (!acc[date]) acc[date] = [];
                    acc[date].push(order);
                    return acc;
                }, {} as OrdersByDate);
                setOrdersByDate(groupedOrders);
                console.log('Respuesta de la API:', groupedOrders)
            } catch (error) {
                console.error('Error al obtener los datos:', error)
            }
        };

        fetchOldOrders()

    }, []);

    const handleDataClick = (date: string) => {
        if (selectedDate === date) {
            setSelectedDate(null);
        } else {
            setSelectedDate(date);
        }
    }

    return (
        <div className="w-full mx-auto px-4 py-8">
            <h1 className="md:text-2xl text-xl font-bold mb-6 text-center">Órdenes guardadas en la base de datos</h1>
            <div className="mb-6">
                {Object.keys(ordersByDate).map((date) => (
                    <div key={date} className="mb-2">
                        <button
                            className={`flex items-center space-x-2 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 py-2 px-4 rounded-md transition duration-200 ease-in-out ${selectedDate === date ? 'bg-blue-700' : ''
                                }`}
                            onClick={() => handleDataClick(date)}
                        >
                            {selectedDate === date ? <FaFolderOpen /> : <FaFolder />}
                            <span>{date}</span>
                        </button>
                    </div>
                ))}
            </div>
            {selectedDate && (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Órdenes para {selectedDate}</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {ordersByDate[selectedDate].map((order) => (
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
                                <div className="mb-4 flex flex-col gap-2">
                                    <h3 className="text-gray-700 text-sm font-medium mb-2">Producto/s</h3>
                                    <p className="text-sm text-gray-600">
                                        {order.item[0].name} - {order.item[0].quantity} {order.item[0].quantity === 1 ? 'unidad' : 'unidades'}
                                    </p>
                                    <p className="text-sm text-gray-600">SKU: <strong>{order.item[0].sku}</strong></p>
                                    <p className="textt-sm text-gray-600">Direccion: {parseAddress(order.shipping_address)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};


export default OldOrdersTab;