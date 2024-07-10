import api from "../api"

const saveOrderData = async (order_id: number) => {
    try {
        const response = await api.post("transfer-order/", { order_id: order_id })
        alert("Pedido guardado con exito")
        return response.data
    } catch (error) {
        alert("Error al guardar el pedido")
        console.error(error)
    }
}

export default saveOrderData