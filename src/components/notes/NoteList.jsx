export default function NoteList({
    notes,
    idKey,
    onEdit,
    onDelete,
    emptyMessage,
}) {
    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
            {notes.length === 0 ? (
                <div className="text-center text-sm text-slate-400 mt-4">
                    {emptyMessage}
                </div>
            ) : (
                notes.map((note) => (
                    <div
                        key={note[idKey]}
                        className={`p-0.5 border border-gray-200 rounded-sm hover:border-slate-300 transition-colors ${note.isCompleted ? "bg-slate-50 opacity-70" : "bg-white"}`}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h3
                                className={`text-sm font-semibold ${note.isCompleted ? "text-slate-500 line-through" : "text-slate-800"}`}
                            >
                                {note.title}
                            </h3>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => onEdit(note)}
                                    className="text-xs px-2 py-1 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-sm uppercase font-bold transition-colors cursor-pointer"
                                >
                                    Put
                                </button>
                                <button
                                    type="button"
                                    onClick={() => onDelete(note[idKey])}
                                    className="text-xs px-2 py-1 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-sm uppercase font-bold transition-colors cursor-pointer"
                                >
                                    Del
                                </button>
                            </div>
                        </div>
                        {note.content && (
                            <p
                                className={`text-xs ${note.isCompleted ? "text-slate-400" : "text-slate-500"}`}
                            >
                                {note.content}
                            </p>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}
