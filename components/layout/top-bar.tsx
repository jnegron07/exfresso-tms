"use client";

import * as React from "react";
import { useSidebar } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface TopBarProps {
  onOpenCommandPalette?: () => void;
}

export function TopBar({ onOpenCommandPalette }: TopBarProps) {
  const { isMobile } = useSidebar();

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenCommandPalette?.();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onOpenCommandPalette]);

  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b border-gray-200 h-16 min-h-16 shrink-0 flex items-center justify-between px-6">
      {/* Search Bar */}
      <div className="flex items-center flex-1 max-w-2xl px-2">
        <div className="relative w-full group">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0D9488] transition-colors !text-[20px]">
            search
          </span>
          <input
            className="w-full bg-gray-100 border-0 rounded-lg py-2.5 pl-11 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/30 focus:bg-white transition-all font-body cursor-pointer"
            placeholder="Search shipments, documents, or contacts... (Cmd+K)"
            type="text"
            readOnly
            onClick={() => onOpenCommandPalette?.()}
          />
          <button
            type="button"
            onClick={() => onOpenCommandPalette?.()}
            className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 px-1.5 py-0.5 rounded bg-gray-200 text-[10px] text-gray-500 font-medium h-5 hover:bg-gray-300 transition-colors cursor-pointer"
          >
            <span className="text-[12px]">⌘</span>K
          </button>
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-1.5 ml-4">
        <Button variant="ghost" size="icon" className="relative text-gray-500 hover:text-[#0D9488] hover:bg-gray-100 rounded-lg">
          <span className="material-symbols-outlined !text-[22px]">notifications</span>
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
        </Button>

        <div className="h-5 w-px bg-gray-200 mx-2" />

        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 hover:bg-gray-100" />}>
            <Avatar className="h-9 w-9 border border-gray-200">
              <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
              <AvatarFallback className="bg-[#0D9488] text-white text-xs font-bold">JD</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white border-gray-200 shadow-lg" align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-semibold leading-none text-gray-900">Juan Doe</p>
                  <p className="text-xs leading-none text-gray-500">juan.doe@exfresso.com</p>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-gray-200" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer text-gray-700 focus:bg-gray-100 focus:text-gray-900 rounded-md">
                <span className="material-symbols-outlined mr-2 !text-[18px]">person</span>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-gray-700 focus:bg-gray-100 focus:text-gray-900 rounded-md">
                <span className="material-symbols-outlined mr-2 !text-[18px]">settings</span>
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-gray-200" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer text-rose-600 focus:bg-rose-50 focus:text-rose-700 rounded-md">
                <span className="material-symbols-outlined mr-2 !text-[18px] text-rose-500">logout</span>
                Log Out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
