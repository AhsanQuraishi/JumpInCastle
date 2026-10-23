import { redirect } from "next/navigation";
import { getIsAdmin } from "@/lib/adminAuth";
import AdminBookingsClient from "./AdminBookingsClient";

export const metadata = { robots: { index: false, follow: false } };

export default function AdminPage() {
  if (!getIsAdmin()) {
    redirect("/admin/login");
  }
  return <AdminBookingsClient />;
}
