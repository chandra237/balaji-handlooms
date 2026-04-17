import API_BASE_URL from "../config/api";

export const addItemToCart = async (variantId, quantity) => {
    const cartId = localStorage.getItem("cartId");
    if(!cartId){
        console.log("cartId not yet created..");
    }

    const response = await fetch(`${API_BASE_URL}/cart/add`, {
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
        console.log("Cart Id created now:", data.cartId);
    }
    return data;
}

export const openCartPage = async () => {
    const cartId = localStorage.getItem("cartId");
    if(!cartId){
        return {items: [], subtotal : 0};
    }

    const response = await fetch(`${API_BASE_URL}/cart?cartId=${cartId}`);

    if(!response.ok){
        throw new Error("Failed to fetch the cart page");
    }

    return response.json();
}

export const updateCartItem = async (itemId, quantity) => {
    const response = await fetch(`${API_BASE_URL}/cart/update`,{
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

export const removeCartItem = async (itemId) => {
    const response = await fetch(`${API_BASE_URL}/cart/item/${itemId}`, {
        method: "DELETE",
    });

    if(!response.ok){
        throw new Error("Failed to update the item quantity");
    }

    return response.json();

}