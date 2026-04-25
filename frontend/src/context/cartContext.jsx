import { createContext, useContext, useState, useEffect } from "react";
import { getCart } from "../services/cartService";
import { useAuth } from "./authContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);
    const [cart, setCart] = useState({
        cartItems: [],
        subTotal: 0,
        totalItems: 0
    })
    const { isLoggedIn, user } = useAuth();
    
    useEffect(()=>{
        if (user?.role === "ROLE_ADMIN") {
            return;
        }
        getCart()
            .then((data) => {
                setCart(data);
                setCartCount(data.totalItems);
            })
            .catch((err)=>{
                console.error(err);
            });
    },[isLoggedIn, user]);

    const updateCart = (data) => {
        setCart(data);
        setCartCount(data.totalItems);
    }

    return (
        <CartContext.Provider value={{ cartCount, cart, setCart, updateCart }}>
            {children}
        </CartContext.Provider>
    )
};

export const useCart = () => useContext(CartContext);