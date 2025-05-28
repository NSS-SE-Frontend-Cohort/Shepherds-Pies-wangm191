export const getAllOrders = () => {
    return fetch(`http://localhost:8088/orders/?_embed=orderPizzas`)
    .then((response) => response.json())
}

export const getOrderById = (id) => {
    return fetch(`http://localhost:8088/orders?id=${id}&_embed=orderPizzas`)
    .then((response) => response.json())
}

export const addOrder = async (orderToSend) => {
    const response = await fetch(`http://localhost:8088/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orderToSend)
    })
    return response.json()
}

export const deleteOrder = async (id) => {
    return await fetch(`http://localhost:8088/orders/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    })
}

export const updateOrder = async (order) => {
    const response = await fetch(`http://localhost:8088/orders/${order.id}`, {
        method: 'PUT',

        headers: { 
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(order)
    })
    return response.json()
}

export const updateOrderPrice = async (orderId, totalPrice) => {
    const response = await fetch(`http://localhost:8088/orders/${orderId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ price: parseFloat(totalPrice.toFixed(2)) })
    })
    return response.json()
} 
