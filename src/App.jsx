import UsersColumn from "./components/users/UsersColumn";
import ProductsColumn from "./components/products/ProductsColumn";
import NotesColumn from "./components/notes/NotesColumn";

function App() {
    return (
        <div className="h-screen flex flex-col p-4 md:p-6 bg-slate-100 text-slate-800 font-sans antialiased overflow-hidden">
            <header className="shrink-0 border-b border-gray-300 pb-4 mb-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                        JSD12 Full Stack App
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        React App (Front end)
                    </p>
                </div>
            </header>

            <main className="flex-1 flex flex-col min-h-0 pr-2 lg:pr-0">
                <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <UsersColumn />
                    <ProductsColumn />
                    <NotesColumn />
                </div>
            </main>
        </div>
    );
}

export default App;
