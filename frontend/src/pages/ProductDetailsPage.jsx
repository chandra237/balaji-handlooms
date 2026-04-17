import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getProduct, getRelatedProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import { addItemToCart } from "../services/cartService";
import toast from "react-hot-toast";
import { useCart } from "../context/cartContext";

function ProductDetailsPage(){

    const [product, setProduct] = useState([]);
    const [relatedproducts,setRelatedProducts] = useState([]);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showZoom, setShowZoom] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);
    const [addToCartLoading, setAddToCartLoading] = useState(false);
    const { setCartCount } = useCart();

    const { slug } = useParams();
    console.log(slug);

    useEffect(()=>{
        getProduct(slug).then((data) => {
            setProduct(data);
            const defaultVariant = data.variants.find(v => v.isDefault) || data.variants[0];
            
            setSelectedVariant(defaultVariant);
            setSelectedImage(defaultVariant.images[0]);
        });
    },[slug]);

    useEffect(() => {
        if(showZoom){
            document.body.style.overflow = "hidden"
        }else{
            document.body.style.overflow = "auto"
        }

        return () => {
            document.body.style.overflow = "auto"
        }
    },[showZoom]);

    useEffect(()=>{
        getRelatedProducts(slug).then(setRelatedProducts);
    },[slug]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);
        
    if(!product){
        return(
            <div className="text-center py-20">
                Product not Found
            </div>
        )
    }

    const addToCart = async (variantId, quantity) => {
        console.log("variantId: ", variantId);
        try{
            setAddToCartLoading(true);

            const data = await addItemToCart(variantId, quantity);

            setCartCount(data.totalItems);
            toast.success("Item Added to cart");
            console.log("Added to cart");

        }
        catch(err){
            console.error(err);
            toast.error("Failed to add item to cart");
        }
        finally{
            setAddToCartLoading(false);
        }
    };

    const primaryImage =
        product?.variants?.[0]?.images?.find(img => img.isPrimary) ||
        product?.variants?.[0]?.images?.[0];

    return(
        <div className="max-w-7xl mx-auto px-6 pb-12 pt-5">

            <div className="text-gray-500 mb-10 flex gap-2">
                <Link to="/" className="hover:text-black">
                    Home
                </Link>

                <span className="font-bold">›</span>

                <Link to={`/products/category/${product?.categorySlug}`} className="hover:text-black" >
                    {product?.categoryName}
                </Link>

                <span className="font-bold">›</span>

                <span className="text-gray-800">{product?.name}</span>
                
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

                <div className="flex gap-4">
                    {/* thumbnail images */}
                    <div className="flex flex-col gap-3">
                        {selectedVariant?.images?.map((img) => (
                            <img 
                                key={img.id}
                                src={`/images/${img.imageUrl}`}
                                onClick={() => {
                                    setSelectedImage(img);
                                    setImgLoaded(false);
                                }}
                                className={`w-24 h-28 px-1 py-1 object-cover rounded cursor-pointer border-2 transition transform hover:scale-105
                                    ${selectedImage?.imageUrl === img.imageUrl
                                        ? "border-black scale-105" 
                                        : "border-gray-200"
                                    }
                                `}
                            />
                        ))}
                    </div>

                    {/* Main Images */}
                    <div>
                        <img
                            key={selectedImage?.id}
                            src={`/images/${selectedImage?.imageUrl}`}
                            alt={product.name}
                            loading="eager"
                            onLoad={() => setImgLoaded(true)}
                            onClick={() => setShowZoom(true)}
                            className={`cursor-zoom-in w-full max-w-lg max-h-[80vh] aspect-[4/5] object-cover rounded-lg transition-opacity duration-500 animate-fadeIn ${imgLoaded ? "opacity-100" : "opacity-0"}`}
                        />
                    </div>
                </div>

                {/* Product Info */}
                <div>

                    <h1 className="text-3xl font-semibold">
                        {product.name}
                    </h1>

                    <p className="text-xl mt-3 text-gray-700">
                        ₹{product.price}
                    </p>

                    <p className="mt-6 text-gray-600 leading-relaxed mb-8">
                        {product.description}
                    </p>

                    <div className="mt-6">

                        <p className="font-medium mb-2">Color</p>

                        <div className="flex gap-3">

                            {product?.variants?.map((variant) => (

                                <button
                                    key={variant.id}
                                    onClick={() => {
                                        setSelectedVariant(variant);
                                        setSelectedImage(variant.images[0]);
                                    }}
                                    className={`px-4 py-2 border rounded-md text-sm
                                        ${selectedVariant?.id === variant.id
                                            ? "border-black bg-black text-white"
                                            : "border-gray-300"}
                                    `}
                                >
                                    {variant.color}
                                </button>

                            ))}

                        </div>

                    </div>

                    <button onClick={() => addToCart(selectedVariant?.id,1)} disabled={addToCartLoading} className="mt-8 bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition shadow-md">
                        {addToCartLoading ? "Adding..." : "Add to Cart"}
                    </button>

                </div>

            </div>

            {/* Related Products Section */}
            <div className="mt-24">
                <h2 className="text-3xl font-brand mb-10 text-center">
                    You may also like
                </h2>

                <div className="grid grid-col-2 md:grid-cols-4 gap-8">
                    {relatedproducts && relatedproducts.map((product) => (
                        <Link to={`/products/${product.slug}`} key={product.id}>
                            <ProductCard key={product.id} product={product} />
                        </Link>
                    ))}
                </div>

            </div>

            {showZoom && (
                <div onClick={() => setShowZoom(false)} className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

                    <img
                        src={`/images/${selectedImage?.imageUrl}`}
                        className="max-h-[94vh] rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                    />

                </div>
            )}

        </div>

    )
}

export default ProductDetailsPage;