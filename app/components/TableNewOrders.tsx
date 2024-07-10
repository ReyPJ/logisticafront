'use client';
import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Order, OrdersProps } from "../interfaces/Order";
import api from "../utils/api";
import getButtonText from "../utils/helpers/getButtonText";
import parseAddress from "../utils/helpers/parseAddress";
import saveOrderData from '../utils/helpers/saveOrder';
import deleteOrder from '../utils/helpers/deleteOrder';
import TooltipIcon from '../utils/helpers/tooltipsaved';
import { MdOutlineLocalPrintshop, MdDelete } from "react-icons/md";
import { IoIosSave } from "react-icons/io";
import { BsFillCloudCheckFill } from "react-icons/bs";




export enum OrderStatus {
    NEW = 'new',
    PREPARED = 'prepared',
    SHIPPED = 'shipped',
}

const NexOrdersTab: React.FC<OrdersProps> = ({ status }) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [savedOrders, setSavedOrders] = useState<number[]>([]);

    useEffect(() => {
        const fecthOrderData = async () => {
            try {
                const response = await api.get<Order[]>(`orders/?status=${status}`);
                setOrders(response.data);
                console.log('Respuesta de la API:', response.data)
            } catch (error) {
                console.error('Error al obtener los datos de las ordenes:', error)
            }
        };

        const fetchSavedOrders = async () => {
            try {
                const response = await api.get<Order[]>(`old-orders/`);
                const savedOrderIds = response.data.map(order => order.order_id);
                setSavedOrders(savedOrderIds);
            } catch (error) {
                console.error('Error al obtener las órdenes guardadas:', error);
            }
        };
        fecthOrderData();
        fetchSavedOrders();

    }, [status]);

    const handleOrderStatusChange = async (orderId: number, currentStatus: string) => {
        let newStatus: OrderStatus;
        let endpoint: string;

        switch (currentStatus) {
            case OrderStatus.NEW:
                newStatus = OrderStatus.PREPARED;
                endpoint = 'prepared';
                break;

            case OrderStatus.PREPARED:
                newStatus = OrderStatus.SHIPPED;
                endpoint = 'shipped';
                break;
            default:
                return;
        }

        try {
            const response = await api.post(`orders/${orderId}/${endpoint}/`);
            if (response.status === 201) {
                console.log(`Orden ${orderId} marcada como ${newStatus}`);
                setOrders(prevOrders =>
                    prevOrders.map(order =>
                        order.order_id === orderId ? { ...order, status: newStatus } : order
                    )
                );
                if (newStatus === OrderStatus.SHIPPED) {
                    alert(`Orden ${orderId} marcada como enviada.`);
                }
                if (newStatus === OrderStatus.PREPARED) {
                    alert(`Orden ${orderId} marcada como preparada.`);
                }
            }
        } catch (error) {
            console.error(`Error al marcar la orden como ${newStatus}:`, error);
            alert(`Ocurrió un error al marcar la orden como ${newStatus}`);
        }
    };

    const printOrder = (order: Order) => {
        let qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=`;

        if (api.defaults && api.defaults.baseURL) {
            qrCodeUrl += encodeURIComponent(api.defaults.baseURL + order.order_id + '/prepared/');
        } else {
            console.error('No se pudo obtener la URL base de la API.');
            return;
        }

        const printableContent = `
            <html>
                <head>
                    <title>Orden ID: ${order.order_id}</title>
                    <style>
                        /* Estilos para la versión impresa */
                        @media print {
                            body * {
                                visibility: hidden;
                            }
                            .printable, .printable * {
                                visibility: visible;
                            }
                            /* Estilos de TailwindCSS */
                            ${tailwindStyles}
                        }
                    </style>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css">
                </head>
                <body>
                    <div class="printable">
                        <div class="bg-white relative shadow-md rounded-lg p-6">
                            <div class="flex items-center justify-between mb-4">
                                <h2 class="text-lg font-semibold">
                                    Orden ID: ${order.order_id}
                                </h2>
                            </div>
                            <div class="mb-4">
                                <h3 class="text-gray-700 text-sm font-medium mb-2">Cliente</h3>
                                <p>${order.customer_name} ${order.customer_last_name}</p>
                            </div>
                            <div class="mb-4">
                                <h3 class="text-gray-700 text-sm font-medium mb-2">Dirección de Envío</h3>
                                <p class="text-sm">${parseAddress(order.shipping_address)}</p>
                            </div>
                            <div class="mb-4 md:pb-2">
                                <h3 class="text-gray-700 text-sm font-medium mb-2">Productos</h3>
                                <ul class="list-disc list-inside">
                                    ${order.item.map(item => `<li key=${item.id}>${item.name} - Cantidad: ${item.quantity}</li>`).join('')}
                                </ul>
                            </div>
                            <div class='mb-4 md:pb-6 sm:pb-10 flex justify-between pb-12'>
                                <img src="${qrCodeUrl}" alt="QR Code" id="qrCodeImg" />
                            </div>
                            <div class="flex justify-between items-center absolute bottom-0 left-0 right-0 p-4">
                                <p class="text-gray-600 text-sm">Fecha de Creación: ${new Date(order.created_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                    <script>
                        setTimeout(() => {
                            document.getElementById('qrCodeImg').style.display = 'block';
                            window.print();
                        }, 700);
                    </script>
                </body>
            </html>
        `;

        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.open();
            printWindow.document.write(printableContent);
            printWindow.document.close();
        } else {
            alert('No se pudo abrir la ventana de impresión. Asegúrate de permitir ventanas emergentes.');
        }
    };

    const isOrderSaved = (orderId: number) => {
        return savedOrders.includes(orderId);
    };


    const tailwindStyles = `
    /* Ajusta estilos de TailwindCSS para impresión si es necesario */
    /* Puedes copiar los estilos necesarios desde tu archivo tailwind.css aquí */
    `;

    return (
        <div className="w-full mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6 text-center">Lista de Órdenes</h1>
            {orders.length === 0 ? (
                <div className="text-center text-xl text-gray-600">
                    No hay órdenes disponibles aún...
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {orders.map((order) => (
                        <div key={order.order_id} className="bg-white relative shadow-md rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold">
                                    Orden ID: {order.order_id}
                                </h2>
                                {(order.status === 'new') && (
                                    <button
                                        className="text-blue-500 hover:text-blue-600 focus:outline-none"
                                        onClick={() => printOrder(order)}
                                    >
                                        <MdOutlineLocalPrintshop size={24} />
                                    </button>
                                )}
                                {isOrderSaved(order.order_id) && (
                                    <span className="text-blue-500">
                                        <TooltipIcon tooltipText="Orden guardada">
                                            <BsFillCloudCheckFill size={35} />
                                        </TooltipIcon>
                                    </span>
                                )}
                                <span className=
                                    {
                                        `px-3 py-2 text-sm font-semibold rounded-full 
                                        ${order.status === 'new' ? 'bg-blue-500 text-white'
                                            : order.status === 'prepared' ? 'bg-yellow-500 text-white' : order.status === 'shipped' ? 'bg-green-500 text-white' : ''}`}>
                                    {order.status === 'new' ? 'Nueva orden' : order.status === 'prepared' ? 'Preparada' : order.status === 'shipped' ? 'Enviada' : ''}
                                </span>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-gray-700 text-sm font-medium mb-2">Cliente</h3>
                                <p>{order.customer_name} {order.customer_last_name}</p>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-gray-700 text-sm font-medium mb-2">Dirección de Envío</h3>
                                <p className="text-sm">{parseAddress(order.shipping_address)}</p>
                            </div>
                            <div className="mb-4 md:pb-2">
                                <h3 className="text-gray-700 text-sm font-medium mb-2">Productos</h3>
                                <ul className="list-disc list-inside">
                                    {order.item.map((item) => (
                                        <li key={item.id}>{item.name} - Cantidad: {item.quantity}</li>
                                    ))}
                                </ul>
                            </div>
                            {(order.status === 'new') && (
                                <div className='mb-4 md:pb-6 sm:pb-10 pb-12'>
                                    <QRCodeSVG value={`${api.defaults.baseURL}orders/${order.order_id}/prepared/`} size={60} />
                                </div>
                            )}
                            <div className="flex justify-between items-center absolute bottom-0 left-0 right-0 p-4">
                                <p className="text-gray-600 text-sm">Fecha de Creación: {new Date(order.created_at).toLocaleDateString()}</p>
                                {(order.status === 'new' || order.status === 'prepared') && (
                                    <button
                                        className={`text-white sm:text-sm text-xs bg-blue-500 py-2 md:px-4 px-1 rounded-md hover:bg-blue-600 focus:outline-none`}
                                        onClick={() => handleOrderStatusChange(order.order_id, order.status)}
                                    >
                                        {getButtonText(order.status)}
                                    </button>
                                )}
                                {(order.status === 'shipped') && (
                                    <div className='flex justify-between gap-5 px-3'>
                                        <button
                                            className='text-red-700'
                                            onClick={() => deleteOrder(order.order_id)}
                                        >
                                            <MdDelete size={28} />
                                        </button>
                                        <button
                                            className='text-blue-700'
                                            onClick={() => saveOrderData(order.order_id)}
                                        >
                                            <IoIosSave size={28} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

};



export default NexOrdersTab;