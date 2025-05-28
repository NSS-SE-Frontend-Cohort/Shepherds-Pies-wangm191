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
import { CreateOrder } from "../components/orders/CreateOrder"
import { EditOrder } from "../components/orders/EditOrder"
import { OptionList } from "../lists/OptionList"


export const ApplicaionViews = () => {
    const [currentUser, setCurrentUser] = useState({})
    const [allOrders, setAllOrders] = useState([])
    const [allEmployees, setAllEmployees] = useState([])
    const [allSizes, setAllSizes] = useState([])
    const [allCheeses, setAllCheeses] = useState([])
    const [allSauces, setAllSauces] = useState([])
    const [allToppings, setAllToppings] = useState([])

    const getAndSetAllOrders = () => {
        getAllOrders().then((ordersArray) => {
            setAllOrders(ordersArray)
        })
    }

    useEffect(() => {
        getAndSetAllOrders()

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
                            getAndSetAllOrders={getAndSetAllOrders}
                        />}
                    />
                </Route> 
                <Route path="create" element={
                    <CreateOrder 
                        currentUser={currentUser}
                        allEmployees={allEmployees}
                        allSizes={allSizes}
                        allCheeses={allCheeses}
                        allSauces={allSauces}
                        allToppings={allToppings}
                        getAndSetAllOrders={getAndSetAllOrders}
                    />}
                />
                <Route path="edit">
                    <Route path=":id" element={
                        <EditOrder 
                            allEmployees={allEmployees}
                            allSizes={allSizes}
                            allCheeses={allCheeses}
                            allSauces={allSauces}
                            allToppings={allToppings}
                            getAndSetAllOrders={getAndSetAllOrders}
                        />
                    }/>
                </Route>
                <Route path="option">
                    <Route path="sizes" element={
                        <OptionList
                            allOptionList={allSizes}
                            optionIndex={1}
                        />
                    }/>
                    <Route path="cheeses" element={
                        <OptionList
                            allOptionList={allCheeses}
                            optionIndex={2}
                        />
                    }/>
                    <Route path="sauces" element={
                        <OptionList
                            allOptionList={allSauces}
                            optionIndex={3}
                        />
                    }/>
                    <Route path="toppings" element={
                        <OptionList
                            allOptionList={allToppings}
                            optionIndex={4}
                        />
                    }/>
                </Route>
            </Route>
        </Routes>
    )
}