export default function ColumnPanel({ title, children }) {
    return (
        <div className="flex-1 flex flex-col min-h-0 bg-white border border-gray-200 rounded-sm shadow-sm">
            <div className="shrink-0 px-4 py-0.5 border-b border-gray-200 bg-slate-50 flex justify-between items-center">
                <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                    {title}
                </span>
            </div>
            {children}
        </div>
    );
}
