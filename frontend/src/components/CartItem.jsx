import { FaTrash } from "react-icons/fa";

function CartItem({ item, onUpdate, onRemove }) {

  return (
    <div className="relative flex gap-6 border rounded-lg p-2">

      {/* Image */}
      <img
        src={`/images/${item.imageUrl}`}
        alt={item.productName}
        className="w-24 h-32 object-cover rounded-md cursor-pointer"
      />

      {/* Product Info */}
      <div className="flex flex-col flex-grow"> 

        <h3 className="font-medium text-lg cursor-pointer">
          {item.productName}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Color: {item.color}
        </p>

        <p className="mt-2 font-semibold">
          ₹{item.price}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3 mt-4">

          <button className="border px-3 py-1 rounded" disabled={item.quantity === 1} onClick={() => onUpdate(item.itemId, item.quantity - 1)}>
            -
          </button>

          <span>{item.quantity}</span>

          <button className="border px-3 py-1 rounded" onClick={() => onUpdate(item.itemId, item.quantity + 1)}>
            +
          </button>

        </div>

      </div>

      {/* Remove */}
      <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition" onClick={() => onRemove(item.itemId)}>
        <FaTrash />
      </button>

    </div>
  );
}

export default CartItem;