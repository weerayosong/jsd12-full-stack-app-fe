export default function ProductForm({
    form,
    onChange,
    onSubmit,
    editId,
    onCancel,
}) {
    return (
        <form
            onSubmit={onSubmit}
            className={`shrink-0 p-0.5 gap-0.5 border-b border-gray-100 flex flex-col transition-colors ${editId ? "bg-amber-50/30" : "bg-white"}`}
        >
            <div className="grid grid-cols-1 sm:grid-cols-2  gap-0.5">
                <input
                    type="text"
                    name="name"
                    value={form.name || ""}
                    onChange={onChange}
                    required
                    placeholder="Name (req)"
                    className="w-full bg-slate-50 border border-gray-200 text-sm px-3 py-0.5 rounded-sm focus:outline-none focus:border-slate-400"
                />
                <input
                    type="number"
                    name="price"
                    value={form.price || ""}
                    onChange={onChange}
                    required
                    placeholder="Price (req)"
                    className="w-full bg-slate-50 border border-gray-200 text-sm px-3 py-0.5 rounded-sm focus:outline-none focus:border-slate-400"
                />
                <input
                    type="text"
                    name="category"
                    value={form.category || ""}
                    onChange={onChange}
                    placeholder="Category"
                    className="w-full bg-slate-50 border border-gray-200 text-sm px-3 py-0.5 rounded-sm focus:outline-none focus:border-slate-400"
                />
                <select
                    name="inStock"
                    value={
                        form.inStock !== undefined
                            ? String(form.inStock)
                            : "true"
                    }
                    onChange={onChange}
                    className="w-full bg-slate-50 border border-gray-200 text-sm px-3 py-0.5 rounded-sm focus:outline-none focus:border-slate-400 text-slate-600"
                >
                    <option value="true">In Stock</option>
                    <option value="false">Out of Stock</option>
                </select>
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    name="description"
                    value={form.description || ""}
                    onChange={onChange}
                    placeholder="Description..."
                    className="flex-1 bg-slate-50 border border-gray-200 text-sm px-3 py-0.5 rounded-sm focus:outline-none focus:border-slate-400"
                />
                {editId ? (
                    <>
                        <button
                            type="submit"
                            className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-0.5 rounded-sm text-sm font-bold transition-colors cursor-pointer"
                        >
                            Put
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="bg-slate-200 hover:bg-slate-300 text-slate-600 px-3 py-0.5 rounded-sm text-sm font-bold transition-colors cursor-pointer"
                        >
                            X
                        </button>
                    </>
                ) : (
                    <button
                        type="submit"
                        className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-0.5 rounded-sm text-sm font-bold transition-colors cursor-pointer"
                    >
                        Post
                    </button>
                )}
            </div>
        </form>
    );
}
