import { useState, useEffect } from "react";

export function useCrud(apiUrl, initialFormState, idKey = "id") {
    const [data, setData] = useState([]);
    const [form, setForm] = useState(initialFormState);
    const [editId, setEditId] = useState(null);

    // GET
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                const result = await response.json();
                if (result.success) setData(result.data);
            } catch (error) {
                console.error(`Fetch Error (${apiUrl}):`, error);
            }
        };

        fetchData();
    }, [apiUrl]);

    // Form Handlers
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleEditClick = (item) => {
        setEditId(item[idKey]);

        const formCopy = { ...item };
        if (formCopy.password !== undefined) formCopy.password = "";
        setForm(formCopy);
    };

    const cancelEdit = () => {
        setEditId(null);
        setForm(initialFormState);
    };

    // POST & PUT
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isEditing = !!editId;
        const url = isEditing ? `${apiUrl}/${editId}` : apiUrl;

        const payload = { ...form };

        if (isEditing && payload.password === "") {
            delete payload.password;
        }

        try {
            const response = await fetch(url, {
                method: isEditing ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const result = await response.json();

            if (result.success) {
                if (isEditing) {
                    setData(
                        data.map((item) =>
                            item[idKey] === editId ? result.data : item,
                        ),
                    );
                } else {
                    setData([...data, result.data]);
                }
                cancelEdit();
            } else {
                alert(`Error: ${result.error?.message || result.error}`);
            }
        } catch (error) {
            console.error("Submit Error:", error);
        }
    };

    // DELETE
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this?")) return;
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: "DELETE",
            });
            const result = await response.json();
            if (result.success) {
                setData(data.filter((item) => item[idKey] !== id));
            }
        } catch (error) {
            console.error("Delete Error:", error);
        }
    };

    return {
        data,
        form,
        editId,
        handleChange,
        handleEditClick,
        cancelEdit,
        handleSubmit,
        handleDelete,
    };
}
