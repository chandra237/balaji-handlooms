import { createContext, useContext, useState, useEffect } from "react";
import { openCartPage } from "../services/cartService";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);
    useEffect(()=>{
        openCartPage()
            .then((data) => {
                setCartCount(data.totalItems);
            })
            .catch((err)=>{
                console.error(err);
            });
    },[]);

    return (
        <CartContext.Provider value={{ cartCount, setCartCount }}>
            {children}
        </CartContext.Provider>
    )
};

export const useCart = () => useContext(CartContext);