import { connectToDatabase } from "@/lib/mongodb";
import MenuItem from "@/models/MenuItem";
import Sidebar from "@/components/admin/Sidebar";
import ClientMenuItemFormWrapper from "@/components/admin/ClientMenuItemFormWrapper";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Modifica Menu Item",
  description: "Modifica un elemento del menu",
};

async function getMenuItem(id) {
  await connectToDatabase();
  const item = await MenuItem.findById(id);

  if (!item) {
    return null;
  }

  return JSON.parse(JSON.stringify(item));
}

export default async function EditMenuItemPage({ params }) {
  const menuItem = await getMenuItem(params.id);

  if (!menuItem) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1 p-6">
          <ClientMenuItemFormWrapper menuItem={menuItem} />
        </main>
      </div>
    </div>
  );
}
