import { useCrud } from "../../hooks/useCrud";
import ColumnPanel from "../common/ColumnPanel";
import UserForm from "./UserForm";
import UserList from "./UserList";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3002/api/v2";

const initialForm = { username: "", email: "", password: "", role: "user" };

export default function UsersColumn() {
    const mongo = useCrud(`${API_URL}/users`, initialForm, "_id");
    const supa = useCrud(`${API_URL}/users/pg`, initialForm, "id");

    return (
        <div className="flex flex-col gap-6 h-full min-h-0">
            {/* ==================== MONGODB ==================== */}
            <ColumnPanel title="Users (MongoDB)">
                <UserForm
                    form={mongo.form}
                    onChange={mongo.handleChange}
                    onSubmit={mongo.handleSubmit}
                    editId={mongo.editId}
                    onCancel={mongo.cancelEdit}
                />
                <UserList
                    users={mongo.data}
                    idKey="_id"
                    onEdit={mongo.handleEditClick}
                    onDelete={mongo.handleDelete}
                    emptyMessage="No data found in MongoDB"
                />
            </ColumnPanel>

            {/* ==================== SUPABASE ==================== */}
            <ColumnPanel title="Users (Supabase)">
                <UserForm
                    form={supa.form}
                    onChange={supa.handleChange}
                    onSubmit={supa.handleSubmit}
                    editId={supa.editId}
                    onCancel={supa.cancelEdit}
                />
                <UserList
                    users={supa.data}
                    idKey="id"
                    onEdit={supa.handleEditClick}
                    onDelete={supa.handleDelete}
                    emptyMessage="No data found in Supabase"
                />
            </ColumnPanel>
        </div>
    );
}
