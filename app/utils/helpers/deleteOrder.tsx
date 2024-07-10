import api from "../api";

const deleteOrder = async (order_id: number) => {
    try {
        const response = await api.delete(`orders/${order_id}/delete`)
        alert('Pedido borrado exitosamente')
        return response.data
    } catch (error) {
        console.error(error)
        alert("Debes guardar el pedido antes de borrarlo")
    }
};

export default deleteOrder;