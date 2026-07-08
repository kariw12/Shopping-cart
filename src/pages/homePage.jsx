
import { useNavigate } from "react-router-dom";

import Card from "../components/card";

import { useAppContext } from "../hooks/appContextHook";

import "../styles/home.css"

function HomePage({products, filterView, setFilterView, sortPrice, setSortPrice}){

   const navigate = useNavigate();

   const {filterProducts, setCart, cart} = useAppContext();


    const search = () =>{
        if(!filterProducts) return products;

        return products.filter(item => (
            item.title.toLowerCase().includes(filterProducts.toLowerCase())
         ))
    }
    
    
    

    
    const handleClick = (id, title, price, description, category, image, itemNumber) => {
        const filterCart = cart.filter(item => (
            item.id === id
        ))
        
        if(filterCart.length > 0){
            setCart(prev => prev.map(item => item.id === id ? {...item, quantity: item.quantity + itemNumber} : item))
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
                    quantity: itemNumber
                }
            ])
        }

    }

    const goProduct = (id) => {
        navigate(`/product/${id}`);
    }

    const sortByPrice = (items) => {
        if(sortPrice === "normal") return items;

        const sorted = [...items];

        if(sortPrice === "highToLow"){
            sorted.sort((a, b) => b.price - a.price)
        }

        if(sortPrice === "lowToHigh"){
            sorted.sort((a, b) => a.price - b.price)
        }

        return sorted;
    }

    const visiableProduct = () =>{
        let items = search();

        if(filterView !== "all"){
            items = items.filter(item => item.category === filterView)
        }

        return sortByPrice(items);
    }

    

    return(
        <div className="filter-container">
        <div className="select-container">
            <div className="filtering-container">
                <div className="sroting-label">Filter:</div>
                <select onChange={(e) => setFilterView(e.target.value)} value={filterView} name="category" id="category">
                    <option value="all">All</option>
                    <option value="men's clothing">Men's Clothing</option>
                    <option value="women's clothing">Women's Clothing</option>
                    <option value="jewelery">Jewelery</option>
                    <option value="electronics">Electronics</option>
                </select>
            </div>
            <div className="sorting-container">
                <div className="sorting-label">Sort price: </div>
                <select onChange={(e) => setSortPrice(e.target.value)} value={sortPrice} name="sorting" id="sorting">
                    <option value="normal">Normal</option>
                    <option value="highToLow">High to Low</option>
                    <option value="lowToHigh">Low to High</option>
                </select>
            </div>
        </div>
        <div className="card-container">
            {visiableProduct().map(item => (
                    <Card title={item.title} price={item.price} image={item.image} key={item.id}
                    onClickAction={(itemNumber) => handleClick(item.id, item.title, item.price, item.description, item.category, item.image, itemNumber)}
                    onGoToProdct={() => goProduct(item.id)}
                    />
                ))
            }
        </div>
        </div>
    )
    
}

export default HomePage


