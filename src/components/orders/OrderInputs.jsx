export const handleOrderInput = (setOrder) => (event) => {
        const {name, value } = event.target 

        let newValue = value;
            if (name === "delivererId") {
                newValue = value === "" ? null : value;
            } else if (name === "tip") {
                newValue = value === "" ? 0 : value;
            }

        setOrder(prev => ({
            ...prev,
            [name]: newValue
        }))
    }

export const handleIsDelivery = (setOrder, isDelivery) => {
    setOrder(prev => ({
        ...prev,
        tableId: isDelivery ? "" : prev.tableId, // if isDelivery then set tableId to null
        delivererId: !isDelivery ? "" : prev.delivererId // if not isDelivery then set delivererId to null
    }));
}

export const handlePizzaToppingsInput = (index, event, setPizzas) => {
        const { value, checked } = event.target
        const toppingId = parseInt(value)

        setPizzas(prev => {
            // Copies array, then copies single object from index within array. 
            const updated = [...prev]
            const pizza = updated[index]
            const currentToppings = pizza.toppingIds || []
            updated[index] = {
                ...pizza,
                toppingIds: checked
                    ? [...currentToppings, toppingId]
                    : currentToppings.filter(id => id !== toppingId),
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