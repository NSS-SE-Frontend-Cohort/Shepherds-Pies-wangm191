import "./Orders.css"
import { Order } from "./Order"


export const AllOrders = ({ allOrders, allEmployees, allTables }) => {
    return (
        <div className="orders-container">
            <h2>All Orders</h2>
            <article className="orders">
                {allOrders.map(orderObj => {
                    return (
                        <Order 
                            order={orderObj}
                            key={orderObj.id}
                            allEmployees={allEmployees}
                            allTables={allTables}
                        />
                    )
                })}
            </article>
        </div>
    )
}