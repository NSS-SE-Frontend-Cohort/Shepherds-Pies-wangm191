import { Routes, Route, Outlet } from "react-router-dom"
import { Welcome } from "../welcome/Welcome"
import { AllOrders } from "../components/orders/AllOrders"
import { NavBar } from "../components/navbar/NavBar"

export const ApplicaionViews = () => {

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
                    <Route index element={<AllOrders />} />
                </Route>
            </Route>
        </Routes>
    )
}