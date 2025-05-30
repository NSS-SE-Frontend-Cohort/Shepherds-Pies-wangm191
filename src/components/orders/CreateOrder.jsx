import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PizzaForm } from "./PizzaForm"
import { addOrder, updateOrderPrice } from "../../services/orderService"
import { addPizza } from "../../services/pizzaService"
import { addOrderPizza } from "../../services/orderPizzaService"
import { addPizzaTopping } from "../../services/pizzaToppingService"
import { handleOrderInput, handleIsDelivery } from "./OrderInputs" 


export const CreateOrder = ({ currentUser, allEmployees, allTables, allSizes, allCheeses, allSauces, allToppings, getAndSetAllOrders}) => {
    const [numPizzas, setNumPizzas] = useState(1)
    const [newOrder, setNewOrder] = useState({ tableId: "", delivererId: "", tip: "" })
    const [newPizzas, setNewPizzas] = useState([{ sizeId: "", cheeseId: "", sauceId: "", toppingIds: [] }])
    const [isDelivery, setIsDelivery] = useState(false);

    const navigate = useNavigate()

    const handleSaveOrder = async (event) => {
        event.preventDefault();

        let totalPrice = 0;

        const orderToSend = {
            employeeId: currentUser.id,
            tableId: Number(newOrder.tableId) || 0,
            delivererId: Number(newOrder.delivererId) || 0,
            tip: parseFloat(newOrder.tip),
            dateAndTime: new Date().toISOString()
        };

        try {
            const currentOrder = await addOrder(orderToSend);
            const currentOrderId = currentOrder.id;

            for (const pizza of newPizzas) {
                const sizeCost = allSizes.find(size => size.id === pizza.sizeId)?.cost || 0;

                const toppingsCost = pizza.toppingIds
                    .map(toppingId => allToppings.find(topping => topping.id === toppingId)?.cost || 0) // different to topping_Id, got from pizza.toppingIds []
                    .reduce((prev, cur) => prev + cur, 0);

                totalPrice += sizeCost + toppingsCost;

                const pizzaToSend = {
                    sizeId: pizza.sizeId,
                    cheeseId: pizza.cheeseId,
                    sauceId: pizza.sauceId
                };

                const currentPizza = await addPizza(pizzaToSend);
                const currentPizzaId = currentPizza.id;

                const orderPizzaToSend = {
                    orderId: currentOrderId,
                    pizzaId: currentPizzaId
                };

                await addOrderPizza(orderPizzaToSend);

                // ⚡️ Parallelize all topping additions for this pizza
                const toppingPromises = pizza.toppingIds.map(toppingId => {
                    return addPizzaTopping({
                        pizzaId: currentPizzaId,
                        toppingId: toppingId // different from topping_Id
                    });
                });
                await Promise.all(toppingPromises);
            }

            await updateOrderPrice(currentOrderId, totalPrice);
            getAndSetAllOrders();
            navigate("/orders");

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
                    <label>Is order a delivery? </label>
                    <div className="form-control">
                        <input 
                            type="radio"
                            name="isDelivery"
                            value={false}
                            checked={!isDelivery}
                            onChange={() => setIsDelivery(false)}
                        />
                        No
                    </div>
                    <div className="form-control">
                        <input
                            type="radio"
                            name="isDelivery"
                            value={true}
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
                                handleOrderInput(setNewOrder)(e) // this is curried function 
                                handleIsDelivery(setNewOrder, false) // this is normal function
                            }}
                            className="form-control"
                        >
                            <option value={0}>Select Table </option>
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
            )}
            {isDelivery && (
                <fieldset>
                    <div className="form-group">
                            <label>Choose Deliverer: </label>
                            <select
                                type="number"
                                name="delivererId"
                                onChange={(e) => {
                                    handleOrderInput(setNewOrder)(e) // this is curried function 
                                     handleIsDelivery(setNewOrder, false) // this is normal function
                                }}
                                className="form-control"
                            >
                                <option value={0}>Select Deliverer </option>
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
            )}
            <fieldset>
                <div className="form-group">
                    <label>Tip $: </label>
                    <input 
                        type="number"
                        name="tip"
                        onChange={handleOrderInput(setNewOrder)}
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
                    setPizzas={setNewPizzas}
                />
            ))}
            <fieldset>
                <div className="form-group">
                    <button type="submit" className="form-btn btn-primary" onClick={handleSaveOrder}>Save Order</button>
                </div>
            </fieldset>
        </form>
    )

}