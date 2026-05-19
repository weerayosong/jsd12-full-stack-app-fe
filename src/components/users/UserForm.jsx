export default function UserForm({
    form,
    onChange,
    onSubmit,
    editId,
    onCancel,
}) {
    return (
        <form
            onSubmit={onSubmit}
            className={`shrink-0 p-4 border-b border-gray-100 flex flex-col gap-3 transition-colors ${editId ? "bg-amber-50/30" : "bg-white"}`}
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                    type="text"
                    name="username"
                    value={form.username || ""}
                    onChange={onChange}
                    required
                    placeholder="Username (req)"
                    className="w-full bg-slate-50 border border-gray-200 text-sm px-3 py-2 rounded-sm focus:outline-none focus:border-slate-400"
                />
                <input
                    type="email"
                    name="email"
                    value={form.email || ""}
                    onChange={onChange}
                    required
                    placeholder="Email (req)"
                    className="w-full bg-slate-50 border border-gray-200 text-sm px-3 py-2 rounded-sm focus:outline-none focus:border-slate-400"
                />
                <input
                    type="password"
                    name="password"
                    value={form.password || ""}
                    onChange={onChange}
                    required={!editId}
                    placeholder={
                        editId ? "New Password (optional)" : "Password (req)"
                    }
                    className="w-full bg-slate-50 border border-gray-200 text-sm px-3 py-2 rounded-sm focus:outline-none focus:border-slate-400"
                />
                <div className="flex gap-2">
                    <select
                        name="role"
                        value={form.role || "user"}
                        onChange={onChange}
                        className="flex-1 bg-slate-50 border border-gray-200 text-sm px-3 py-2 rounded-sm focus:outline-none focus:border-slate-400 text-slate-600"
                    >
                        <option value="user">Role: user</option>
                        <option value="admin">Role: admin</option>
                    </select>
                    {editId ? (
                        <>
                            <button
                                type="submit"
                                className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 rounded-sm text-sm font-bold transition-colors cursor-pointer"
                            >
                                Put
                            </button>
                            <button
                                type="button"
                                onClick={onCancel}
                                className="bg-slate-200 hover:bg-slate-300 text-slate-600 px-3 py-2 rounded-sm text-sm font-bold transition-colors cursor-pointer"
                            >
                                X
                            </button>
                        </>
                    ) : (
                        <button
                            type="submit"
                            className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-sm text-sm font-bold transition-colors cursor-pointer"
                        >
                            Post
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
}
