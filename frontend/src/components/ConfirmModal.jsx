function ConfirmModal({ onConfirm, onCancel, loading }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

            <div className="bg-white p-6 rounded-lg w-96 text-center space-y-4">

                <h2 className="text-lg font-semibold">
                    Confirm Order
                </h2>

                <p>Are you sure you want to place this order?</p>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={onCancel}
                        className="border px-4 py-2 rounded"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="bg-black text-white px-4 py-2 rounded"
                        disabled={loading}
                    >
                        {loading ? "Placing..." : "Confirm"}
                    </button>
                </div>

            </div>
        </div>
    );
}

export default ConfirmModal;