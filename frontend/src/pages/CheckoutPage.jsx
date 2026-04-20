import { useEffect, useState } from "react";
import { useCart } from "../context/cartContext";
import { getCart } from "../services/cartService";
import OrderSummary from "../components/OrderSummary";
import AddressList from "../components/AddressList";


function CheckoutPage(){

    const { setCartCount } = useCart();
    const [selectedAddress, setSelectedAddress] =useState(null);
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

    return(
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-3 gap-8">

            {/* Address List */}
            <div className="col-span-2 space-y-6">

                {/* Address */}
                <div className="p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>

                    <AddressList selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress}/>

                </div>

            </div>

            {/* Order Summary */}
            <div>
                <OrderSummary cart={cart} selectedAddress={selectedAddress} />
            </div>

        </div>
    )
}

export default CheckoutPage;