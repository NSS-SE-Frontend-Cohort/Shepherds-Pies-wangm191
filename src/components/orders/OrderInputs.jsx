export const handleOrderInput = (setOrder) => (event) => {
    const { name, value } = event.target;

    let newValue = value;

    // Convert to number where applicable
    if (["tableId", "delivererId", "tip"].includes(name)) {
        newValue = value === "" ? 0 : Number(value);
    }

    setOrder(prev => ({
        ...prev,
        [name]: newValue
    }));
};


export const handleIsDelivery = (setOrder, isDelivery) => {
    setOrder(prev => ({
        ...prev,
        tableId: isDelivery ? "" : prev.tableId, // if isDelivery then set tableId to null
        delivererId: !isDelivery ? "" : prev.delivererId // if not isDelivery then set delivererId to null
    }))
}

export const handlePizzaToppingsInput = (index, event, setPizzas) => {
        const { value, checked } = event.target
        const topping_Id = parseInt(value)

        setPizzas(prev => {
            // Copies array, then copies single object from index within array. 
            const updated = [...prev]
            const pizza = updated[index]
            const currentToppings = pizza.toppingIds || []
            updated[index] = {
                ...pizza,
                toppingIds: checked
                    ? [...currentToppings, topping_Id]
                    : currentToppings.filter(id => id !== topping_Id),
            }
            return updated
        })
    }

export const handlePizzaOptionsInput = (index, event, setPizzas) => {
        const { name, value } = event.target

        const parsedValue = value === "" ? "" : parseInt(value);

        setPizzas(prev => {
            const updated = [...prev]
            updated[index] = {
                ...updated[index],
                [name]: parsedValue
            }
            return updated
        })
    }