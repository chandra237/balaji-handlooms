import { useState } from "react";
import toast from "react-hot-toast";
import { registerUser } from "../services/authService";

function SignupForm( {onSuccess}) {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{

            await registerUser(formData);
    
            toast.success("Signup Success, please login");
            onSuccess();
        }
        catch(err){
            console.error(err.message);
            toast.error(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">

            <input name="name" placeholder="Name" onChange={handleChange} className="w-full border rounded-lg p-2" />
            <input name="email" placeholder="Email" onChange={handleChange} className="w-full border rounded-lg p-2" />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full border rounded-lg p-2" />

            <button className="w-full bg-black text-white rounded-lg py-2">
                Signup
            </button>

        </form>
    );
}

export default SignupForm;