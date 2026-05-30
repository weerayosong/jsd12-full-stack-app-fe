import { useCrud } from "../../hooks/useCrud";
import ColumnPanel from "../common/ColumnPanel";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3002/api/v2";

const initialProductForm = {
    name: "",
    price: "",
    category: "",
    inStock: "true",
    description: "",
};

export default function ProductsColumn() {
    const mongo = useCrud(`${API_URL}/products`, initialProductForm, "_id");
    const supa = useCrud(`${API_URL}/products/pg`, initialProductForm, "id");

    return (
        <div className="flex flex-col gap-6 h-full min-h-0">
            {/* ==================== MONGODB ==================== */}
            <ColumnPanel title="Products (MongoDB)">
                <ProductForm
                    form={mongo.form}
                    onChange={mongo.handleChange}
                    onSubmit={mongo.handleSubmit}
                    editId={mongo.editId}
                    onCancel={mongo.cancelEdit}
                />
                <ProductList
                    products={mongo.data}
                    idKey="_id"
                    onEdit={mongo.handleEditClick}
                    onDelete={mongo.handleDelete}
                    emptyMessage="No data found in MongoDB"
                />
            </ColumnPanel>

            {/* ==================== SUPABASE ==================== */}
            <ColumnPanel title="Products (Supabase)">
                <ProductForm
                    form={supa.form}
                    onChange={supa.handleChange}
                    onSubmit={supa.handleSubmit}
                    editId={supa.editId}
                    onCancel={supa.cancelEdit}
                />
                <ProductList
                    products={supa.data}
                    idKey="id"
                    onEdit={supa.handleEditClick}
                    onDelete={supa.handleDelete}
                    emptyMessage="No data found in Supabase"
                />
            </ColumnPanel>
        </div>
    );
}
