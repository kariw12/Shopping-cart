import { createContext, useState } from 'react';

const AppContext = createContext(null);

function AppProvider({ children }){

    const [cart, setCart] = useState([]);
    const [filterProducts, setFilterProducts] = useState("");

    const [active, setActive] = useState(() => {
        if (location.pathname === "/cart") return "cart";
        if (location.pathname === "/") return "home";
        if (location.pathname === "/product") return "product";
        return ""
    })

    return (
        <AppContext.Provider
            value={{
                cart,
                setCart,
                filterProducts,
                setFilterProducts,
                active,
                setActive
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppProvider}

