export default function UserList({
    users,
    idKey,
    onEdit,
    onDelete,
    emptyMessage,
}) {
    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
            {users.length === 0 ? (
                <div className="text-center text-sm text-slate-400 mt-4">
                    {emptyMessage}
                </div>
            ) : (
                users.map((user) => (
                    <div
                        key={user[idKey]}
                        className="p-3 border border-gray-200 bg-white rounded-sm flex justify-between items-center hover:border-slate-300 transition-colors"
                    >
                        <div>
                            <p className="text-sm font-semibold text-slate-700">
                                {user.username}{" "}
                                <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-1 rounded-sm ml-2">
                                    {user.role || "user"}
                                </span>
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                                {user.email}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => onEdit(user)}
                                className="text-xs px-2 py-1 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-sm uppercase font-bold transition-colors cursor-pointer"
                            >
                                Put
                            </button>
                            <button
                                type="button"
                                onClick={() => onDelete(user[idKey])}
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
