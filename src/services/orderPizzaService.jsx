export const addOrderPizza = async (orderPizzaToSend) =>{
    const response = await fetch(`http://localhost:8088/orderPizzas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orderPizzaToSend)
    })
    return response.json()
}