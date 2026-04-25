import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import { placeOrder } from "../services/orderService";
import { useCart } from "../context/cartContext";
import { getCart } from "../services/cartService";

function OrderSummary({ cart, selectedAddress }) {

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { updateCart } = useCart();

  const confirmOrder = async () => {
    try{
      setLoading(true);

      const data = await placeOrder(selectedAddress);

      const updatedCart = await getCart(); 
      updateCart(updatedCart);
      
      navigate(`/order-success/${data.orderId}`);
      
      toast.success("Order placed!!");
    }
    catch(err){
      console.error(err);
      toast.error("Failed to place order");
    }
    finally{
      setShowConfirmModal(false);
      setLoading(false);
    }
  }

  const handlePlaceOrder = () => {
    if(!selectedAddress){
      alert("Please select address to proceed");
      return;
    }
    setShowConfirmModal(true);
  }

  return (
    <div className="border rounded-lg p-6 h-fit sticky top-24">

      <h2 className="text-lg font-semibold mb-5">
        Order Summary
      </h2>

      <div className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span>₹{cart.subTotal}</span>
      </div>

      <div className="flex justify-between mb-2">
        <span>Shipping</span>
        <span>Free</span>
      </div>

      <hr className="my-4" />

      <div className="flex justify-between text-lg font-semibold">
        <span>Total</span>
        <span>₹{cart.subTotal}</span>
      </div>
      <button onClick={handlePlaceOrder} className="w-full mt-6 bg-black text-white py-3 rounded-md hover:bg-gray-800 transition" disabled={!selectedAddress}>
        Place Order
      </button>

      {showConfirmModal && (
        <ConfirmModal 
          onConfirm={confirmOrder} 
          onCancel={() => showConfirmModal(false)}
          loading={loading}
         />
      )}

    </div>

  );
}

export default OrderSummary;