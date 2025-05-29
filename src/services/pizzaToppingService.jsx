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
    // Check if it exists before attempting delete
    const response = await fetch(`http://localhost:8088/pizzaToppings/${id}`)
    if (response.status === 404) {
        console.warn(`Pizza topping ${id} does not exist.`)
        return
    }

    const deleteResponse = await fetch(`http://localhost:8088/pizzaToppings/${id}`, {
      method: "DELETE"
    });

    if (!deleteResponse.ok) {
        throw new Error(`Failed to delete pizza topping ${id}: ${deleteResponse.status}`)
    }
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