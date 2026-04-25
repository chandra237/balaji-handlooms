import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getOrder } from "../services/orderService";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext";
import { getCart } from "../services/cartService";

function OrderSuccessPage() {

    const { orderId } = useParams();
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    const [order, setOrder] = useState(null);
    const { updateCart } = useCart();

    useEffect(() => {
        fetchOrder();
    }, []);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn]);

    const fetchOrder = async () => {
        const data = await getOrder(orderId);
        setOrder(data);

        const updatedCart = await getCart();
        updateCart(updatedCart);
    };

    if (!order) return (
        <div className="text-center my-16">
            <p className="text-gray-600 mb-10">
                Your order successfully placed, Please go to 'My Orders' section.
            </p>
            <Link
                to="/orders"
                className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
            >
                View Orders
            </Link>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto py-10">

            <h1 className="text-2xl font-bold text-green-600 mb-4">
                Order Placed Successfully 🎉
            </h1>

            <p className="mb-6">Order ID: {order.orderId}</p>

            {/* Address */}
            <div className="border p-4 rounded mb-4">
                <h2 className="font-semibold mb-2">Delivery Address</h2>
                <p>{order.address.name}</p>
                <p>{order.address.phone}</p>
                <p>
                    {order.address.street}, {order.address.city}
                </p>
            </div>

            {/* Items */}
            <div className="border p-4 rounded mb-4">
                <h2 className="font-semibold mb-2">Items</h2>

                {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between mb-2">
                        <span>{item.productName} ( x{item.quantity})</span>
                        <span>₹{item.subtotal}</span>
                    </div>
                ))}
            </div>

            <h3 className="text-lg font-bold">
                Total: ₹{order.totalAmount}
            </h3>

            <div className="flex gap-2">  
                <button
                    onClick={() => navigate("/orders")}
                    className="mt-6 bg-black text-white px-4 py-2 rounded"
                >
                    View Orders
                </button>
                <button
                    onClick={() => navigate("/")}
                    className="mt-6 px-4 py-2 rounded border"
                >
                    Back to Home
                </button>
            </div>

        </div>
    );
}

export default OrderSuccessPage;