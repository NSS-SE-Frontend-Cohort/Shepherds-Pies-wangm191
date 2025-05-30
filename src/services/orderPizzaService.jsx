export const getAllOrderPizzas = () => {
    return fetch(`http://localhost:8088/orderPizzas`)
    .then((response) => response.json())
}

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

export const getOrderPizzasByPizzaId = async (pizzaId) => {
    const response = await fetch(`http://localhost:8088/orderPizzas?pizzaId=${pizzaId}`)
    return response.json();
}

export const deleteOrderPizza = async (id) => {
    return await fetch(`http://localhost:8088/orderPizzas/${id}`, {
        method: "DELETE"
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