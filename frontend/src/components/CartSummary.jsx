import { Link } from "react-router-dom";

function CartSummary({ cart }) {

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
      <Link to="/checkout">
        <button className="w-full mt-6 bg-black text-white py-3 rounded-md hover:bg-gray-800 transition">
          Proceed to Checkout
        </button>
      </Link>

    <Link to="/products">
      <p className="text-center text-sm text-gray-500 mt-4 cursor-pointer hover:underline">
        Continue Shopping
      </p>
    </Link>

    </div>
  );
}

export default CartSummary;