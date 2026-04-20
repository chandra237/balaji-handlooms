import API_BASE_URL from "../config/api";

export const addItemToCart = async (variantId, quantity) => {
    const token = localStorage.getItem("token");

    if(token){
        const response = await fetch(`${API_BASE_URL}/cart/add`,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${token}`
            },
            body : JSON.stringify({
                "variantId" : variantId,
                "quantity" : quantity
            })
        });

        if(!response.ok){
            throw new Error("Failed to add item to cart");
        }

        return response.json();
    }
    else{
        const cartId = localStorage.getItem("cartId");
    
        const response = await fetch(`${API_BASE_URL}/cart/guest/add`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                "cartId" : cartId,
                "variantId" : variantId,
                "quantity" : quantity
            })
        });
    
        if(!response.ok){
            throw new Error("Failed to add item to cart");
        }
    
        const data = await response.json();
    
        if(!cartId){
            localStorage.setItem("cartId", data.cartId);
        }
        return data;
    }
}




export const getCart = async () => {
    const token = localStorage.getItem("token");
    
    if(token){
        const response = await fetch(`${API_BASE_URL}/cart`, {
            headers : {
                "Authorization": `Bearer ${token}`
            }
        });

        if(!response.ok){
            throw new Error("Failed to fetch the cart");
        }
    
        return response.json();

    }else{
        const cartId = localStorage.getItem("cartId");
        if(!cartId){
            return {cartItems: [], subTotal : 0, totalItems : 0};
        }
    
        const response = await fetch(`${API_BASE_URL}/cart/guest?cartId=${cartId}`);
    
        if(!response.ok){
            throw new Error("Failed to fetch the cart page");
        }
    
        return response.json();
    }
}



export const updateCartItem = async (itemId, quantity) => {
    const token = localStorage.getItem("token");

    if(token){
        const response = await fetch(`${API_BASE_URL}/cart/update`,{
            method: "PUT",
            headers: {
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${token}`
            },
            body : JSON.stringify({
                "cartItemId" : itemId,
                "quantity" : quantity
            })
        });
    
        if(!response.ok){
            throw new Error("Failed to update the item quantity");
        }
    
        return response.json();
    }else{
        const response = await fetch(`${API_BASE_URL}/cart/guest/update`,{
            method: "PUT",
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                "cartItemId" : itemId,
                "quantity" : quantity
            })
        });
    
        if(!response.ok){
            throw new Error("Failed to update the item quantity");
        }
    
        return response.json();
    }
}



export const removeCartItem = async (itemId) => {
    const token = localStorage.getItem("token");

    if(token){
        const response = await fetch(`${API_BASE_URL}/cart/item/${itemId}`, {
            method: "DELETE",
            headers : {
                "Authorization": `Bearer ${token}`
            }
        });
    
        if(!response.ok){
            throw new Error("Failed to update the item quantity");
        }
    
        return response.json();
    }else{
        const response = await fetch(`${API_BASE_URL}/cart/guest/item/${itemId}`, {
            method: "DELETE",
        });
    
        if(!response.ok){
            throw new Error("Failed to update the item quantity");
        }
    
        return response.json();
    }

}


export const mergeCarts = async () => {
    const token = localStorage.getItem("token");
    const cartId = localStorage.getItem("cartId");

    if(cartId){
        const response = await fetch(`${API_BASE_URL}/cart/merge`, {
            method : "POST",
            headers : {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body : JSON.stringify({
                "cartId" : cartId
            })
        })

        if(response.ok){
            localStorage.removeItem("cartId");
        }
    }
}