export const findEmployee = (order, allEmployees) => {
    return allEmployees.find((employee) => employee.id === order.employeeId)
}

export const findDeliverer = (order, allEmployees) => {
    return allEmployees.find((employee) => employee.id === order.delivererId) || null
}

export const getSizeById = (sizeId, allSizes) => {
    return allSizes.find((size) => size.id === sizeId)
}

export const getCheeseById = (cheeseId, allCheeses) => {
    return allCheeses.find((cheese) => cheese.id === cheeseId)
}

export const getSauceById = (sauceId, allSauces) => {
    return allSauces.find((sauce) => sauce.id === sauceId)
}

export const getToppingsById = (pizzaToppingIds, allToppings) => {
    return allToppings.filter((topping) => pizzaToppingIds.includes(topping.id));
}

export const getDeliveryFee = () => 5 
