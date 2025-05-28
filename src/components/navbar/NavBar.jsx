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
            <li className="navbar-item">
                <Link to={"user"}>My Orders</Link>
            </li>
            <li className="navbar-item">
                <Link to={"create"}>Create Order</Link>
            </li>
            <li className="navbar-item">
                <Link to={"option/sizes"}>All Sizes</Link>
            </li>
            <li className="navbar-item">
                <Link to={"option/cheeses"}>All Cheeses</Link>
            </li>
            <li className="navbar-item">
                <Link to={"option/sauces"}>All Sauces</Link>
            </li>
            <li className="navbar-item">
                <Link to={"option/toppings"}>All Toppings</Link>
            </li>
            {localStorage.getItem("honey_user") ? (
            <li className="navbar-item navbar-logout">
                <Link
                    className="navbar-link"
                    to=""
                    onClick={() => {
                        localStorage.removeItem("shepherd_user")
                        navigate("/", { replace: true })
                    }}
                >
                    Logout
                </Link>
            </li>
        ) : (
            ""
        )}
        </ul>
    )
}