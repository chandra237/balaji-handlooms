import { useState } from "react";
import { loginUser } from "../services/authService";
import { getCart, mergeCarts } from "../services/cartService";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";
import { useCart } from "../context/cartContext";

function LoginForm({ onSuccess }) {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const { login } = useAuth();
    const { updateCart } = useCart();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{

            const data = await loginUser(formData);
    
            login(data);
    
            await mergeCarts(); //merge carts

            const updatedCart = await getCart();
            updateCart(updatedCart);
    
            
            toast.success("Logged in successfully");
        }
        catch(err){
            console.error(err.message);
            toast.error(err.message);
        }
        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">

            <input name="email" placeholder="Email" onChange={handleChange} className="w-full border rounded-lg p-2" />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full border rounded-lg p-2" />

            <button className="w-full bg-black text-white py-2 rounded-lg">
                Login
            </button>

        </form>
    );
}

export default LoginForm;