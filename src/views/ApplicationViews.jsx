import { Routes, Route, Outlet } from "react-router-dom"
import { Welcome } from "../welcome/Welcome"
import { AllOrders } from "../components/orders/AllOrders"
import { MyOrders } from "../components/orders/MyOrders"
import { NavBar } from "../components/navbar/NavBar"
import { OrderDetail } from "../components/orders/Order"
import { getAllEmployees } from "../services/employeeService"
import { getAllOrders } from "../services/orderService"
import { useState, useEffect } from "react"
import { getAllCheeses, getAllSizes, getAllSauces, getAllToppings } from "../services/pizzaService"


export const ApplicaionViews = () => {
    const [currentUser, setCurrentUser] = useState({})
    const [allOrders, setAllOrders] = useState([])
    const [allEmployees, setAllEmployees] = useState([])
    const [allSizes, setAllSizes] = useState([])
    const [allCheeses, setAllCheeses] = useState([])
    const [allSauces, setAllSauces] = useState([])
    const [allToppings, setAllToppings] = useState([])

    useEffect(() => {
         getAllOrders().then((ordersArray) => {
            setAllOrders(ordersArray)
        })

        getAllEmployees().then((employeesArray) => {
            setAllEmployees(employeesArray)
        })

        getAllSizes().then((sizesArray) => {
            setAllSizes(sizesArray)
        })

        getAllCheeses().then((cheesesArray) => {
            setAllCheeses(cheesesArray)
        })

        getAllSauces().then((saucesArray) => {
            setAllSauces(saucesArray)
        })

        getAllToppings().then((toppingsArray) => {
            setAllToppings(toppingsArray)
        })
    }, [])

    useEffect(() => {
        const localShepherdUser = localStorage.getItem("shepherd_user")
        const shepherdUserObj = JSON.parse(localShepherdUser)

        setCurrentUser(shepherdUserObj)
    }, [])

    return (
        <Routes>
            <Route 
                path="/"
                element={
                    <>
                        <NavBar />
                        <Outlet />
                    </>
                }
            >    
                <Route index element={<Welcome />} />
                <Route path="orders">
                    <Route index element={
                        <AllOrders
                            allOrders={allOrders}
                            allEmployees={allEmployees}
                        />}
                    />
                    <Route path=":id" element={
                        <OrderDetail
                            allEmployees={allEmployees}
                            allSizes={allSizes}
                            allCheeses={allCheeses}
                            allSauces={allSauces}
                            allToppings={allToppings}
                        />}
                    />
                </Route>
                <Route path="user">
                    <Route index element={
                        <MyOrders 
                            currentUser={currentUser}
                            allOrders={allOrders}
                            allEmployees={allEmployees}
                        />}
                    />
                </Route> 
            </Route>
        </Routes>
    )
}