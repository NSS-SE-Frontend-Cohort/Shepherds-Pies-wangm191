import { useEffect, useState } from "react"
import { Order } from "./Order"
import { deleteOrder } from "../../services/orderService"
import { deleteOrderPizza, getOrderPizzasByOrderId } from "../../services/orderPizzaService"
import { deletePizza } from "../../services/pizzaService"
import { deletePizzaTopping, getToppingsByPizzaId } from "../../services/pizzaToppingService"
import { useNavigate } from "react-router-dom"

export const MyOrders = ({ currentUser, allOrders, allEmployees, allTables, getAndSetAllOrders}) => {
    const [myOrders, setMyOrders] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        const filteredOrders = allOrders.filter((order) => order.employeeId === currentUser.id)

        setMyOrders(filteredOrders)

    }, [currentUser, allOrders])

    // const handleDeleteOrder = async (id) => {
    //     try {
    //         const orderPizzas = await getOrderPizzasByOrderId(id)

    //         for (const orderPizza of orderPizzas) {
    //             const toppings = await getToppingsByPizzaId(orderPizza.pizzaId)

    //             for (const topping of toppings) {
    //                 await deletePizzaTopping(topping.id)
    //             }

    //             await deletePizza(orderPizza.pizzaId)
    //             await deleteOrderPizza(orderPizza.id)
    //         }

    //         await deleteOrder(id)
    //         getAndSetAllOrders()
    //     }
    //     catch (error) {
    //         console.error("Failed to delete order and related data:", error)
    //     }
    // }

    const handleDeleteOrder = async (orderId) => {
        try {
            const orderPizzas = await getOrderPizzasByOrderId(orderId);
            const pizzaIds = orderPizzas.map(op => op.pizzaId);
            const orderPizzaIds = orderPizzas.map(op => op.id);

            // Delete all toppings for pizzas in parallel
            for (const pizzaId of pizzaIds) {
            const toppings = await getToppingsByPizzaId(pizzaId);
            for (const topping of toppings) {
                if (topping?.id) await deletePizzaTopping(topping.id);
            }
            }

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
        };



    // const handleEditOrder = async (id) => {
    //     navigate(`/edit/${id}`)
    // }

    return (
        <div className="orders-container">
            <h2>My Orders</h2>
            <article className="orders">
                {myOrders.map(orderObj => {
                    return (
                        <div key={orderObj.id}>
                            <div>
                                <Order 
                                    order={orderObj}
                                    key={orderObj.id}
                                    allEmployees={allEmployees}
                                    allTables={allTables}
                                />
                            </div>
                            <div className="btn-container">
                                {orderObj.employeeId === currentUser.id ? (
                                    <button className="btn btn-warning" 
                                            onClick={() => {
                                                navigate(`/edit/${orderObj.id}`)
                                                //handleEditOrder(orderObj.id)
                                            }}
                                        >Edit Order
                                    </button>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="btn-container">
                                {orderObj.employeeId === currentUser.id ? (
                                    <button className="btn btn-warning" onClick={() => handleDeleteOrder(orderObj.id)}>Delete Order</button>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    )
                })}
            </article>
        </div>
    )
}