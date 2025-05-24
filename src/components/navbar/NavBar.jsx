import { Link } from "react-router-dom"

export const NavBar = () => {

    return (
        <ul className="navbar">
            <li className="navbar-item">
                <Link to={"/"}>Home</Link>
            </li>
            <li className="navbar-item"> 
                <Link to={"orders"}>All Orders</Link>
            </li>
        </ul>
    )
}