import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCategories } from "../services/productService";

function Collections(){

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllCategories().then(setCategories);
    },[]);

    return(
        <section className="flex flex-col items-center justify-center max-w-7xl mx-auto px-6 py-20">

            <h2 className="text-4xl font-brand pb-20">Shop by Collection</h2>
        
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                {categories.map((item)=>(
                    <Link to={`/products/category/${item.slug}`} key={item.id}>
                        <div className="group cursor-pointer transition-all duration-300 hover:-translate-y-1">
                            <div className="relative overflow-hidden rounded-lg">
                                <img
                                    key={item.id}
                                    src={`/images/${item.imageUrl}`}
                                    alt={item.name}
                                    className="w-full aspect-[4/5] object-cover group-hover:scale-110 transition duration-700"
                                />

                                {/* overlay */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300"></div>

                                {/* title */}
                                <p className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold tracking-wide opacity-0 group-hover:opacity-100 transition duration-500">
                                    {item.name}
                                </p>

                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            
        </section>
    )
}

export default Collections;