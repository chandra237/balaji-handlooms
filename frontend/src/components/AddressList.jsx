import { useState, useEffect } from "react";
import { getAddresses } from "../services/userService";
import AddressForm from "./AddressForm";

function AddressList({ selectedAddress, setSelectedAddress}){
    
    const [addresses, setAddresses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [addressLoading, setAddressLoading] = useState(false);

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async (newAddressId = null) => {
        setAddressLoading(true);
        try {
            const data = await getAddresses();
            setAddresses(data);

            if (newAddressId !== null) {
                setSelectedAddress(newAddressId);
            } else {
                const defaultAdd = data.find(a => a.isDefault);
                if (defaultAdd) {
                    setSelectedAddress(defaultAdd.id);
                }
            }

            setShowForm(false);
        } catch (err) {
            console.error(err);
        } finally {
            setAddressLoading(false);
        }
    }

    if(addressLoading){
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="border rounded-lg p-4 animate-pulse">
                        <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                ))}
            </div>
        );
    }


    return(
        <div className="space-y-4">

            {addresses && addresses.map((addr) => (
                <label
                    key={addr.id}
                    className={`block border rounded-lg p-4 cursor-pointer 
                    ${selectedAddress === addr.id ? "border-black bg-gray-50" : ""}`}
                >
                    <input
                        type="radio"
                        name="address"
                        value={addr.id}
                        checked={selectedAddress === addr.id}
                        onChange={() => setSelectedAddress(addr.id)}
                        className="mr-3"
                    />

                    <div>
                        <p className="font-medium">{addr.name}</p>
                        <p className="text-sm text-gray-600">{addr.phone}</p>
                        <p className="text-sm text-gray-600">
                            {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
                        </p>
                    </div>
                </label>
            ))}

            {(!addresses || addresses.length === 0) && 
                <div>
                    <p>No Addresses saved yet, please add an address to proceed.</p>
                </div>
            }

            {/* Add New */}
            <button
                onClick={() => setShowForm(!showForm)}
                className="text-blue-600 transition"
                disabled={addressLoading}
            >
                + Add New Address
            </button>

            {showForm && <AddressForm onSuccess={fetchAddresses} />}
        </div>
    )
}

export default AddressList;