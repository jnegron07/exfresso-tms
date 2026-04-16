"use client";

import { useSidebar } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function TopBar() {
  const { isMobile } = useSidebar();

  return (
    <header className="sticky top-0 z-30 w-full bg-[#1B2A4A] h-16 min-h-16 shrink-0 flex items-center justify-between px-6">
      {/* Search Bar */}
      <div className="flex items-center flex-1 max-w-2xl px-2">
        <div className="relative w-full group">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#0D9488] transition-colors !text-[20px]">
            search
          </span>
          <input
            className="w-full bg-white/[0.04] border-0 rounded-lg py-2.5 pl-11 pr-4 text-sm text-white/90 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-[#0D9488]/30 focus:bg-white/[0.06] transition-all font-body"
            placeholder="Search shipments, documents, or contacts... (Cmd+K)"
            type="text"
            onFocus={(e) => {
              // Trigger command palette if possible
            }}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/[0.06] text-[10px] text-slate-500 font-medium h-5">
            <span className="text-[12px]">⌘</span>K
          </div>
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-1.5 ml-4">
        <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-[#0D9488] hover:bg-white/[0.04] rounded-lg">
          <span className="material-symbols-outlined !text-[22px]">notifications</span>
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#1B2A4A]" />
        </Button>

        <div className="h-5 w-px bg-white/[0.06] mx-2" />

        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 hover:bg-white/[0.04]" />}>
            <Avatar className="h-9 w-9 border border-white/[0.08]">
              <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
              <AvatarFallback className="bg-white/[0.06] text-white text-xs font-bold">JD</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-[#1B2A4A] border-white/[0.08] shadow-[0_20px_40px_rgba(0,0,0,0.4)]" align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold leading-none text-white/90">Juan Doe</p>
                <p className="text-xs leading-none text-slate-500">juan.doe@exfresso.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/[0.06]" />
            <DropdownMenuItem className="cursor-pointer text-slate-300 focus:bg-white/[0.04] focus:text-white rounded-md">
              <span className="material-symbols-outlined mr-2 !text-[18px]">person</span>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-slate-300 focus:bg-white/[0.04] focus:text-white rounded-md">
              <span className="material-symbols-outlined mr-2 !text-[18px]">settings</span>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/[0.06]" />
            <DropdownMenuItem className="text-rose-400 cursor-pointer focus:bg-white/[0.04] focus:text-rose-300 rounded-md">
              <span className="material-symbols-outlined mr-2 !text-[18px] text-rose-400">logout</span>
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
