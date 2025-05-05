import { connectToDatabase } from "@/lib/mongodb";
import MenuItem from "@/models/MenuItem";
import Sidebar from "@/components/admin/Sidebar";
import ClientMenuItemsListWrapper from "@/components/admin/ClientMenuItemsListWrapper";

export const metadata = {
  title: "Gestione Menu Items",
  description: "Visualizza e gestisci tutti gli elementi del menu",
};

async function getMenuItems() {
  await connectToDatabase();
  const items = await MenuItem.find({});
  return JSON.parse(JSON.stringify(items));
}

export default async function MenuItemsPage({ searchParams }) {
  const menuItems = await getMenuItems();
  const { time, category } = searchParams;

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1 p-6">
          <ClientMenuItemsListWrapper
            initialItems={menuItems}
            time={time}
            category={category}
          />
        </main>
      </div>
    </div>
  );
}
