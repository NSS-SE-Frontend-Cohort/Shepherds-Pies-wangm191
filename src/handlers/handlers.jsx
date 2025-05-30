export const findEmployee = (order, allEmployees) => {
    return allEmployees.find((employee) => employee.id == order.employeeId)
}

export const findDeliverer = (order, allEmployees) => {
    return allEmployees.find((employee) => employee.id == order.delivererId) || undefined
}

export const getTableById = (tableId, allTables) => {
    return allTables.find((table) => table.id == tableId)
}

export const getSizeById = (sizeId, allSizes) => {
    return allSizes.find((size) => size.id == sizeId)
}

export const getCheeseById = (cheeseId, allCheeses) => {
    return allCheeses.find((cheese) => cheese.id == cheeseId)
}

export const getSauceById = (sauceId, allSauces) => {
    return allSauces.find((sauce) => sauce.id == sauceId)
}

export const getToppingsById = (pizzaToppingIds, allToppings) => {
    return allToppings.filter((topping) => pizzaToppingIds.includes(topping.id));
}

// export const filterOrderPizzasByOrderId = (order, allOrderPizzas) => {
//     if (!Array.isArray(allOrderPizzas)) return []
//     return allOrderPizzas.filter((orderPizza) => orderPizza.order_Id === order.id)
// }

// export const filterPizzaToppingsByPizzaId = (pizza, allPizzaToppings) => {
//     if (!Array.isArray(allPizzaToppings)) return []
//     return allPizzaToppings.filter((pizzaTopping) => pizzaTopping.pizza_Id === pizza.id)
// }

export const getDeliveryFee = () => 5 
