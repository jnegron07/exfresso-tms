"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", icon: "dashboard", label: "Dashboard" },
  { href: "/shipments", icon: "local_shipping", label: "Shipments" },
  { href: "/routes/search", icon: "route", label: "Routes" },
  { href: "/rate-cards", icon: "payments", label: "Financials" },
  { href: "/settings", icon: "settings", label: "Settings" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 border-r-0 bg-surface-container-low flex flex-col py-6 font-headline text-sm tracking-wide z-50 shadow-xl">
      {/* Logo */}
      <div className="px-6 mb-10">
        <h1 className="text-xl font-bold text-on-surface tracking-tight">TMS Central</h1>
        <p className="text-xs text-on-surface-variant opacity-60">Predictive Command</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-3 rounded-lg transition-all duration-200",
                isActive
                  ? "text-secondary border-l-2 border-secondary bg-white/5"
                  : "text-on-surface-variant hover:bg-white/10 hover:text-on-surface scale-95 active:scale-90"
              )}
            >
              <span className="material-symbols-outlined mr-3 text-xl">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="px-6 mt-auto pt-6 border-t border-outline-variant/10">
        <div className="flex items-center gap-3">
          <img
            alt="Alex Chen"
            className="w-10 h-10 rounded-full object-cover border border-secondary/30"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8iwOhBvV-pejKVZBLrIpy1dIQjygrrhUFhCB3A3hDOoz4bqzo86uMyR6VEQpFa-PtIAU7Rx-zZn6thTh2abKfQfedOYGDJj4AFodf_EYh7B-_BXXqiI5AWCRjl4BOlQHP5xbttS_lwMtfzYCJZYRllPLQD071GYI5UPpEOFFUc5G3YMqli0Ix34iecgj3Xs2z_DeMSbadwflA3yOV9QvJ8Dhk3bX_wAKWJvUthqwIQp5kqrEvU8_xBTxfpTCfF-hbLrOW-gdwHrNq"
          />
          <div className="overflow-hidden">
            <p className="text-on-surface font-semibold truncate">Alex Chen</p>
            <p className="text-on-surface-variant text-xs truncate">Fleet Director</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
