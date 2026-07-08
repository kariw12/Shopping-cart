import { useState, useEffect } from "react";

import HomePage from "./pages/homePage";
import Cart from "./pages/shoppingCart";

import { AppProvider } from "./context/appContext";

import ProductPage from "./pages/productPage";

import Layout from "./components/layout";




import { createBrowserRouter, RouterProvider } from "react-router-dom";




function App(){

    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(true);
    

    const [filterView, setFilterView] = useState("all");
    const [sortPrice, setSortPrice] = useState("normal");


    useEffect(() => {

        const fetchData = async () => {
            try{
                const local = localStorage.getItem('data');
                if(local){
                    setProducts(JSON.parse(local));
                } else{
                    const response = await fetch('https://fakestoreapi.com/products');
                    const data = await response.json();
                    if(data){
                        setProducts(data)
                        localStorage.setItem('data', JSON.stringify(data));
                    }
                }
            } catch(error){
                console.log(error)
            }
            setProductsLoading(false);
        }

        fetchData()

        
    }, [])


    const router = createBrowserRouter([
        {
            element: <Layout />,
            children: [
                {
                    path: "/", element: <HomePage products={products} setProducts={setProducts}
                    filterView={filterView} setFilterView={setFilterView}
                    sortPrice={sortPrice} setSortPrice={setSortPrice}/>
                },
                {
                    path: "/Cart", element: <Cart />
                },
                {
                    path: "/product/:id",
                    element: <ProductPage products={products} loading={productsLoading}/>
                }
            ]
        }
    ])

    return (
            <AppProvider >
                <RouterProvider router={router} />
            </AppProvider>
            
        )
}

export default App