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

export const getPizzaById = (id) => {
    return fetch(`http://localhost:8088/pizzas?id=${id}&_embed=pizzaToppings`)
    .then((response) => response.json())
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
  const res = await fetch(`http://localhost:8088/pizzas/${id}`, {
    method: "DELETE"
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to delete pizza ${id}: ${res.status} ${errorText}`);
  }
};


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