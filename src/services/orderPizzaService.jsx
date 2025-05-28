export const addOrderPizza = async (orderPizzaToSend) => {
    const response = await fetch(`http://localhost:8088/orderPizzas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orderPizzaToSend)
    })
    return response.json()
}

export const getOrderPizzasByOrderId = async (orderId) => {
    const response = await fetch(`http://localhost:8088/orderPizzas?orderId=${orderId}`);
    return response.json();
}


export const deleteOrderPizza = async (id) => {
    return await fetch(`http://localhost:8088/orderPizzas/${id}`, {
        method: "DELETE",
        headers: {
          "content-Type": "application/json",
        }
    })
}

export const updateOrderPizza = async (orderPizza) => {
    const response = await fetch(`http://localhost:8088/orderPizzas/${orderPizza.id}`, {
        method: 'PUT',

        headers: { 
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(orderPizza)
    })
    return response.json()
}