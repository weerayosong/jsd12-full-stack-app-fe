import { useState, useEffect } from "react";

export default function UsersColumn() {
    const [mongoUsers, setMongoUsers] = useState([]);
    const [supaUsers, setSupaUsers] = useState([]);

    const initialFormState = {
        username: "",
        email: "",
        password: "",
        role: "user",
    };
    const [mongoForm, setMongoForm] = useState(initialFormState);
    const [supaForm, setSupaForm] = useState(initialFormState);

    const [mongoEditId, setMongoEditId] = useState(null);
    const [supaEditId, setSupaEditId] = useState(null);

    const API_URL = "http://localhost:3002/api/v2/users";

    useEffect(() => {
        const fetchMongoUsers = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error("MongoDB Fetch failed");
                const result = await response.json();
                if (result.success) setMongoUsers(result.data);
            } catch (error) {
                console.error("Error fetching MongoDB users:", error);
            }
        };

        const fetchSupaUsers = async () => {
            try {
                const response = await fetch(`${API_URL}/pg`);
                if (!response.ok) throw new Error("Supabase Fetch failed");
                const result = await response.json();
                if (result.success) setSupaUsers(result.data);
            } catch (error) {
                console.error("Error fetching Supabase users:", error);
            }
        };

        fetchMongoUsers();
        fetchSupaUsers();
    }, []);

    // ===================== HANDLERS สำหรับ MONGODB =====================
    const handleMongoChange = (e) =>
        setMongoForm({ ...mongoForm, [e.target.name]: e.target.value });

    const handleMongoEditClick = (user) => {
        setMongoEditId(user._id);

        setMongoForm({
            username: user.username,
            email: user.email,
            password: "",
            role: user.role || "user",
        });
    };

    const cancelMongoEdit = () => {
        setMongoEditId(null);
        setMongoForm(initialFormState);
    };

    const handleMongoSubmit = async (e) => {
        e.preventDefault();
        const isEditing = !!mongoEditId;
        const url = isEditing ? `${API_URL}/${mongoEditId}` : API_URL;
        const method = isEditing ? "PUT" : "POST";

        const payload = { ...mongoForm };
        if (isEditing && !payload.password) delete payload.password;

        try {
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const result = await response.json();

            if (result.success) {
                if (isEditing) {
                    setMongoUsers(
                        mongoUsers.map((u) =>
                            u._id === mongoEditId ? result.data : u,
                        ),
                    );
                } else {
                    setMongoUsers([...mongoUsers, result.data]);
                }
                cancelMongoEdit();
            } else {
                alert(
                    "MongoDB Error: " +
                        (result.error?.message ||
                            result.error ||
                            "Something went wrong"),
                );
            }
        } catch (error) {
            console.error("MongoDB Post/Put Error:", error);
        }
    };

    // ===================== HANDLERS สำหรับ SUPABASE =====================
    const handleSupaChange = (e) =>
        setSupaForm({ ...supaForm, [e.target.name]: e.target.value });

    const handleSupaEditClick = (user) => {
        setSupaEditId(user.id);
        setSupaForm({
            username: user.username,
            email: user.email,
            password: "",
            role: user.role || "user",
        });
    };

    const cancelSupaEdit = () => {
        setSupaEditId(null);
        setSupaForm(initialFormState);
    };

    const handleSupaSubmit = async (e) => {
        e.preventDefault();
        const isEditing = !!supaEditId;
        const url = isEditing ? `${API_URL}/pg/${supaEditId}` : `${API_URL}/pg`;
        const method = isEditing ? "PUT" : "POST";

        const payload = { ...supaForm };
        if (isEditing && !payload.password) delete payload.password;

        try {
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const result = await response.json();

            if (result.success) {
                if (isEditing) {
                    setSupaUsers(
                        supaUsers.map((u) =>
                            u.id === supaEditId ? result.data : u,
                        ),
                    );
                } else {
                    setSupaUsers([...supaUsers, result.data]);
                }
                cancelSupaEdit();
            } else {
                alert(
                    "Supabase Error: " +
                        (result.error?.message ||
                            result.error ||
                            "Something went wrong"),
                );
            }
        } catch (error) {
            console.error("Supabase Post/Put Error:", error);
        }
    };

    return (
        <div className="flex flex-col gap-6 h-full min-h-0">
            {/* ==================== Users: MongoDB ==================== */}
            <div className="flex-1 flex flex-col min-h-0 bg-white border border-gray-200 rounded-sm shadow-sm">
                <div className="shrink-0 px-4 py-3 border-b border-gray-200 bg-slate-50 flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                        Users (MongoDB)
                    </span>
                </div>

                <form
                    onSubmit={handleMongoSubmit}
                    className={`shrink-0 p-4 border-b border-gray-100 flex flex-col gap-3 transition-colors ${mongoEditId ? "bg-amber-50/30" : "bg-white"}`}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                            type="text"
                            name="username"
                            value={mongoForm.username}
                            onChange={handleMongoChange}
                            required
                            placeholder="Username (req)"
                            className="w-full bg-slate-50 border border-gray-200 text-sm px-3 py-2 rounded-sm focus:outline-none focus:border-slate-400"
                        />
                        <input
                            type="email"
                            name="email"
                            value={mongoForm.email}
                            onChange={handleMongoChange}
                            required
                            placeholder="Email (req)"
                            className="w-full bg-slate-50 border border-gray-200 text-sm px-3 py-2 rounded-sm focus:outline-none focus:border-slate-400"
                        />

                        <input
                            type="password"
                            name="password"
                            value={mongoForm.password}
                            onChange={handleMongoChange}
                            required={!mongoEditId}
                            placeholder={
                                mongoEditId
                                    ? "New Password (optional)"
                                    : "Password (req)"
                            }
                            className="w-full bg-slate-50 border border-gray-200 text-sm px-3 py-2 rounded-sm focus:outline-none focus:border-slate-400"
                        />
                        <div className="flex gap-2">
                            <select
                                name="role"
                                value={mongoForm.role}
                                onChange={handleMongoChange}
                                className="flex-1 bg-slate-50 border border-gray-200 text-sm px-3 py-2 rounded-sm focus:outline-none focus:border-slate-400 text-slate-600"
                            >
                                <option value="user">Role: user</option>
                                <option value="admin">Role: admin</option>
                            </select>
                            {mongoEditId ? (
                                <>
                                    <button
                                        type="submit"
                                        className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 rounded-sm text-sm font-bold transition-colors cursor-pointer"
                                    >
                                        Put
                                    </button>
                                    <button
                                        type="button"
                                        onClick={cancelMongoEdit}
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

                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
                    {mongoUsers.length === 0 ? (
                        <div className="text-center text-sm text-slate-400 mt-4">
                            No data found in MongoDB
                        </div>
                    ) : (
                        mongoUsers.map((user) => (
                            <div
                                key={user._id}
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
                                        onClick={() =>
                                            handleMongoEditClick(user)
                                        }
                                        className="text-xs px-2 py-1 text-amber-600 bg-amber-50 hover:bg-amber-100 rounded-sm uppercase font-bold transition-colors cursor-pointer"
                                    >
                                        Put
                                    </button>
                                    <button
                                        type="button"
                                        className="text-xs px-2 py-1 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-sm uppercase font-bold transition-colors cursor-pointer"
                                    >
                                        Del
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* ==================== Users: Supabase ==================== */}
            <div className="flex-1 flex flex-col min-h-0 bg-white border border-gray-200 rounded-sm shadow-sm">
                <div className="shrink-0 px-4 py-3 border-b border-gray-200 bg-slate-50 flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                        Users (Supabase)
                    </span>
                </div>

                <form
                    onSubmit={handleSupaSubmit}
                    className={`shrink-0 p-4 border-b border-gray-100 flex flex-col gap-3 transition-colors ${supaEditId ? "bg-amber-50/30" : "bg-white"}`}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                            type="text"
                            name="username"
                            value={supaForm.username}
                            onChange={handleSupaChange}
                            required
                            placeholder="Username (req)"
                            className="w-full bg-slate-50 border border-gray-200 text-sm px-3 py-2 rounded-sm focus:outline-none focus:border-slate-400"
                        />
                        <input
                            type="email"
                            name="email"
                            value={supaForm.email}
                            onChange={handleSupaChange}
                            required
                            placeholder="Email (req)"
                            className="w-full bg-slate-50 border border-gray-200 text-sm px-3 py-2 rounded-sm focus:outline-none focus:border-slate-400"
                        />
                        <input
                            type="password"
                            name="password"
                            value={supaForm.password}
                            onChange={handleSupaChange}
                            required={!supaEditId}
                            placeholder={
                                supaEditId
                                    ? "New Password (optional)"
                                    : "Password (req)"
                            }
                            className="w-full bg-slate-50 border border-gray-200 text-sm px-3 py-2 rounded-sm focus:outline-none focus:border-slate-400"
                        />
                        <div className="flex gap-2">
                            <select
                                name="role"
                                value={supaForm.role}
                                onChange={handleSupaChange}
                                className="flex-1 bg-slate-50 border border-gray-200 text-sm px-3 py-2 rounded-sm focus:outline-none focus:border-slate-400 text-slate-600"
                            >
                                <option value="user">Role: user</option>
                                <option value="admin">Role: admin</option>
                            </select>
                            {supaEditId ? (
                                <>
                                    <button
                                        type="submit"
                                        className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 rounded-sm text-sm font-bold transition-colors cursor-pointer"
                                    >
                                        Put
                                    </button>
                                    <button
                                        type="button"
                                        onClick={cancelSupaEdit}
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

                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
                    {supaUsers.length === 0 ? (
                        <div className="text-center text-sm text-slate-400 mt-4">
                            No data found in Supabase
                        </div>
                    ) : (
                        supaUsers.map((user) => (
                            <div
                                key={user.id}
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
                                        onClick={() =>
                                            handleSupaEditClick(user)
                                        }
                                        className="text-xs px-2 py-1 text-amber-600 bg-amber-50 hover:bg-amber-100 rounded-sm uppercase font-bold transition-colors cursor-pointer"
                                    >
                                        Put
                                    </button>
                                    <button
                                        type="button"
                                        className="text-xs px-2 py-1 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-sm uppercase font-bold transition-colors cursor-pointer"
                                    >
                                        Del
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
