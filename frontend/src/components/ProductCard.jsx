import { FaRegHeart } from "react-icons/fa";

function ProductCard({ product }){
    return(
        <div className="group cursor-pointer transition-all duration-300 hover:-translate-y-1">
        
            <div className=" relative overflow-hidden rounded-lg hover:shadow-md">

                <div className="absolute top-3 right-3 z-10 bg-white p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition hover:text-red-700">
                    <FaRegHeart size={16} />
                </div>

                <img
                    src={`/images/${product.imageUrl}`}
                    alt={product.name}
                    loading="lazy"
                    className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition duration-700"
                />
            </div>

            <div className="mt-4">

                <p className="text-gray-800 font-medium line-clamp-3">
                    {product.name}
                </p>

                <p className="text-gray-500 mt-1 font-medium">
                    ₹{product.price}
                </p>

            </div>

        </div>
    );
}

export default ProductCard;