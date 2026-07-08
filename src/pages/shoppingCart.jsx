

import { useState } from "react"
import { useNavigate } from "react-router-dom";

import "../styles/cart.css"

import CartCard from "../components/cartCard"

import { useAppContext } from "../hooks/appContextHook";

import CreditCardForm from "../components/creditCardForm";
import Loader from "../components/loader";

function Cart({products, setActiveProduct}){

    const navigate = useNavigate();

    const {cart, setCart, filterProducts, setActive} = useAppContext();

    const [cardNumber, setCardNumber] = useState("");
    const [cardDate, setCardDate] = useState("");
    const [code, setCode] = useState("");

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [billing, setBilling] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(false);

    const [showOrder, setShowOrder] = useState(false);


    
    const [copy, setCopy] = useState(null)

    const handleClick = () => {
        if(!name || !lastName || !billing || code.length !== 3 || cardDate.length !== 7 || cardNumber.length !== 19 ){
            
            setError(true);

            return
        }

        setError(false);

        setLoading(true);


        const order = {
            name,
            lastName,
            billing,
            total: getTotal(),
            items: cart
        }

        setCopy(order);

        setCart([]);


        setTimeout(() => {
            setLoading(false);
            setShowOrder(true);
        }, 3000)

        

    }


    const getTotal = () => {
        return cart.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2);
    }

    const search = () =>{
        if(!filterProducts) return cart

        return cart.filter(item => (
            item.title.toLowerCase().includes(filterProducts.toLowerCase())
         ))
    }

    const handleDelete = (id) => {
        setCart(cart.filter(item => item.id !== id));
    }

    const handleTake = (id) => {
        const myItem = cart.find(item => item.id === id);
        if(myItem.quantity > 1){
            setCart(prev => prev.map(item => item.id === id ? {...item, quantity: item.quantity - 1} : item ))
        }
    }

    const handleAdd = (id) => {
        setCart(prev => prev.map(item => item.id === id ? {...item, quantity: item.quantity + 1} : item ))
    }

    const goToProduct = (id) => {
        const item = products.find(item => item.id === id);
        setActiveProduct(item);
        setActive("product");
        navigate("/product");
    }


    return(
        <div className="page-container">
            <div className="price-container">
                <div className={cart.length > 0 ? "cart-container addBorder" : "cart-container"}>
                    {search().map(item => (
                        
                        <div className="cart-items-container" key={item.id}>
                            <CartCard 
                                image={item.image} title={item.title} price={item.price} quantity={item.quantity}
                                onDelete={ () => handleDelete(item.id)}
                                onTake={() => handleTake(item.id)}
                                onAdd={() => handleAdd(item.id)}
                                onSeeProduct={() => goToProduct(item.id)}
                            />
                        </div>
                        
                    ))}
                </div>
                {cart.length > 0 && <div className="total-price">Total: {getTotal()} DKK</div>}
                
            </div>
            
            <div className="order-container">
                {cart.length > 0 && !loading &&
                    <CreditCardForm 
                        total={getTotal()}
                        cardNumber={cardNumber} setCardNumber={setCardNumber}
                        cardDate={cardDate} setCardDate={setCardDate}
                        code={code} setCode={setCode}
                        name={name} setName={setName}
                        lastName={lastName} setLastName={setLastName}
                        billing={billing} setBilling={setBilling}
                        error={error}
                        handleClick={handleClick}
                    />
                }
                
                {loading &&
                    <div className="loading">
                        <Loader />
                        <div>Completing Order...</div>
                    </div>
                }

                {showOrder &&
                    <div className="show-order">
                        <div className="medium">To: {copy.name} {copy.lastName}</div>
                        <div className="medium">Billing Address: {copy.billing}</div>
                        <div className="medium">Total: {copy.total}</div>
                        <div className="medium">Shipping Price: 0</div>
                        <div className="medium">SubTotal: {copy.total}</div>
                        <div className="medium">Shipping time: 10 days</div>
                        <div className="items">
                            Order:
                            {copy.items.map((item, index) => (
                                <div>{index + 1} - {item.title}</div>
                            ))}
                        </div>
                        <div className="bigger">Thank You For Ordering From Web Juice</div>
                    </div>
                }
            </div>
            
        </div>
    )
}

export default Cart