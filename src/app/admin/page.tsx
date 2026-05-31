import {redirect} from "next/navigation";

export default function AdminOverviewPage() {
  // Simple redirect to users page for now
  redirect("/admin/users");
}
