import API_BASE_URL from "../config/api";

export const getAllProducts = async () => {
    const response = await fetch(`${API_BASE_URL}/products`);

    if(!response.ok){
        throw new Error("Failed to fetch products");
    }

    return response.json();
};

export const getProductsByCategory = async (slug) => {
    const response = await fetch(`${API_BASE_URL}/products/category/${slug}`);

    if(!response.ok){
        throw new Error("Failed to fetch the category products");
    }

    return response.json();
};

export const getFeaturedProducts = async () => {
    const response = await fetch(`${API_BASE_URL}/products/featured`);

    if(!response.ok){
        throw new Error("Failed to fetch the featured products");
    }

    return response.json();
};

export const getAllCategories = async () => {
    const response = await fetch(`${API_BASE_URL}/categories`);

    if(!response.ok){
        throw new Error("Failed to fetch the categories");
    }

    return response.json();
};

export const getProduct = async (slug) => {
    const response = await fetch(`${API_BASE_URL}/products/${slug}`);

    if(!response.ok){
        throw new Error("Failed to fetch the selected product");
    }

    return response.json();
};

export const getRelatedProducts = async (slug) => {
    const response = await fetch(`${API_BASE_URL}/products/${slug}/related`);

    if(!response.ok){
        throw new Error("Failed to fetch the selected product");
    }

    return response.json();
}