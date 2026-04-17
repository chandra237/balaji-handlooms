import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import { getFeaturedProducts } from "../services/productService";

function FeaturedProdcutsPage(){

    const [products, setProducts] = useState([]);

    useEffect(()=>{
        getFeaturedProducts().then(setProducts);
    },[]);

    return(
        <div className="max-w-7xl mx-auto px-6 py-16">
            <h1 className="text-4xl font-brand text-center mb-12">
                Featured Sarees
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <Link to={`/products/${product.slug}`}>
                        <ProductCard key={product.id} product={product} />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default FeaturedProdcutsPage;