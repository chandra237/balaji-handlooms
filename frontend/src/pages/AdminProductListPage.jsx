import { useEffect, useState } from "react";
import { deleteProduct, getAllProducts } from "../services/adminService";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function AdminProductListPage() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await getAllProducts();
            setProducts(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if(!window.confirm("Are you sure?")){
            return;
        }
        try{
            await deleteProduct(id);
            toast.success("Product deleted successfully");

            setProducts(prev => prev.filter(p => p.id !== id));
        }catch (err) {
            toast.error("Failed to delete");
        }
    }

    if (loading) {
        return <p>Loading products...</p>;
    }

    return (
        <div>

            <h2 className="text-2xl font-semibold mb-6">Products</h2>

            <div className="overflow-x-auto bg-white shadow rounded-lg">

                <table className="w-full text-left">

                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3">Name</th>
                            <th className="p-3">Category</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Variants</th>
                            <th className="p-3">Featured</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((p) => (
                            <tr key={p.id} className="border-t">

                                <td className="p-3">{p.name}</td>

                                <td className="p-3">{p.categoryName}</td>

                                <td className="p-3">₹{p.price}</td>

                                <td className="p-3">{p.variantCount}</td>

                                <td className="p-3">
                                    {p.featured ? "⭐" : "-"}
                                </td>

                                <td className="p-3 space-x-2">
                                    <Link to={`/admin/products/${p.id}`}>
                                        <button className="text-blue-600">Edit</button>
                                    </Link>

                                    <button onClick={() => handleDelete(p.id)} className="text-red-600">Delete</button>
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default AdminProductListPage;