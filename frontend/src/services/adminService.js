import API_BASE_URL from "../config/api"

export const getAllProducts = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/admin/products`,{
        headers:{
            "Authorization": `Bearer ${token}`
        }
    });

    if(!response.ok){
        throw new Error("Failed to fetch Admin Products");
    }

    return response.json();
}

export const getProductById = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/admin/products/${id}`,{
        headers:{
            "Authorization": `Bearer ${token}`
        }
    });

    if(!response.ok){
        throw new Error("Failed to fetch Admin Product");
    }

    return response.json();
}

export const uploadImages = async (files) => {
    const token = localStorage.getItem("token");

    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("files", files[i]);
    }

    const res = await fetch(`${API_BASE_URL}/uploads/images`, {
      method: "POST",
      headers:{
        "Authorization": `Bearer ${token}`
      },
      body: data,
    });

    if (!res.ok) throw new Error("Upload failed");

    return res.json();
};

export const addProduct = async (payload) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/admin/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

    if (!res.ok) throw new Error("Failed to Add product to DB");

    return res.json();

}

export const updateProduct = async (id, payload) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
        method: "PUT",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error("Failed to update product");
    return res.json();
};

export const deleteProduct = async (id) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Bearer ${token}`
        }
    });

    if (!res.ok) throw new Error("Failed to delete product");
};