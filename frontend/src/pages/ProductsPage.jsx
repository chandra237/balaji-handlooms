import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import { getAllProducts, getProductsByCategory } from "../services/productService";

function ProductsPage(){

    const { slug } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if(slug){
            getProductsByCategory(slug)
                .then(setProducts)
                .catch(err => {
                    console.log(err.message);
                })
        }
        else{
            getAllProducts().then(setProducts);
        }
    },[slug]);

    const title = formatSlug(slug);

    function formatSlug(slug){
        if(!slug) return "All Saree Collection";
        return slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    }

    return(
        <div>
            {!products && 
                <div>
                    <h2>No products found.</h2>
                </div>
            }

            {products && 
                <div className="max-w-7xl mx-auto px-6 py-16">
                    <h1 className="text-4xl font-brand text-center mb-12">
                        {title}
                    </h1>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <Link to={`/products/${product.slug}`}>
                                <ProductCard key={product.id} product={product} />
                            </Link>
                        ))}
                    </div>
                </div>
            }
        </div>
    );
}

export default ProductsPage;