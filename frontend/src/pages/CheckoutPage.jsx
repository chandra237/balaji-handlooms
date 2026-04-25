import { useEffect, useState } from "react";
import { useCart } from "../context/cartContext";
import { getCart } from "../services/cartService";
import OrderSummary from "../components/OrderSummary";
import AddressList from "../components/AddressList";
import { useAuth } from "../context/authContext";


function CheckoutPage(){

    const { cart, updateCart } = useCart();
    const { isLoggedIn } = useAuth();
    const [selectedAddress, setSelectedAddress] =useState(null);

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