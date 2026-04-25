import { useParams } from "react-router-dom";
import AdminAddProductPage from "./AdminAddProductPage";
import { useEffect, useState } from "react";
import { getProductById } from "../services/adminService";

function AdminEditProductPage(){
    const { id } = useParams();
    const [initialData, setIntitialData] = useState();

    useEffect(() => {
        getProductById(id).then(setIntitialData);
    }, [id]);

    if(!initialData) return <p>Loading...</p>

    return(
        <AdminAddProductPage initialData={initialData} isEdit/>
    )
}

export default AdminEditProductPage;