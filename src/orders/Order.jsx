import { useEffect, useState } from "react"
import { getAllEmployees } from "../services/employeeService"


export const Order = ({ order }) => {

    const [allEmployees, setAllEmployees] = useState([])
    const [orderEmployee, setOrderEmployee] = useState("")
    const [orderDeliverer, setOrderDeliverer] = useState("")

    useEffect(() => {
        getAllEmployees().then((employeesArray) => {
            setAllEmployees(employeesArray)
        })
    }, [])

    useEffect(() => {
        const foundEmployee = allEmployees.find((employee) => employee.id === order.employeeId)
        const foundDeliverer = allEmployees.find((employee) => employee.id === order.delivererId)

        setOrderEmployee(foundEmployee)
        // Might need to change to tertiary operator if foundDeliverer becomes falsy value ie 0 or "" 
        setOrderDeliverer(foundDeliverer ?? null)
    })

    return (
        <section className="order">
            <header className="order-info">Order # {order.id}</header>
            <div className="order-info">Number Of Pizzas: {order.orderPizzas.length}</div>
            <div className="order-info">Employee: {orderEmployee?.fullName}</div>
            <footer>
                <div>
                    <div className="order-info">{orderDeliverer ? `Delivery by: ${orderDeliverer?.fullName}` : `No delivery required.`}</div>
                </div>
                <div>
                    <div className="order-info">Price: ${order.price.toFixed(2)}</div>
                </div>
            </footer>
        </section>
    )
}