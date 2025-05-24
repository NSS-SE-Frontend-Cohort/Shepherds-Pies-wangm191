export const getAllOrders = () => {
    return fetch(`http://localhost:8088/orders/?_embed=orderPizzas`)
    .then((response) => response.json())
}

