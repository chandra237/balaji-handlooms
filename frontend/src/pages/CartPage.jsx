import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import { getCart } from "../services/cartService";
import { useCart } from "../context/cartContext";
import { Link } from "react-router-dom";
import { updateCartItem, removeCartItem } from "../services/cartService";
import toast from "react-hot-toast";

function CartPage(){

    const { setCartCount } = useCart();
    const [cart, setCart] = useState({
        cartItems: [],
        subTotal: 0,
        totalItems: 0
    });

    useEffect(()=>{
        getCart()
            .then((data) => {
                setCart(data);
                setCartCount(data.totalItems);
            })
            .catch((err)=>{
                console.error(err);
            });
    },[]);

    const handleUpdateQuantity = async (itemId, quantity) => {
        try{
            const data = await updateCartItem(itemId, quantity);
    
            setCartCount(data.totalItems);
            setCart(prev => {
                const updatedItems = prev.cartItems
                    .map(item =>
                        item.itemId === itemId
                            ? {
                                ...item,
                                quantity: quantity,
                                subtotal: item.price * quantity
                            }
                            : item
                    )
                    .filter(item => item.quantity > 0);

                const totalItems = updatedItems.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                );

                const subTotal = updatedItems.reduce(
                    (sum, item) => sum + item.subtotal,
                    0
                );

                return {
                    ...prev,
                    cartItems: updatedItems,
                    totalItems,
                    subTotal
                };
            });
        }
        catch(err){
            console.error(err);
        }
    };

    const removeItemFromCart = async (itemId) => {
        try{
            const data = await removeCartItem(itemId);

            setCartCount(data.totalItems);
            toast.success("Item removed from cart");
            setCart(prev => {

                const updatedItems = prev.cartItems.filter(
                    item => item.itemId !== itemId
                );

                const totalItems = updatedItems.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                );

                const subTotal = updatedItems.reduce(
                    (sum, item) => sum + item.subtotal,
                    0
                );

                return {
                    ...prev,
                    cartItems: updatedItems,
                    totalItems,
                    subTotal
                };
            });
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
                    {cart && <CartSummary cart={cart}/>}
    
                </div>
            </div>
        );
    }

}

export default CartPage;