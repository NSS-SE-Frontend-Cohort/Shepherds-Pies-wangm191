export const handleOrderInput = (setOrder) => (event) => {
        const {name, value } = event.target 

        let newValue = value;
            if (name === "delivererId") {
                newValue = value === "" ? null : value;
            } else if (name === "tip") {
                newValue = value === "" ? 0 : parseFloat(value);
            }

        setOrder(prev => ({
            ...prev,
            [name]: newValue
        }))
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