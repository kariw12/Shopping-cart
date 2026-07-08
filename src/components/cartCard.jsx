import { Trash2 } from 'lucide-react';



import "../styles/cart-card.css"


function CartCard({image, title, price, quantity, onDelete, onTake, onAdd, onSeeProduct}){

    return(
        <div className="cardCart-container">
            <div className="left-side">
                <div onClick={onSeeProduct} className="image-cart-container">
                    <img src={image} alt="image of product" />
                </div>
                <div className='details'>
                    <div onClick={onSeeProduct} className="cart-title">{title}</div>
                    <div onClick={onSeeProduct} className="cart-price">{price} DKK</div>
                    <div className='add-or-take'>
                        <button onClick={onTake} className='minus'>-</button>
                        <div className="cart-number">quantity: {quantity}</div>
                        <button onClick={onAdd} className='pluss'>+</button>
                    </div>
                </div>
            </div>
            <div className="rigth-side">
                <Trash2 onClick={onDelete} className='trash' />
            </div>
        </div>
    )
}


export default CartCard