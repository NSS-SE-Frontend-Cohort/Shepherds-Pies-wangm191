export const addPizzaTopping = async (pizzaToppingToSend) => {
    const response = await fetch(`http://localhost:8088/pizzaToppings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pizzaToppingToSend)
    })
    return response.json()
}

export const getToppingsByPizzaId = async (pizzaId) => {
    const response = await fetch(`http://localhost:8088/pizzaToppings?pizzaId=${pizzaId}`)
    return response.json()
}

export const deletePizzaTopping = async (id) => {
    return await fetch(`http://localhost:8088/pizzaToppings/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    })
}

export const updatePizzaTopping = async (pizzaTopping) => {
    const response = await fetch(`http://localhost:8088/pizzaToppings/${pizzaTopping.id}`, {
        method: 'PUT',

        headers: { 
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(pizzaTopping)
    })
    return response.json()
}