import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import { getCart } from "../services/cartService";
import { useCart } from "../context/cartContext";
import { Link } from "react-router-dom";
import { updateCartItem, removeCartItem } from "../services/cartService";
import toast from "react-hot-toast";
import { useAuth } from "../context/authContext";

function CartPage( { requireAuth }){

    const { cart, updateCart } = useCart();
    const { isLoggedIn } = useAuth();

    const handleUpdateQuantity = async (itemId, quantity) => {
        try{
            const data = await updateCartItem(itemId, quantity);
            
            const updatedCart = await getCart(); 
            updateCart(updatedCart);
        }
        catch(err){
            console.error(err);
        }
    };

    const removeItemFromCart = async (itemId) => {
        try{
            const data = await removeCartItem(itemId);

            const updatedCart = await getCart(); 
            updateCart(updatedCart);

            toast.success("Item removed from cart");   
        }
        catch(err){
            toast.error("Failed to remove item from cart");
            console.log(err);
        }
    }

    if(!cart || cart?.cartItems?.length === 0){
        return (
            <div className="max-w-4xl mx-auto py-20 text-center">
                <h2 className="text-2xl font-semibold mb-4">
                    Your cart is empty
                </h2>

                <p className="text-gray-600 mb-6">
                    Looks like you haven't added anything yet.
                </p>

                <Link
                    to="/products"
                    className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
                >
                    Continue Shopping
                </Link>
            </div>
        )
    }
    else{
        return(
            <div className="max-w-7xl mx-auto px-6 py-12">
    
                <h2 className="text-2xl font-semibold mb-10">
                    Shopping Cart({cart?.totalItems})
                </h2>
    
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
    
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {cart && cart?.cartItems?.map((item) => (
                            <CartItem key={item.itemId} item={item} onUpdate={handleUpdateQuantity} onRemove={removeItemFromCart}/>
                        ))}
                    </div>
    
                    {/* Summary */}
                    {cart && <CartSummary cart={cart} requireAuth={requireAuth}/>}
    
                </div>
            </div>
        );
    }

}

export default CartPage;