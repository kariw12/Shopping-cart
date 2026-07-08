import { useState } from "react";

import HomePage from "./pages/homePage";
import Cart from "./pages/shoppingCart";

import { AppProvider } from "./context/appContext";

import ProductPage from "./pages/productPage";

import Layout from "./components/layout";




import { createBrowserRouter, RouterProvider } from "react-router-dom";




function App(){

    const [products, setProducts] = useState([]);
    
    const [activeProduct, setActiveProduct] = useState(null);

    const [filterView, setFilterView] = useState("all");
    const [sortPrice, setSortPrice] = useState("normal");





    const router = createBrowserRouter([
        {
            element: <Layout />,
            children: [
                {
                    path: "/", element: <HomePage products={products} setProducts={setProducts}
                    setActiveProduct={setActiveProduct} filterView={filterView} setFilterView={setFilterView}
                    sortPrice={sortPrice} setSortPrice={setSortPrice}/>
                },
                {
                    path: "/Cart", element: <Cart products={products} setActiveProduct={setActiveProduct} />
                },
                {
                    path: "/product",
                    element: <ProductPage activeProduct={activeProduct}/>
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