"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const mainNav = [
  { href: "/dashboard", icon: "dashboard", label: "Dashboard" },
  { href: "/shipments", icon: "local_shipping", label: "Shipments" },
  { href: "/routes/search", icon: "alt_route", label: "Route Search" },
  { href: "/rate-cards", icon: "payments", label: "Rate Cards" },
  { href: "/network", icon: "public", label: "Network" },
];

const secondaryNav = [
  { href: "/documents", icon: "description", label: "Documents" },
  { href: "/finance", icon: "account_balance", label: "Finance" },
  { href: "/contacts", icon: "contacts", label: "Contacts" },
];

const bottomNav = [
  { href: "/settings", icon: "settings", label: "Settings" },
];

function NavSection({
  items,
  pathname,
  isCollapsed,
}: {
  items: typeof mainNav;
  pathname: string;
  isCollapsed: boolean;
}) {
  return (
    <SidebarMenu className={cn("gap-0.5", isCollapsed ? "px-0 items-center" : "px-2")}>
      {items.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <SidebarMenuItem
            key={item.href}
            className={cn("relative", isCollapsed && "flex justify-center w-full")}
          >
            <SidebarMenuButton
              isActive={isActive}
              tooltip={item.label}
              render={<Link href={item.href} />}
              className={cn(
                "flex items-center rounded-lg transition-all duration-200 group/nav",
                isCollapsed ? "justify-center !overflow-visible" : "gap-3 py-2.5 px-3",
                isActive
                  ? "bg-[#0D9488]/12 text-[#5EEAD4] hover:bg-[#0D9488]/18 hover:text-[#5EEAD4]"
                  : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
              )}
            >
              <span
                className={cn(
                  "material-symbols-outlined !text-[20px] !w-5 !h-5 leading-none flex-shrink-0 transition-colors duration-200",
                  isActive ? "text-[#0D9488]" : "text-slate-500 group-hover/nav:text-slate-300"
                )}
              >
                {item.icon}
              </span>
              {!isCollapsed && (
                <span className={cn(
                  "text-[13px] font-medium tracking-wide",
                  isActive ? "text-[#5EEAD4]" : ""
                )}>
                  {item.label}
                </span>
              )}
            </SidebarMenuButton>
            {isActive && !isCollapsed && (
              <div className="absolute left-0 top-1.5 bottom-1.5 w-[3px] bg-[#0D9488] rounded-r-full shadow-[0_0_8px_rgba(13,148,136,0.4)]" />
            )}
            {isActive && isCollapsed && (
              <div className="absolute left-0 top-2 bottom-2 w-[3px] bg-[#0D9488] rounded-r-full shadow-[0_0_8px_rgba(13,148,136,0.4)]" />
            )}
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      {/* Logo Header */}
      <SidebarHeader className="bg-[#1B2A4A] p-0 h-16 flex flex-row items-center overflow-hidden">
        <Link
          href="/"
          className={cn(
            "flex items-center",
            isCollapsed ? "justify-center w-full" : "pl-5"
          )}
        >
          {isCollapsed ? (
            <img src="/icon.svg" alt="Exfresso" className="h-8 w-8" />
          ) : (
            <img src="/logo.svg" alt="Exfresso Logo" className="h-7 w-auto" />
          )}
        </Link>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="bg-[#1B2A4A] pt-4 flex flex-col gap-0">
        {/* Main Navigation */}
        <NavSection items={mainNav} pathname={pathname} isCollapsed={isCollapsed} />

        {/* Divider */}
        <div className={cn("my-3", isCollapsed ? "mx-3" : "mx-4")}>
          <div className="h-px bg-white/[0.06]" />
        </div>

        {/* Secondary Navigation */}
        <NavSection items={secondaryNav} pathname={pathname} isCollapsed={isCollapsed} />

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom Navigation */}
        <NavSection items={bottomNav} pathname={pathname} isCollapsed={isCollapsed} />
      </SidebarContent>

      {/* User Profile Footer */}
      <SidebarFooter className="bg-[#1B2A4A] p-2">
        <div
          className={cn(
            "flex items-center w-full rounded-lg transition-colors duration-200",
            isCollapsed
              ? "justify-center py-2"
              : "px-3 py-2 hover:bg-white/[0.04]"
          )}
        >
          {!isCollapsed ? (
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0D9488] to-[#0D9488]/70 flex items-center justify-center text-white font-semibold text-[11px] shrink-0 shadow-[0_0_12px_rgba(13,148,136,0.2)]">
                JD
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-white/90 text-[13px] font-semibold truncate">
                  Juan Doe
                </span>
                <span className="text-slate-500 text-[11px] font-medium">Admin</span>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0D9488] to-[#0D9488]/70 flex items-center justify-center text-white font-semibold text-[11px] shadow-[0_0_12px_rgba(13,148,136,0.2)]">
              JD
            </div>
          )}
        </div>
      </SidebarFooter>

      {/* Collapse Button */}
      <div className={cn(
        "bg-[#1B2A4A] p-2",
        isCollapsed ? "flex justify-center" : "px-2"
      )}>
        <SidebarTrigger
          className={cn(
            "w-full rounded-lg transition-colors duration-200",
            isCollapsed
              ? "justify-center py-2"
              : "flex justify-center py-2 hover:bg-white/[0.04]"
          )}
        >
          <span className="material-symbols-outlined !text-[20px] text-slate-400 group-hover:text-slate-200 transition-colors">
            {isCollapsed ? "chevron_right" : "chevron_left"}
          </span>
        </SidebarTrigger>
      </div>
    </Sidebar>
  );
}
