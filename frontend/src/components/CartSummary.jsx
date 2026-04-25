import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

function CartSummary({ cart, requireAuth }) {

  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleCheckout = () => {
    if(isLoggedIn){
      requireAuth(() => navigate("/checkout"));
    }else{
      requireAuth(() => navigate("/cart"));  
    }
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
      <button onClick={handleCheckout} className="w-full mt-6 bg-black text-white py-3 rounded-md hover:bg-gray-800 transition">
        Proceed to Checkout
      </button>

    <Link to="/products">
      <p className="text-center text-sm text-gray-500 mt-4 cursor-pointer hover:underline">
        Continue Shopping
      </p>
    </Link>

    </div>
  );
}

export default CartSummary;