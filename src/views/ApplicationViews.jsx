import { Routes, Route, Outlet } from "react-router-dom"
import { Welcome } from "../welcome/Welcome"
import { AllOrders } from "../components/orders/AllOrders"
import { MyOrders } from "../components/orders/MyOrders"
import { NavBar } from "../components/navbar/NavBar"
import { OrderDetail } from "../components/orders/Order"
import { getAllEmployees } from "../services/employeeService"
import { getAllTables } from "../services/tableService"
import { getAllOrders } from "../services/orderService"
import { useState, useEffect } from "react"
import { getAllCheeses, getAllSizes, getAllSauces, getAllToppings } from "../services/pizzaService"
import { CreateOrder } from "../components/orders/CreateOrder"
import { EditOrder } from "../components/orders/EditOrder"
import { OptionList } from "../lists/OptionList"
import { getAllPizzaToppings } from "../services/pizzaToppingService"


export const ApplicaionViews = () => {
    const [currentUser, setCurrentUser] = useState({})
    const [allOrders, setAllOrders] = useState([])
    //const [allOrderPizzas, setAllOrderPizzas] = useState([])
    const [allPizzaToppings, setAllPizzaToppings ] = useState([])
    const [allEmployees, setAllEmployees] = useState([])
    const [allTables, setAllTables] = useState([])
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

        // getAllOrderPizzas().then((orderPizzasArray) => {
        //     setAllOrderPizzas(orderPizzasArray)
        // })

        getAllPizzaToppings().then((pizzaToppingsArray) => {
            setAllPizzaToppings(pizzaToppingsArray)
        })

        getAllEmployees().then((employeesArray) => {
            setAllEmployees(employeesArray)
        })

        getAllTables().then((tablesArray) => {
            setAllTables(tablesArray)
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
                            allTables={allTables}
                        />}
                    />
                    <Route path=":id" element={
                        <OrderDetail
                            allPizzaToppings={allPizzaToppings}
                            allEmployees={allEmployees}
                            allTables={allTables}
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
                            allTables={allTables}
                            getAndSetAllOrders={getAndSetAllOrders}
                        />}
                    />
                </Route> 
                <Route path="create" element={
                    <CreateOrder 
                        currentUser={currentUser}
                        allEmployees={allEmployees}
                        allTables={allTables}
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
                            allTables={allTables}
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