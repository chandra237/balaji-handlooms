import { Link, useLocation } from "react-router-dom";
import { FaBox, FaPlus, FaClipboardList } from "react-icons/fa";

function AdminSidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-white shadow-md p-5">

      {/* Logo */}
      <h2 className="text-xl font-bold mb-8">Admin Panel</h2>

      {/* Menu */}
      <nav className="space-y-3">

        <Link
          to="/admin/products"
          className={`flex items-center gap-3 p-2 rounded-md ${
            isActive("/admin/products") ? "bg-black text-white" : "hover:bg-gray-100"
          }`}
        >
          <FaBox />
          Products
        </Link>

        <Link
          to="/admin/products/add"
          className={`flex items-center gap-3 p-2 rounded-md ${
            isActive("/admin/products/add") ? "bg-black text-white" : "hover:bg-gray-100"
          }`}
        >
          <FaPlus />
          Add Product
        </Link>

        <Link
          to="/admin/orders"
          className={`flex items-center gap-3 p-2 rounded-md ${
            isActive("/admin/orders") ? "bg-black text-white" : "hover:bg-gray-100"
          }`}
        >
          <FaClipboardList />
          Orders
        </Link>

      </nav>
    </div>
  );
}

export default AdminSidebar;