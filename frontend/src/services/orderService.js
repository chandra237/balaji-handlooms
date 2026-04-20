import API_BASE_URL from "../config/api";

export const placeOrder = async (addressId) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/orders`,{
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${token}`
        },
        body : JSON.stringify({
            "addressId" : addressId
        })
    })

    if(!response.ok){
        throw new Error("Failed to place order");
    }

    return response.json();
}

export const getOrder = async (orderId) => {
    const token = localStorage.getItem("token");
    console.log(orderId);
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`,{
        method : "GET",
        headers : {
            "Authorization": `Bearer ${token}`
        }
    })

    if(!response.ok){
        throw new Error("Failed to retrieve order");
    }

    return response.json();
}

export const getOrders = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/orders`,{
        method : "GET",
        headers : {
            "Authorization": `Bearer ${token}`
        }
    });

    if(!response.ok){
        throw new Error("Failed to retrieve orders");
    }

    return response.json();
}