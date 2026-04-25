import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa"
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext";

function Navbar({ showAuthModal }){
    const [scrolled, setScrolled] = useState(false);
    const [collectionsOpen, setCollectionsOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const { cartCount, setCart } = useCart();
    const {isLoggedIn, logout, user} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        const handleScroll = () => {
            if (window.scrollY > 50) {
            setScrolled(true);
            } else {
            setScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    },[]);

    const handleLogout = () => {
        logout();
        setUserMenuOpen(false);
        setCart({
            cartItems: [],
            subTotal: 0,
            totalItems: 0
        });
        navigate("/");
    }


    return(
        <nav className={`sticky top-0 z-50 border-b bg-white ${scrolled ? "py-2 shadow-md" : "py-4"} transition-all duration-300`}>
            <div className="flex justify-between items-center max-w-7xl mx-auto px-6">
                
                <div className="flex items-center gap-8">

                    <Link to="/" className={` ${scrolled ? "text-xl" : "text-2xl"} transition-all font-brand font-bold tracking-wide`}>
                        Balaji Handlooms
                    </Link>

                    <Link to="/products" className="cursor-pointer hover:text-red-700 transition duration-200 font-medium" >Shop</Link>

                    <div className="relative group">
                        <button onClick={() => setCollectionsOpen(!collectionsOpen)} className="cursor-pointer hover:text-red-700 transition duration-200 font-medium">Collections</button>

                        {collectionsOpen 
                            && (
                            <div className="absolute left-0 hidden group-hover:block bg-white shadow-lg rounded w-48 mt-0 z-50">
                        
                                <Link onClick={() => setCollectionsOpen(false)} to="/products/category/cotton-sarees" className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">Cotton Sarees</Link>

                                <Link onClick={() => setCollectionsOpen(false)} to="/products/category/silk-sarees" className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">Silk Sarees</Link>

                                <Link onClick={() => setCollectionsOpen(false)} to="/products/category/festival-collection" className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">Festive Collection</Link>

                                <Link onClick={() => setCollectionsOpen(false)} to="/products/category/new-arrivals" className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">New Arrivals</Link>
                            </div>
                        )}
                    </div>

                    <Link to="/meet-our-weavers" className="cursor-pointer hover:text-red-700 transition duration-200 font-medium">Our Weavers</Link>

                    <Link to="/about-us" className="cursor-pointer hover:text-red-700 transition duration-200 font-medium">About</Link>

                </div>

            
                <div className="relative flex items-center gap-6 text-lg">
                    <FaSearch className="cursor-pointer" />
                    <div className="relative cursor-pointer" >
                        <Link to="/cart">
                            <FaShoppingCart className="text-lg" />
                        </Link>
                        <span className="absolute -top-3 -right-3 bg-red-600 text-white text-xs px-1.5 py-[1px] rounded-full">{ cartCount }</span>
                    </div>
                    {!isLoggedIn ? (
                        <button 
                            className="px-4 py-1 border rounded-md hover:bg-gray-100 transition font-medium cursor-pointer "
                            onClick={showAuthModal}
                        >
                            Login
                        </button>
                    ) : (
                        <div className="relative group">
                            <div className="flex flex-row gap-2">
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center"
                                >
                                    <FaUser className="text-sm text-gray-700"/>
                                </button>
                                <p className="font-medium">{`Hi, ${user?.name?.split(' ')[0] || "User"}`}</p>
                            </div>

                            {userMenuOpen && (
                                <div className="absolute left-0 hidden group-hover:block bg-white shadow-lg rounded w-48 mt-0 z-50">

                                    <button onClick={() => setUserMenuOpen(false)} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                        My Profile
                                    </button>

                                    <Link to="/orders">
                                        <button onClick={() => setUserMenuOpen(false)} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                            My Orders
                                        </button>
                                    </Link>

                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                                    >
                                        Logout
                                    </button>

                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;