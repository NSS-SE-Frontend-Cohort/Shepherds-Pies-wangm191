import { useEffect, useState } from "react"
import { getAllOrders } from "../../services/orderService"
import { Order } from "./Order"


export const AllOrders = () => {
    const [allOrders, setAllOrders] = useState([])

    useEffect(() => {
        getAllOrders().then((ordersArray) => {
            setAllOrders(ordersArray)
        })
    }, [])

    return (
        <div className="orders-container">
            <h2>All Orders</h2>
            <article className="orders">
                {allOrders.map(orderObj => {
                    return (
                        <Order 
                            order={orderObj}
                            key={orderObj.id}
                        />
                    )
                })}
            </article>
        </div>
    )
}