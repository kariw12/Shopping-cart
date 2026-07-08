import { createContext, useState } from 'react';

const AppContext = createContext(null);

function AppProvider({ children }){

    const [cart, setCart] = useState([]);
    const [filterProducts, setFilterProducts] = useState("");

    

    return (
        <AppContext.Provider
            value={{
                cart,
                setCart,
                filterProducts,
                setFilterProducts,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppProvider}

