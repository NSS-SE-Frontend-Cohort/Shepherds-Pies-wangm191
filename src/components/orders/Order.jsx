import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getOrderById } from "../../services/orderService"
import { findEmployee, findDeliverer, getSizeById, getCheeseById, getSauceById, getToppingsById, getDeliveryFee } from "../../handlers/handlers"
import { getPizzaById } from "../../services/pizzaService"

export const Order = ({ order, allEmployees }) => {
    const navigate = useNavigate()
    const orderEmployee = findEmployee(order, allEmployees)
    const orderDeliverer = findDeliverer(order, allEmployees)

    const finalPrice = orderDeliverer !=null ? order.price + getDeliveryFee() : order.price

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
                    <div className="order-info">Price: ${finalPrice.toFixed(2)}</div>
                </div>
                <div>
                    <button 
                        className="order-btn"
                        onClick={() => navigate(`/orders/${order.id}`)}
                    >
                        More Info!
                    </button>
                </div>
            </footer>
        </section>
    )
}

export const OrderDetail = ({ allEmployees, allSizes, allCheeses, allSauces, allToppings }) => {
    const { id } = useParams()

    const [order, setOrder] = useState({})
    const [pizzas, setPizzas] = useState([])

    useEffect(() => {
    getOrderById(id).then((data) => {
        const orderObj = data[0]
        setOrder(orderObj)

        if (orderObj?.orderPizzas?.length > 0) {
            const pizzaFetches = orderObj.orderPizzas.map(orderPizza => getPizzaById(orderPizza.pizzaId))

            Promise.all(pizzaFetches).then((pizzaArrays) => {
                const allPizzaData = pizzaArrays.flat()
                setPizzas(allPizzaData)
            })
        }
    })
}, [id])

    const orderEmployee = findEmployee(order, allEmployees)
    const orderDeliverer = findDeliverer(order, allEmployees)
    const finalPrice = orderDeliverer !=null ? order.price + getDeliveryFee() : order.price

    return (
        <div>
            <section className="order order-hollistic">
                    <header className="order-info">Order # {id}</header>
                    <div className="order-info">
                        Date: {new Date(order.dateAndTime).toLocaleString()}
                    </div>
                    <div className="order-info">Employee: {orderEmployee?.fullName}</div>
                    <div className="order-info">{orderDeliverer ? `Delivery by: ${orderDeliverer?.fullName}` : `No delivery required.`}</div>
                    <footer>
                        <div>
                            <div className="order-info">Price: ${order.price?.toFixed(2)}</div>
                        </div>
                        <div>
                            <div className="order-info">Tip: ${order.tip?.toFixed(2)}</div>
                        </div>
                        {/*Loose != operator to check null and undefined, && to check if orderDeliverer is truthy (exists)*/}
                        {orderDeliverer != null && (
                            <div>
                                <div className="order-info">Delivery Fee: ${getDeliveryFee().toFixed(2)}</div>
                            </div>
                        )}
                        <div>
                            <div className="order-info">Total Price: ${finalPrice?.toFixed(2)}</div>
                        </div>
                    </footer>
            </section>
            {pizzas.map((pizza, index) => {
                const pizzaSize = getSizeById(pizza.sizeId, allSizes)
                const toppings = getToppingsById(pizza.pizzaToppings.map(pizzaTopping => pizzaTopping.toppingId), allToppings)
                const toppingTypes = []
                let pizzaPrice = pizzaSize.cost
                toppings.map((topping) => {
                    toppingTypes.push(topping.type + " ")
                    return pizzaPrice += topping.cost
                }) 
                return (
                    <section key={pizza.id} className="order">
                            <header className="order-info">Pizza # {index + 1}</header>
                            <div className="order order-item">
                                <div className="order-info">Pizza Size: {pizzaSize.type}</div>
                                <div className="order-info">Cheese: {getCheeseById(pizza.cheeseId, allCheeses).type}</div>
                                <div className="order-info">Sauces: {getSauceById(pizza.sauceId, allSauces).flavor}</div>
                                <div className="order-info">Toppings: {toppingTypes.length ? toppingTypes : "None"}</div>
                                <footer>
                                    <div>
                                        <div className="order-info">Pizza Price: ${pizzaPrice.toFixed(2)}</div>
                                    </div>
                                </footer>
                            </div>
                    </section>
                )
            }) 
            }
        </div>
    )

}