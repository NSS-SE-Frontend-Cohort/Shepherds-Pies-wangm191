import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PizzaForm } from "./PizzaForm"
import { addOrder, updateOrderPrice } from "../../services/orderService"
import { addPizza } from "../../services/pizzaService"
import { addOrderPizza } from "../../services/orderPizzaService"
import { addPizzaTopping } from "../../services/pizzaToppingService"


export const CreateOrder = ({ currentUser , allEmployees, allSizes, allCheeses, allSauces, allToppings, getAndSetAllOrders}) => {
    const [numPizzas, setNumPizzas] = useState(1)
    const [newOrder, setNewOrder] = useState({ delivererId: "", tip: "" })
    const [newPizzas, setNewPizzas] = useState([{ sizeId: "", cheeseId: "", sauceId: "", toppingIds: [] }])

    const navigate = useNavigate()

    const handleNewOrder = (event) => {
        const {name, value } = event.target 

        let newValue = value;
            if (name === "delivererId") {
                newValue = value === "" ? null : value;
            } else if (name === "tip") {
                newValue = value === "" ? 0 : parseFloat(value);
            }

        setNewOrder(prev => ({
            ...prev,
            [name]: newValue
        }))
    }

    const handleNewPizzaToppings = (index, event) => {
        const { value, checked } = event.target
        const toppingId = parseInt(value)

        setNewPizzas(prev => {
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

    const handleNewPizzaOptions = (index, event) => {
        const { name, value } = event.target

        const parsedValue = value === "" ? "" : parseInt(value);

        setNewPizzas(prev => {
            const updated = [...prev]
            updated[index] = {
                ...updated[index],
                [name]: parsedValue
            }
            return updated
        })
    }

    const saveOrder = async (event) => {
        event.preventDefault()

        let totalPrice = 0 

        const orderToSend = {
            employeeId: currentUser.id,
            delivererId: Number(newOrder.delivererId),
            tip: parseFloat(newOrder.tip),
            dateAndTime: new Date().toISOString()
        }
        try {
            const currentOrder = await addOrder(orderToSend)
            const currentOrderId = currentOrder.id

            for ( const pizza of newPizzas ) {
                const sizeCost = allSizes.find(size => size.id === pizza.sizeId)?.cost

                const toppingsCost = pizza.toppingIds
                    .map(toppingId => allToppings.find(topping => topping.id === toppingId)?.cost)
                    .reduce((prev, cur) => prev + cur, 0)

                totalPrice += sizeCost + toppingsCost

                const pizzaToSend = { 
                    sizeId: pizza.sizeId,
                    cheeseId: pizza.cheeseId,
                    sauceId: pizza.sauceId
                }

                const currentPizza = await addPizza(pizzaToSend)
                const currentPizzaId = currentPizza.id

                const orderPizzaToSend = {
                    orderId: currentOrderId,
                    pizzaId: currentPizzaId
                }

                await addOrderPizza(orderPizzaToSend)

                for (const toppingId of pizza.toppingIds) {
                    const pizzaToppingToSend = {
                        pizzaId: currentPizzaId,
                        toppingId: toppingId
                    }
                    await addPizzaTopping(pizzaToppingToSend)
                }
            }
            await updateOrderPrice(currentOrderId, totalPrice)
            getAndSetAllOrders()
            navigate("/orders")

        } catch (error) {
            console.error("Error saving order:", error);
        }
    }

    return (
        <form className="create-order">
            <h2>Create Order</h2>
            <fieldset>
                <div className="form-group">
                    <label># of Pizzas: </label>
                    <input
                        type="number"
                        min="1"
                        value={numPizzas}
                        onChange={(e) => {
                            const count = parseInt(e.target.value);
                            setNumPizzas(count); 2

                            // Adjust pizza array size
                            setNewPizzas(prev => {
                                const updated = [...prev];
                                while (updated.length < count) {
                                    updated.push({ sizeId: "", cheeseId: "", sauceId: "", toppingIds: [] });
                                }
                                return updated.slice(0, count);
                            });
                        }}
                        className="form-control"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                        <label>Choose Deliverer: </label>
                        <select
                            type="number"
                            name="delivererId"
                            onChange={handleNewOrder}
                            className="form-control"
                        >
                            <option value={"" ?? 0}>Select Deliverer </option>
                            {allEmployees
                            .filter((employeeObj) => employeeObj.deliverer)
                            .map((employeeObj) => (
                                <option
                                    key={employeeObj.id}
                                    className="filter-size"
                                    value={employeeObj.id}
                                >
                                    {employeeObj.fullName}
                                </option>
                            ))}  
                        </select>
                    </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Tip $: </label>
                    <input 
                        type="number"
                        name="tip"
                        onChange={handleNewOrder}
                        required
                        className="form-control"
                    />
                </div>
            </fieldset>
            {newPizzas.map((pizza, index) => (
                <PizzaForm
                    key={index}
                    index={index}
                    pizza={pizza}
                    allSizes={allSizes}
                    allCheeses={allCheeses}
                    allSauces={allSauces}
                    allToppings={allToppings}
                    handleNewPizzaOptions={handleNewPizzaOptions}
                    handleNewPizzaToppings={handleNewPizzaToppings}
                />
            ))}
            <fieldset>
                <div className="form-group">
                    <button type="submit" className="form-btn btn-primary" onClick={saveOrder}>Save Order</button>
                </div>
            </fieldset>
        </form>
    )

}