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