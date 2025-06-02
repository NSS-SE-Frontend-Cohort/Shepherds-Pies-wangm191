import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getOrderById, updateOrderPrice } from "../../services/orderService"
import { getPizzaById } from "../../services/pizzaService"
import { handleIsDelivery, handleOrderInput } from "./OrderInputs"
import { PizzaForm } from "./PizzaForm"
import { updateOrder } from "../../services/orderService"
import { updatePizza } from "../../services/pizzaService"
import { addPizzaTopping, deletePizzaTopping } from "../../services/pizzaToppingService"
import { updateOrderPizza } from "../../services/orderPizzaService"
import "./Form.css"

export const EditOrder = ({ allEmployees, allTables, allSizes, allCheeses, allSauces, allToppings, getAndSetAllOrders }) => {
    const {id} = useParams()

    const [order, setOrder]= useState({})
    const [pizzas, setPizzas] = useState([{ sizeId: "", cheeseId: "", sauceId: "", toppingIds: [] }])
    const [isDelivery, setIsDelivery] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        getOrderById(id).then((data) => {
            const orderObj = data[0]
            setOrder(orderObj)

            if (orderObj.delivererId !== 0 || orderObj.delivererId !== undefined) {
                setIsDelivery(true)
            }
            else {
                setIsDelivery(false)
            }
        })
    }, [id])

    useEffect(() => {
        if (order && Array.isArray(order.orderPizzas)) {
            const fetchPizzas = async () => {
                try {
                    const pizzasData = await Promise.all(
                        order.orderPizzas.map(orderPizza =>
                            getPizzaById(orderPizza.pizzaId)
                        )
                    )

                    const pizzasWithToppingIds = pizzasData.map(pizza => {
                        const currentToppingIds = pizza.pizzaToppings?.map(
                            pizzaTopping => pizzaTopping.toppingId
                        ) || []

                        return {
                            ...pizza,
                            toppingIds: currentToppingIds
                        }
                    })

                    setPizzas(pizzasWithToppingIds)
                } catch (error) {
                    console.error("Error fetching pizzas:", error)
                }
            }

            fetchPizzas()
        }
    }, [order])



    const handleUpdateOrder = async (event) => {
        event.preventDefault();

        let totalPrice = 0;

        const orderToUpdate = {
            id: order.id,
            employeeId: order.employeeId,
            tableId: Number(order.tableId) || 0, 
            delivererId: Number(order.delivererId) || 0,
            tip: parseFloat(order.tip),
            dateAndTime: new Date().toISOString()
        };

        try {
            const currentOrder = await updateOrder(orderToUpdate);
            const currentOrderId = currentOrder.id;

            for (let index = 0; index < pizzas.length; index++) {
                const pizza = pizzas[index];
                const originalOrderPizza = order.orderPizzas?.find(op => op.pizzaId === pizza.id);

                const pizzaToUpdate = { 
                    id: pizza.id,
                    sizeId: pizza.sizeId,
                    cheeseId: pizza.cheeseId,
                    sauceId: pizza.sauceId
                };
                const currentPizza = await updatePizza(pizzaToUpdate);
                const currentPizzaId = currentPizza.id;

                const orderPizzaToUpdate = {
                    id: originalOrderPizza?.id, 
                    orderId: currentOrderId,
                    pizzaId: currentPizzaId
                };
                await updateOrderPizza(orderPizzaToUpdate);

                const pizzaToppingIds = pizza.pizzaToppings?.map(pizzaTopping => pizzaTopping.toppingId) || [];
                const selectedToppingIds = pizza.toppingIds;

                for (const pizzaTopping of pizza.pizzaToppings || []) {
                    if (!selectedToppingIds.includes(pizzaTopping.toppingId)) {
                        await deletePizzaTopping(pizzaTopping.id);
                    }
                }

                for (const toppingId of selectedToppingIds) {
                    if (!pizzaToppingIds.includes(toppingId)) {
                        const pizzaToppingToAdd = {
                            pizzaId: currentPizzaId,
                            toppingId: toppingId
                        };
                        await addPizzaTopping(pizzaToppingToAdd);
                    }
                }

                const sizeCost = allSizes.find(size => size.id === pizza.sizeId)?.cost || 0;
                const toppingsCost = pizza.pizzaToppings
                    .map(pizzaTopping => allToppings.find(topping => topping.id === pizzaTopping.id)) // different to topping_Id, got from pizza.toppingIds []
                    .reduce((prev, cur) => prev + (cur?.cost || 0), 0);

                totalPrice += sizeCost + toppingsCost;
            }

            await updateOrderPrice(currentOrderId, totalPrice);

            getAndSetAllOrders();
            navigate("/orders");
        } catch (error) {
            console.error("Error updating order:", error);
        }
    }

    return (
        <form className="edit-order">
            <h2>Edit Order #{id}</h2>
            <fieldset>
                <div className="form-group">
                    <label>Is order a delivery?</label>
                    <div className="form-control">
                        <input 
                            type="radio"
                            name="isDelivery"
                            value={isDelivery}
                            checked={!isDelivery}
                            onChange={() => setIsDelivery(false)}
                        /> 
                        No
                    </div>
                    <div className="form-control">
                        <input
                            type="radio"
                            name="isDelivery"
                            value={isDelivery}
                            checked={isDelivery}
                            onChange={() => setIsDelivery(true)}
                        />
                        Yes
                    </div>
                </div>
            </fieldset>
            {!isDelivery && (
                <fieldset>
                    <div className="form-group">
                        <label>Choose Table: </label>
                        <select 
                            type="number"
                            name="tableId"
                            onChange={(e) => {
                                handleOrderInput(setOrder)(e) // this is curried function 
                                handleIsDelivery(setOrder, false) // this is normal function
                            }}
                            className="form-control"
                        >
                            <option value={""}>Select Table </option>
                            {allTables.map((tableObj) => (
                                <option 
                                    key={tableObj.id}
                                    className="filter-size"
                                    value={tableObj.id}
                                >
                                    {tableObj.id}
                                </option>
                            ))}
                        </select>
                    </div>
                </fieldset>
                )
            }
            {isDelivery && (
                <fieldset>
                    <div className="form-group">
                            <label>Choose Deliverer: </label>
                            <select
                                type="number"
                                name="delivererId"
                                value={order.delivererId || ""}
                                onChange={(e) => {
                                    handleOrderInput(setOrder)(e) // this is curried function 
                                    handleIsDelivery(setOrder, true) // this is normal function
                                }}
                                className="form-control"
                            >
                                <option value={""}>None</option>
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
                )
            }
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