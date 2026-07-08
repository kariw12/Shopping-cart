
import { NavLink } from "react-router-dom";




import { ShoppingCart } from 'lucide-react';
import { House } from 'lucide-react';

import { useAppContext } from "../hooks/appContextHook";

import myImage from '../images/logo.png';

import "../styles/navbar.css"


function Navbar(){

    const {filterProducts, setFilterProducts, cart, active, setActive} = useAppContext();

    const total = cart.reduce((acc, item) => acc + item.quantity, 0)

    const handleHome = () => {
        setActive("home");
        setFilterProducts("");
    }

    const handleShopCart = () => {
        setActive("cart");
        setFilterProducts("");
    }

    return(
        <div className="navbar">
            <div className="logo">
                <img src={myImage} alt="my sick logo" />
            </div>

            
            <div className="searchBar">
                <input className="inputLook"
                    type="search"
                    placeholder="Search"
                    value={filterProducts}
                    onChange={(event) => setFilterProducts(event.target.value)}
                />
            </div>

            <div className="linksContainer">

                <div className="linkToHome">
                    <NavLink to="/">
                            <House onClick={handleHome} className={ active === "home" ? "cart active" : "cart"}/>
                    </NavLink>
                </div>

                <div className="linkToShop">
                    <NavLink to="/cart">
                            <div onClick={handleShopCart} className={active === "cart" ? "cart-wrapper active" : "cart-wrapper"} >
                                {cart.length > 0 && <span className="cart-count">{total}</span>}
                                <ShoppingCart className="cart" />
                            </div>
                    </NavLink>
                </div>

            </div>


            
            
        </div>
    )
}

export default Navbar