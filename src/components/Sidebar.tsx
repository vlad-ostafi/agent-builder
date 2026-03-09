import Image from "next/image";
import {
  type LucideIcon,
  Sparkles,
  Zap,
  Lightbulb,
  BarChart3,
  SlidersHorizontal,
  Bell,
  Settings,
} from "lucide-react";

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
}

function NavItem({ icon: Icon, label, active = false }: NavItemProps) {
  return (
    <button
      className={`flex flex-col items-center gap-1 w-full py-2 transition-colors ${
        active
          ? "text-sidebar-text-active"
          : "text-sidebar-text hover:text-sidebar-text-active"
      }`}
    >
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-lg ${
          active ? "bg-white/10" : ""
        }`}
      >
        <Icon size={20} />
      </div>
      <span className="text-[12px] leading-tight">{label}</span>
    </button>
  );
}

export function Sidebar() {
  return (
    <aside className="flex flex-col items-center w-[92px] h-full bg-sidebar-bg border-r border-sidebar-border shrink-0">
      {/* Logo */}
      <div className="flex items-center justify-center w-full py-5">
        <Image src="/logo.png" alt="Covecta" width={40} height={40} />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col items-center gap-1 flex-1 w-full px-2 pt-2">
        <NavItem icon={Sparkles} label="Vecta" />
        <NavItem icon={Zap} label="Agent Studio" active />
        <NavItem icon={Lightbulb} label="Knowledge Base" />
        <NavItem icon={BarChart3} label="Analytics" />
        <NavItem icon={SlidersHorizontal} label="Control Panel" />
      </nav>

      {/* Bottom section */}
      <div className="flex flex-col items-center gap-1 w-full px-2 pb-4">
        <NavItem icon={Bell} label="Notifications" />
        <NavItem icon={Settings} label="Settings" />
        <div className="mt-2 flex items-center justify-center w-9 h-9 rounded-full bg-accent-purple/20 text-accent-purple text-xs font-semibold">
          SW
        </div>
      </div>
    </aside>
  );
}
