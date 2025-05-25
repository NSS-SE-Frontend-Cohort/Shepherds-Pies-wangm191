export const getAllOrders = () => {
    return fetch(`http://localhost:8088/orders/?_embed=orderPizzas`)
    .then((response) => response.json())
}

export const getOrderById = (id) => {
    return fetch(`http://localhost:8088/orders?id=${id}&_embed=orderPizzas`)
    .then((response) => response.json())
}
