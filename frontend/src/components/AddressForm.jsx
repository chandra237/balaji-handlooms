import { useState } from "react";
import { addAddress } from "../services/userService";
import toast from "react-hot-toast";

function AddressForm({ onSuccess }) {

    const initialFormData = {
        "name": "",
        "phone": "",
        "street": "",
        "city": "",
        "state": "",
        "pincode": "",
        "isDefault": false
    }

    const [formData, setFormData] = useState(initialFormData);
    const [addressSaving, setAddressSaving] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAddressSaving(true);
        try{
            const data = await addAddress(formData);

            toast.success("Address added successfully");
            setFormData(initialFormData);
            onSuccess(data.id);
        }catch(err){
            toast.error("Failed to add address");
        }
        finally{
            setAddressSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white border rounded-xl p-6 space-y-5 shadow-sm">

            {/* Name */}
            <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
            </div>

            {/* Phone */}
            <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
            </div>

            {/* Street */}
            <div>
                <label className="block text-sm font-medium mb-1">Street Address</label>
                <input
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="Street, Area"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
            </div>

            {/* City + State */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <input
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">State</label>
                    <input
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="State"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>
            </div>

            {/* Pincode */}
            <div>
                <label className="block text-sm font-medium mb-1">Pincode</label>
                <input
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Pincode"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
            </div>

            {/* Default checkbox */}
            <label className="flex items-center gap-2 text-sm">
                <input
                type="checkbox"
                checked={formData.isDefault}
                name="isDefault"
                onChange={handleChange}
                className="accent-black"
                />
                Set as default address
            </label>

            {/* Button */}
            <button
                disabled={addressSaving}
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
            >
                {addressSaving ? "Saving..." : "Save Address"}
            </button>

        </form>
    );
}

export default AddressForm;