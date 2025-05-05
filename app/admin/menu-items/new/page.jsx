import Sidebar from "@/components/admin/Sidebar";
import ClientMenuItemFormWrapper from "@/components/admin/ClientMenuItemFormWrapper";

export const metadata = {
  title: "Nuovo Menu Item",
  description: "Aggiungi un nuovo elemento al menu",
};

export default function NewMenuItemPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1 p-6">
          <ClientMenuItemFormWrapper />
        </main>
      </div>
    </div>
  );
}
