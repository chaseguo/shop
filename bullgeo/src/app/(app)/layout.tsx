import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { AppShell } from "@/components/AppShell";
import { SidebarProvider } from "@/contexts/sidebar-context";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar />
        <AppShell>
          <TopBar />
          <main className="flex-1 overflow-y-auto">
            <div className="p-6 max-w-[1440px] mx-auto">
              {children}
            </div>
          </main>
        </AppShell>
      </div>
    </SidebarProvider>
  );
}
