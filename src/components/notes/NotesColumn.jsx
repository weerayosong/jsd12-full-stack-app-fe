import { useCrud } from "../../hooks/useCrud";
import ColumnPanel from "../common/ColumnPanel";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3002/api/v2";

const initialNoteForm = { title: "", content: "", isCompleted: false };

export default function NotesColumn() {
    const mongo = useCrud(`${API_URL}/notes`, initialNoteForm, "_id");
    const supa = useCrud(`${API_URL}/notes/pg`, initialNoteForm, "id");

    return (
        <div className="flex flex-col gap-6 h-full min-h-0">
            {/* ==================== MONGODB ==================== */}
            <ColumnPanel title="Notes (MongoDB)">
                <NoteForm
                    form={mongo.form}
                    onChange={mongo.handleChange}
                    onSubmit={mongo.handleSubmit}
                    editId={mongo.editId}
                    onCancel={mongo.cancelEdit}
                />
                <NoteList
                    notes={mongo.data}
                    idKey="_id"
                    onEdit={mongo.handleEditClick}
                    onDelete={mongo.handleDelete}
                    emptyMessage="No notes found in MongoDB"
                />
            </ColumnPanel>

            {/* ==================== SUPABASE ==================== */}
            <ColumnPanel title="Notes (Supabase)">
                <NoteForm
                    form={supa.form}
                    onChange={supa.handleChange}
                    onSubmit={supa.handleSubmit}
                    editId={supa.editId}
                    onCancel={supa.cancelEdit}
                />
                <NoteList
                    notes={supa.data}
                    idKey="id"
                    onEdit={supa.handleEditClick}
                    onDelete={supa.handleDelete}
                    emptyMessage="No notes found in Supabase"
                />
            </ColumnPanel>
        </div>
    );
}
