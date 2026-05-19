export default function ProductList({
    products,
    idKey,
    onEdit,
    onDelete,
    emptyMessage,
}) {
    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
            {products.length === 0 ? (
                <div className="text-center text-sm text-slate-400 mt-4">
                    {emptyMessage}
                </div>
            ) : (
                products.map((product) => (
                    <div
                        key={product[idKey]}
                        className="p-3 border border-gray-200 bg-white rounded-sm flex justify-between items-start hover:border-slate-300 transition-colors"
                    >
                        <div>
                            <p className="text-sm font-semibold text-slate-800">
                                {product.name}
                                {product.category && (
                                    <span className="text-xs font-normal text-slate-500 ml-2 bg-slate-100 px-2 py-1 rounded-sm">
                                        {product.category}
                                    </span>
                                )}
                            </p>
                            <p className="text-xs text-slate-500 mt-2 line-clamp-1">
                                {product.description || "No description"}
                            </p>
                            <p className="text-xs text-slate-700 font-mono mt-2">
                                {product.price} THB
                                <span
                                    className={`text-xs ml-2 font-semibold ${String(product.inStock) === "true" ? "text-lime-400" : "text-rose-400"}`}
                                >
                                    ●{" "}
                                    {String(product.inStock) === "true"
                                        ? "In Stock"
                                        : "Out of Stock"}
                                </span>
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => onEdit(product)}
                                className="text-xs px-2 py-1 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-sm uppercase font-bold transition-colors cursor-pointer"
                            >
                                Put
                            </button>
                            <button
                                type="button"
                                onClick={() => onDelete(product[idKey])}
                                className="text-xs px-2 py-1 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-sm uppercase font-bold transition-colors cursor-pointer"
                            >
                                Del
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
