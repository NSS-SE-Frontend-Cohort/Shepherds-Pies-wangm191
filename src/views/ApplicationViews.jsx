import { Routes, Route, Outlet } from "react-router-dom"
import { Welcome } from "../welcome/Welcome"
import { AllOrders } from "../components/orders/AllOrders"

export const ApplicaionViews = () => {

    return (
        <Routes>
            <Route 
                path="/"
                element={
                    <>
                        <Outlet />
                    </>
                }
            >    
            </Route>
            <Route index element={<Welcome />} />
            <Route path="orders">
                <Route index element={<AllOrders />} />
            </Route>
        </Routes>
    )
}