import API_BASE_URL from "../config/api";

export const getAddresses = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/address`, {
        headers : {
            "Authorization": `Bearer ${token}`
        }
    });

    if(!response.ok){
        throw new Error("Failed to fetch Addresses");
    }

    return response.json();
}

export const addAddress = async (formData) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/address`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body : JSON.stringify(formData)
    });

    if(!response.ok){
        throw new Error("Failed to add address");
    }

    return response.json();

}