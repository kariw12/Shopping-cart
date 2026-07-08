import { useState } from "react"

import "../styles/productPage.css"

import { useAppContext } from "../hooks/appContextHook";

function ProductPage({activeProduct}){

    const {cart, setCart} = useAppContext();

    const [itemNumber, setItemNumber] = useState(1);

    const handleClick = (id, title, price, description, category, image) => {
        const filterCart = cart.filter(item => (
            item.id === id
        ))
        
        if(filterCart.length > 0){
            setCart(prev => prev.map(item => item.id === id ? {...item, quantity: item.quantity + Number(itemNumber)} : item))
        } else{
            setCart(prev => [
                ...prev,
                {
                    id: id,
                    title: title,
                    price: price,
                    description: description,
                    category: category,
                    image: image,
                    quantity: Number(itemNumber)
                }
            ])
        }

        setItemNumber(1);
    }


    const handleAddToItems = () => {
        setItemNumber(prev => prev + 1);
    }

    const handleTakeFromItems = () => {
        if(itemNumber === 1) return

        setItemNumber(prev => prev - 1);
    }


    

    return(
        <div className="productPage-container">
            <div className="left-side-prod-page">
                <div className="image-view-prod-page">
                    <img src={activeProduct.image} alt={activeProduct.description} />
                </div>
                <div className="product-title-prod-page">
                    {activeProduct.title}
                </div>
            </div>
            <div className="right-side-prod-page">
                <div className="prod-describe">{activeProduct.description}</div>
                <div className="price-and-cart">
                    <div className="prod-price">{activeProduct.price} DKK</div>
                    <div className="adding-multiple">
                        <button onClick={handleTakeFromItems} className="minus-button">-</button>
                        <input
                        className="item-number"
                            type="number"
                            value={itemNumber}
                            min="1"
                            readOnly
                            onChange={(e) => setItemNumber(e.target.value)}
                        />
                        <button onClick={handleAddToItems} className="pluss-button">+</button>
                    </div>
                    <button 
                        onClick={() => handleClick(activeProduct.id, activeProduct.title, activeProduct.price, activeProduct.description, activeProduct.category, activeProduct.image)}
                        className="prod-add-to-cart">
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductPage