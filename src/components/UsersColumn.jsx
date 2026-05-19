import { useState, useEffect } from "react";
import UserForm from "./UserForm";
import UserList from "./UserList";

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
                const result = await response.json();
                if (result.success) setMongoUsers(result.data);
            } catch (error) {
                console.error("Mongo Fetch Error:", error);
            }
        };

        const fetchSupaUsers = async () => {
            try {
                const response = await fetch(`${API_URL}/pg`);
                const result = await response.json();
                if (result.success) setSupaUsers(result.data);
            } catch (error) {
                console.error("Supa Fetch Error:", error);
            }
        };

        fetchMongoUsers();
        fetchSupaUsers();
    }, []);

    // ===================== MONGODB HANDLERS =====================
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

    const handleMongoSubmit = async (e) => {
        e.preventDefault();
        const isEditing = !!mongoEditId;
        const url = isEditing ? `${API_URL}/${mongoEditId}` : API_URL;

        const payload = { ...mongoForm };
        if (isEditing && !payload.password) delete payload.password;

        try {
            const response = await fetch(url, {
                method: isEditing ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const result = await response.json();

            if (result.success) {
                if (isEditing)
                    setMongoUsers(
                        mongoUsers.map((u) =>
                            u._id === mongoEditId ? result.data : u,
                        ),
                    );
                else setMongoUsers([...mongoUsers, result.data]);
                setMongoEditId(null);
                setMongoForm(initialFormState);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleMongoDelete = async (id) => {
        if (!window.confirm("Delete this user?")) return;
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            });
            const result = await response.json();
            if (result.success)
                setMongoUsers(mongoUsers.filter((u) => u._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    // ===================== SUPABASE HANDLERS =====================
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

    const handleSupaSubmit = async (e) => {
        e.preventDefault();
        const isEditing = !!supaEditId;
        const url = isEditing ? `${API_URL}/pg/${supaEditId}` : `${API_URL}/pg`;

        const payload = { ...supaForm };
        if (isEditing && !payload.password) delete payload.password;

        try {
            const response = await fetch(url, {
                method: isEditing ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const result = await response.json();

            if (result.success) {
                if (isEditing)
                    setSupaUsers(
                        supaUsers.map((u) =>
                            u.id === supaEditId ? result.data : u,
                        ),
                    );
                else setSupaUsers([...supaUsers, result.data]);
                setSupaEditId(null);
                setSupaForm(initialFormState);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSupaDelete = async (id) => {
        if (!window.confirm("Delete this user?")) return;
        try {
            const response = await fetch(`${API_URL}/pg/${id}`, {
                method: "DELETE",
            });
            const result = await response.json();
            if (result.success)
                setSupaUsers(supaUsers.filter((u) => u.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col gap-6 h-full min-h-0">
            {/* ==================== MONGODB PANEL ==================== */}
            <div className="flex-1 flex flex-col min-h-0 bg-white border border-gray-200 rounded-sm shadow-sm">
                <div className="shrink-0 px-4 py-3 border-b border-gray-200 bg-slate-50 flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                        Users (MongoDB)
                    </span>
                </div>
                <UserForm
                    formState={mongoForm}
                    onChange={handleMongoChange}
                    onSubmit={handleMongoSubmit}
                    editId={mongoEditId}
                    onCancel={() => {
                        setMongoEditId(null);
                        setMongoForm(initialFormState);
                    }}
                />
                <UserList
                    users={mongoUsers}
                    idKey="_id"
                    onEdit={handleMongoEditClick}
                    onDelete={handleMongoDelete}
                    emptyMessage="No data found in MongoDB"
                />
            </div>

            {/* ==================== SUPABASE PANEL ==================== */}
            <div className="flex-1 flex flex-col min-h-0 bg-white border border-gray-200 rounded-sm shadow-sm">
                <div className="shrink-0 px-4 py-3 border-b border-gray-200 bg-slate-50 flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                        Users (Supabase)
                    </span>
                </div>
                <UserForm
                    formState={supaForm}
                    onChange={handleSupaChange}
                    onSubmit={handleSupaSubmit}
                    editId={supaEditId}
                    onCancel={() => {
                        setSupaEditId(null);
                        setSupaForm(initialFormState);
                    }}
                />
                <UserList
                    users={supaUsers}
                    idKey="id"
                    onEdit={handleSupaEditClick}
                    onDelete={handleSupaDelete}
                    emptyMessage="No data found in Supabase"
                />
            </div>
        </div>
    );
}
