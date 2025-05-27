import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getOrderById, updateOrderPrice } from "../../services/orderService"
import { getPizzaById } from "../../services/pizzaService"
import { handleOrderInput } from "./OrderInputs"
import { PizzaForm } from "./PizzaForm"
import { updateOrder } from "../../services/orderService"
import { updatePizza } from "../../services/pizzaService"
import { addPizzaTopping, deletePizzaTopping } from "../../services/pizzaToppingService"
import { updateOrderPizza } from "../../services/orderPizzaService"

export const EditOrder = ({ allEmployees, allSizes, allCheeses, allSauces, allToppings, getAndSetAllOrders }) => {
    const {id} = useParams()

    const [order, setOrder]= useState({})
    const [pizzas, setPizzas] = useState([{ sizeId: "", cheeseId: "", sauceId: "", toppingIds: [] }])

    const navigate = useNavigate()

    useEffect(() => {
        getOrderById(id).then((data) => {
            const orderObj = data[0]
            setOrder(orderObj)
        })
    }, [id])

    useEffect(() => {
        //Asyncronous meaning we want this only to trigger after order has been filled.
        if (order && Array.isArray(order.orderPizzas)) {

            const fetchPizzas = async () => {
                const pizza = await Promise.all(
                    order.orderPizzas.map((orderPizza) => getPizzaById(orderPizza.pizzaId)
                        .then(data => data[0])
                    )
                )
                const pizzasWithToppingIds = pizza.map(pizza => {
                    const currentToppingIds = pizza.pizzaToppings?.map( pizzaTopping =>
                        allToppings.find(topping => topping.id === pizzaTopping.toppingId)?.id
                    )
                    return {
                        ...pizza,
                        toppingIds: currentToppingIds || []
                    }
                })
                setPizzas(pizzasWithToppingIds)
            }
            fetchPizzas()
        }
    }, [order])

    const handleUpdateOrder = async (event) => {
        event.preventDefault()

        let totalPrice = 0

        const orderToUpdate = {
            id: order.id,
            employeeId: Number(order.employeeId),
            delivererId: Number(order.delivererId),
            tip: parseFloat(order.tip),
            dateAndTime: new Date().toISOString()
        }
        try {
            const currentOrder = await updateOrder(orderToUpdate)
            const currentOrderId = currentOrder.id

            for ( let index = 0; index < pizzas.length; index++ ) {
                const pizza = pizzas[index]
                const originalOrderPizza = order.orderPizzas?.[index]
                const sizeCost = allSizes.find(size => size.id === pizza.sizeId)?.cost
                
                const toppingsCost = pizza.pizzaToppings
                .map((pizzaTopping) => allToppings.find(topping => topping.id === pizzaTopping.toppingId))
                .reduce((prev, cur) => prev + (cur?.cost || 0), 0)

                totalPrice += sizeCost + toppingsCost

                const pizzaToUpdate = { 
                    id: pizza.id,
                    sizeId: pizza.sizeId,
                    cheeseId: pizza.cheeseId,
                    sauceId: pizza.sauceId
                }

                const currentPizza = await updatePizza(pizzaToUpdate)
                const currentPizzaId = currentPizza.id

                const orderPizzaToUpdate = {
                    id: originalOrderPizza?.id, 
                    orderId: currentOrderId,
                    pizzaId: currentPizzaId
                }

                await updateOrderPizza(orderPizzaToUpdate)

                const pizzaToppingIds = pizza.pizzaToppings?.map(pizzaTopping => pizzaTopping.pizzaTopping || [])

                const selectedToppingIds = pizza.toppingIds

                for (const toppingId of selectedToppingIds) {
                    if (!pizzaToppingIds.includes(toppingId)) {
                        const pizzaToppingToUpdate= { 
                            pizzaId: currentPizzaId,
                            toppingId: toppingId
                        }
                        await addPizzaTopping(pizzaToppingToUpdate)
                    }
                }
                for (const pizzaTopping of pizza.pizzaToppings || []) {
                    if (!selectedToppingIds.includes(pizzaTopping.toppingId)){
                        await deletePizzaTopping(pizzaTopping.id)
                    }
                }
            }
            await updateOrderPrice(currentOrderId, totalPrice)
            getAndSetAllOrders()
            navigate("/orders")
        } catch (error) {
            console.error("Error updating order:", error)
        }
    }

    return (
        <form className="edit-order">
            <h2>Edit Order #{id}</h2>
             <fieldset>
                <div className="form-group">
                        <label>Choose Deliverer: </label>
                        <select
                            type="number"
                            name="delivererId"
                            value={order.delivererId || 0}
                            onChange={handleOrderInput(setOrder)}
                            className="form-control"
                        >
                            <option value={0}>None</option>
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
                        value={order.tip ?? ""}
                        onChange={handleOrderInput(setOrder)}
                        required
                        className="form-control"
                    />
                </div>
            </fieldset>
            {pizzas.map((pizza, index) => (
                <PizzaForm
                    key={index}
                    index={index}
                    pizza={pizza}
                    allSizes={allSizes}
                    allCheeses={allCheeses}
                    allSauces={allSauces}
                    allToppings={allToppings}
                    setPizzas={setPizzas}
                />
            ))}
            <fieldset>
                <div className="form-group">
                    <button type="submit" className="form-btn btn-primary" onClick={handleUpdateOrder}>Update Order</button>
                </div>
            </fieldset>
        </form>
    )
}