import { Sidebar } from "@/components/Sidebar";
import { AgentListPage } from "@/components/AgentListPage";

export default function Home() {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar />
      <AgentListPage />
    </div>
  );
}
