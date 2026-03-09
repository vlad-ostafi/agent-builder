import { Sidebar } from "@/components/Sidebar";
import { ChatContainer } from "@/components/chat/ChatContainer";
import { agentSeedData } from "@/lib/agents";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ agentId: string }>;
}) {
  const { agentId } = await params;
  const agent = agentSeedData.find((a) => a.id === agentId);

  if (!agent) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-content-bg">
        <p className="text-lg text-content-text">
          Agent not found. Please check the URL and try again.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar />
      <ChatContainer agent={agent} />
    </div>
  );
}
