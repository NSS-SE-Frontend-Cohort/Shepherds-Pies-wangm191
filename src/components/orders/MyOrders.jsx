import { useEffect, useState } from "react"
import { Order } from "./Order"
import { deleteOrder } from "../../services/orderService"
import { deleteOrderPizza, getOrderPizzasByOrderId, getOrderPizzasByPizzaId } from "../../services/orderPizzaService"
import { deletePizza } from "../../services/pizzaService"
import { deletePizzaTopping, getToppingsByPizzaId } from "../../services/pizzaToppingService"
import { useNavigate } from "react-router-dom"


export const MyOrders = ({ currentUser, allOrders, allEmployees, allTables, getAndSetAllOrders}) => {
    const [myOrders, setMyOrders] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        const filteredOrders = allOrders.filter(order => order.employeeId === currentUser.id)
        
        setMyOrders(filteredOrders)
    }, [currentUser, allOrders])

    // useEffect(() => {
    //     console.log("Current user:", currentUser)
    //     console.log("All orders:", allOrders)
    //     const filteredOrders = allOrders.filter(order => order.employeeId === currentUser.id)
    //     console.log("My orders:", filteredOrders)
    //     setMyOrders(filteredOrders)
    // }, [currentUser, allOrders])

    const handleDeleteOrder = async (orderId) => {
        try {
            const orderPizzas = await getOrderPizzasByOrderId(orderId);
            const pizzaIds = orderPizzas.map(orderPizza => orderPizza.pizzaId);
            const orderPizzaIds = orderPizzas.map(orderPizza => orderPizza.id);

            // Delete all toppings for pizzas in parallel
            await Promise.all(pizzaIds.map( async (pizzaId) => {
                const toppings = await getToppingsByPizzaId(pizzaId)
                // short circuit truthy expression, if topping.id is truthy, execute deletePizzaTopping()
                await Promise.all(toppings.map(topping => topping?.id && deletePizzaTopping(topping.id)))
            }))

            // Delete all orderPizzas for the order in parallel
            await Promise.all(orderPizzaIds.map(id => deleteOrderPizza(id)));

            // Delete all pizzas in parallel
            await Promise.all(pizzaIds.map(id => deletePizza(id)));

            // Finally, delete the order
            await deleteOrder(orderId);

            getAndSetAllOrders();
        } catch (error) {
            console.error("Failed to delete order and related data:", error);
        }
    }

    // const handleDeleteOrder = async (orderId) => {
    //     console.log("Attempting to delete orderId:", orderId);
    //     const order = myOrders.find(order => order.id === orderId);
    //     console.log("Order to delete:", order);

    //     try {
    //         const orderPizzas = await getOrderPizzasByOrderId(orderId);
    //         const pizzaIds = orderPizzas.map(orderPizza => orderPizza.pizzaId);
    //         const orderPizzaIds = orderPizzas.map(orderPizza => orderPizza.id);

    //         // Filter pizzaIds that belong ONLY to this order
    //         const pizzaIdsToDelete = [];

    //         for (const pizzaId of pizzaIds) {
    //             const allOrderPizzas = await getOrderPizzasByPizzaId(pizzaId);
    //             const belongsToOtherOrders = allOrderPizzas.some(op => op.orderId !== orderId);

    //             if (!belongsToOtherOrders) {
    //                 pizzaIdsToDelete.push(pizzaId);
    //             } else {
    //                 console.warn(`Pizza ID ${pizzaId} is used in another order; skipping deletion`);
    //             }
    //         }

    //         // Delete all toppings for pizzas we're allowed to delete
    //         await Promise.all(pizzaIdsToDelete.map(async (pizzaId) => {
    //             const toppings = await getToppingsByPizzaId(pizzaId);
    //             await Promise.all(toppings.map(topping => topping?.id && deletePizzaTopping(topping.id)));
    //         }));

    //         // Delete only the orderPizzas associated with this order
    //         await Promise.all(orderPizzaIds.map(id => deleteOrderPizza(id)));

    //         // Delete only pizzas that aren't shared with other orders
    //         await Promise.all(pizzaIdsToDelete.map(id => deletePizza(id)));

    //         // Finally, delete the order
    //         await deleteOrder(orderId);

    //         getAndSetAllOrders();
    //     } catch (error) {
    //         console.error("Failed to delete order and related data:", error);
    //     }
    // };



    return (
        <div className="orders-container">
            <h2>My Orders</h2>
            <article className="orders">
                {myOrders.map(orderObj => {
                    return (
                        <div key={orderObj.id} className="order-button-wrapper">
                                <Order 
                                    order={orderObj}
                                    key={orderObj.id}
                                    allEmployees={allEmployees}
                                    allTables={allTables}
                                />
                            {orderObj.employeeId === currentUser.id && (
                            <div className="btn-container">
                                {orderObj.employeeId === currentUser.id ? (
                                    <button className="order-btn btn-primary" 
                                            onClick={() => {
                                                navigate(`/edit/${orderObj.id}`)
                                                //handleEditOrder(orderObj.id)
                                            }}
                                        >Edit Order
                                    </button>
                                ) : (
                                    ""
                                )}
                                {orderObj.employeeId === currentUser.id ? (
                                    <button className="order-btn btn-warning" onClick={() => handleDeleteOrder(orderObj.id)}>Delete Order</button>
                                ) : (
                                    ""
                                )}
                            </div>
                            )}
                        </div>
                    )
                })}
            </article>
        </div>
    )
}