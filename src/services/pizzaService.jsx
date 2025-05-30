export const getAllSizes = () => {
    return fetch(`http://localhost:8088/sizes/?_embed=pizzas`)
    .then((response) => response.json())
}

export const getAllCheeses = () => {
    return fetch(`http://localhost:8088/cheeses/?_embed=pizzas`)
    .then((response) => response.json())
}

export const getAllSauces = () => {
    return fetch(`http://localhost:8088/sauces/?_embed=pizzas`)
    .then((response) => response.json())
}

export const getAllToppings = () => {
    return fetch(`http://localhost:8088/toppings`)
    .then((response) => response.json())
}

export const getPizzaById = async (id) => {
    const response = await fetch(`http://localhost:8088/pizzas/${id}?_embed=pizzaToppings`)
    return response.json()
}


export const addPizza = async (pizzaToSend) => {
    const response = await fetch(`http://localhost:8088/pizzas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pizzaToSend)
    })
    return response.json()
}

export const deletePizza = async (id) => {
    return await fetch(`http://localhost:8088/pizzas/${id}`, {
        method: "DELETE"
    })
}


export const updatePizza = async (pizza) => {
    const response = await fetch(`http://localhost:8088/pizzas/${pizza.id}`, {
        method: 'PUT',

        headers: { 
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(pizza)
    })
    return response.json()
}