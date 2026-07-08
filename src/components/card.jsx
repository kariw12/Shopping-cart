
import { useState } from "react"

import "../styles/card.css"

function Card({title, price, image, onClickAction, onGoToProdct}){


    const [itemNumber, setItemNumber] = useState(1);

    const handleMinusNumber = () => {
        if (itemNumber === 1) return;

        setItemNumber(prev => prev - 1);
    }

    const handlePlussNumber = () => {
        setItemNumber(prev => prev + 1);
    }

    return(
        <div className="cardContainer">
            <div className="imageContainer">
                <img src={image} alt="product image" className="prod-image" onClick={onGoToProdct}/>
            </div>
            <div className="productTitle" onClick={onGoToProdct}>
                {title}
            </div>
            <div className="productPrice" onClick={onGoToProdct}>
                {price} DKK
            </div>

            <div className="adding-multiple-numbers">
                <button onClick={handleMinusNumber} className="minus-button">-</button>
                <input
                    type="number"
                    className="item-number-in"
                    value={itemNumber}
                    min="1"
                    readOnly
                    onChange={(e) => setItemNumber(e.target.value)}
                />
                <button onClick={handlePlussNumber} className="pluss-button">+</button>
            </div>
            
            <button
                onClick={() => {
                        onClickAction(itemNumber);
                        setItemNumber(1);
                        }}
                    className="addToCart">
                Add to cart
            </button>
        </div>
    )
}

export default Card