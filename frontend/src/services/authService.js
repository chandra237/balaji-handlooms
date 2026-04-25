import API_BASE_URL from "../config/api"

export const loginUser = async (formData) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`,{
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(formData)
    })

    if(!response.ok){
        const data = response.json();
        throw new Error(data.message);
    }
    return response.json();
}

export const registerUser = async (formData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`,{
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(formData)
    })

    if(!response.ok){
        const data = response.json();
        throw new Error(data.message);
    }
    return response.json();
}