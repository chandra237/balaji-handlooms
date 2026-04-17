import { FaRegHeart } from "react-icons/fa";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getFeaturedProducts } from "../services/productService";

function FeaturedProdcuts(){

  const [products, setProducts] = useState([]);

  useEffect(()=>{
    getFeaturedProducts().then(setProducts);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-6">

      <div className="relative mb-16">

        <h2 className="text-4xl font-brand text-center">
            Featured Sarees
        </h2>

        <p className=" group absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 hover:text-black flex items-center gap-1">
            <Link to="/products/featured">
              View All 
              <span className="transition-transform group-hover:translate-x-1">
                  →
              </span>
            </Link>
        </p>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-12">

        {products.map((product) => (
            <Link to={`products/${product.slug}`} key={product.id}>
                <ProductCard product={product} key={product.id} />
            </Link>
        ))}

      </div>

    </section>
  );
}

export default FeaturedProdcuts;