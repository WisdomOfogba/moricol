import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import DashboardToolbar from "@/components/dashboard/dashboard-toolbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex">
      <DashboardSidebar />
      <div className="grow">
        <DashboardToolbar />
        {children}
      </div>
    </section>
  );
}
