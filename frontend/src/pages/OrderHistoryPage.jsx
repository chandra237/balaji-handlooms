import { useEffect, useState } from "react";
import { useNavigate, Link} from "react-router-dom";
import { getOrders } from "../services/orderService";
import { useAuth } from "../context/authContext";

function OrderHistoryPage() {

    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn]);

    const fetchOrders = async () => {
        const data = await getOrders();
        setOrders(data);
    };

    return (
        <div className="max-w-4xl mx-auto py-10">

            <h1 className="text-2xl font-bold mb-6">My Orders</h1>

            {orders.length === 0 ? (
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-gray-600 mb-6">
                        Looks like you haven't ordered anything yet.
                    </p>
                    <Link
                        to="/products"
                        className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
                    >
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map(order => (
                        <div
                            key={order.id}
                            onClick={() => navigate(`/orders/${order.id}`)}
                            className="border p-4 rounded-lg cursor-pointer hover:shadow"
                        >
                            <p className="font-medium">Order #{order.id}</p>
                            <p className="text-sm text-gray-600">
                                {new Date(order.createdAt).toLocaleString()}
                            </p>
                            <p>Status: {order.status}</p>
                            <p className="font-semibold">
                                ₹{order.totalAmount}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default OrderHistoryPage;