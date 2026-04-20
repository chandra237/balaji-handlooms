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
        <form onSubmit={handleSubmit} className="border p-4 rounded-lg space-y-3">

            <input name="name" value={formData.name} placeholder="Name" onChange={handleChange} className="input border mx-3 pl-2 rounded-md space-y-3" />
            <input name="phone" value={formData.phone} placeholder="Phone" onChange={handleChange} className="input border mx-3 pl-2 rounded-md space-y-3" />
            <input name="street" value={formData.street} placeholder="Street" onChange={handleChange} className="input border mx-3 pl-2 rounded-md space-y-3" />
            <input name="city" value={formData.city} placeholder="City" onChange={handleChange} className="input border mx-3 pl-2 rounded-md space-y-3" />
            <input name="state" value={formData.state} placeholder="State" onChange={handleChange} className="input border mx-3 pl-2 rounded-md space-y-3" />
            <input name="pincode" value={formData.pincode} placeholder="Pincode" onChange={handleChange} className="input border mx-3 pl-2 rounded-md space-y-3" />

            <label className="flex items-center gap-2 ml-3">
                <input type="checkbox" checked={formData.isDefault} name="isDefault" onChange={handleChange} />
                Set as default
            </label>

            <button className="bg-black text-white px-4 py-2 rounded ml-3">
                {addressSaving? "Saving..." : "Save Address"}
            </button>
        </form>
    );
}

export default AddressForm;