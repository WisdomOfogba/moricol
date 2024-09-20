import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import DashboardToolbar from "@/components/dashboard/dashboard-toolbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-screen overflow-hidden">
      <DashboardSidebar />
      <div className="no-scrollbar grow overflow-y-auto relative">
        <DashboardToolbar />
        {children}
      </div>
    </section>
  );
}
