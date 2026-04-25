import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrder } from "../services/orderService";
import { useAuth } from "../context/authContext";

function OrderDetailsPage() {

    const { orderId } = useParams();
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    const [order, setOrder] = useState(null);

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
    };

    if (!order) return <p className="text-center pt-24">Loading.., please wait!!</p>;

    return (
        <div className="max-w-4xl mx-auto py-10">

            <h1 className="text-2xl font-bold text-green-600 mb-4">
                Order Details: 
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

export default OrderDetailsPage;