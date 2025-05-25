import { Routes, Route, Outlet } from "react-router-dom"
import { Welcome } from "../welcome/Welcome"
import { AllOrders } from "../components/orders/AllOrders"
import { NavBar } from "../components/navbar/NavBar"
import { OrderDetail } from "../components/orders/Order"
import { getAllEmployees } from "../services/employeeService"
import { useState, useEffect } from "react"
import { getAllCheeses, getAllSizes, getAllSauces, getAllToppings } from "../services/pizzaService"


export const ApplicaionViews = () => {
    const [allEmployees, setAllEmployees] = useState([])
    const [allSizes, setAllSizes] = useState([])
    const [allCheeses, setAllCheeses] = useState([])
    const [allSauces, setAllSauces] = useState([])
    const [allToppings, setAllToppings] = useState([])

    useEffect(() => {
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
            </Route>
        </Routes>
    )
}