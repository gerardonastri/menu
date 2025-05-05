import Sidebar from "@/components/admin/Sidebar";
import ClientDashboardWrapper from "@/components/admin/ClientDashboardWrapper";

export const metadata = {
  title: "Admin Dashboard",
  description: "Gestione menu del ristorante",
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1 p-6">
          <ClientDashboardWrapper />
        </main>
      </div>
    </div>
  );
}
