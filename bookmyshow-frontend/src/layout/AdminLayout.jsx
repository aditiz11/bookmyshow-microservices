import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";

function AdminLayout() {
    return (
        <div className="min-h-screen bg-[#09090b] text-white flex">

            <AdminSidebar />

            <main className="
                flex-1
                p-8
                overflow-y-auto
                bg-gradient-to-br
                from-[#09090b]
                via-[#111827]
                to-[#09090b]
            ">

                <Outlet />

            </main>

        </div>
    );
}

export default AdminLayout;