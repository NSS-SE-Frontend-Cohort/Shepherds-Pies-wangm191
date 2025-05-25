import { useEffect, useState } from "react"
import { Order } from "./Order"

export const MyOrders = ({ currentUser, allOrders, allEmployees }) => {
    const [myOrders, setMyOrders] = useState([])

    useEffect(() => {
        const filteredOrders = allOrders.filter((order) => order.employeeId === currentUser.id)

        setMyOrders(filteredOrders)

    }, [currentUser, allOrders])

    return (
        <div className="orders-container">
            <h2>My Orders</h2>
            <article className="orders">
                {myOrders.map(orderObj => {
                    return (
                        <Order 
                            order={orderObj}
                            key={orderObj.id}
                            allEmployees={allEmployees}
                        />
                    )
                })}
            </article>
        </div>
    )
}