import api from "../api"

const saveOrderData = async (order_id: number) => {
    try {
        const response = await api.post("transfer-order/", { order_id: order_id })
        alert(`El pedido ${order_id} ha sido guardado con exito`)
        return response.data
    } catch (error) {
        alert(`El pedido ${order_id} ya se encuentra guardado`)
        console.error(error)
    }
}

export default saveOrderData