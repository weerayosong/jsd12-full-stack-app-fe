export default function NoteForm({
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
            <input
                type="text"
                name="title"
                value={form.title || ""}
                onChange={onChange}
                required
                placeholder="Title (req)"
                className="w-full bg-slate-50 border border-gray-200 text-sm px-3 py-0.5 rounded-sm focus:outline-none focus:border-slate-400"
            />
            <div className="flex flex-col sm:flex-row gap-2">
                <input
                    type="text"
                    name="content"
                    value={form.content || ""}
                    onChange={onChange}
                    placeholder="Content..."
                    className="flex-1 bg-slate-50 border border-gray-200 text-sm px-3 py-0.5 rounded-sm focus:outline-none focus:border-slate-400"
                />
                <div className="flex gap-2">
                    <label className="flex items-center justify-center px-3 py-0.5 bg-slate-50 border border-gray-200 rounded-sm gap-2 text-sm text-slate-600 cursor-pointer hover:bg-slate-100 transition-colors">
                        <input
                            type="checkbox"
                            name="isCompleted"
                            checked={form.isCompleted || false}
                            onChange={onChange}
                            className="rounded-sm accent-slate-700 w-4 h-4 cursor-pointer"
                        />{" "}
                        Done
                    </label>
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
            </div>
        </form>
    );
}
