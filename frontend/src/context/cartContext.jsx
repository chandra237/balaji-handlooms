import { createContext, useContext, useState, useEffect } from "react";
import { getCart } from "../services/cartService";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);
    useEffect(()=>{
        getCart()
            .then((data) => {
                setCartCount(data.totalItems);
            })
            .catch((err)=>{
                console.error(err);
            });
    },[cartCount]);

    return (
        <CartContext.Provider value={{ cartCount, setCartCount }}>
            {children}
        </CartContext.Provider>
    )
};

export const useCart = () => useContext(CartContext);