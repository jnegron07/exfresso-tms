"use client";

import * as React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Shipments">
          <CommandItem onSelect={() => runCommand(() => router.push("/shipments"))}>
            <span className="material-symbols-outlined mr-2">local_shipping</span>
            <span>View All Shipments</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/shipments/new"))}>
            <span className="material-symbols-outlined mr-2">add_circle</span>
            <span>Create New Shipment</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Contacts">
          <CommandItem onSelect={() => runCommand(() => router.push("/contacts"))}>
            <span className="material-symbols-outlined mr-2">person</span>
            <span>Search Contacts</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Finance">
          <CommandItem onSelect={() => runCommand(() => router.push("/rate-cards"))}>
            <span className="material-symbols-outlined mr-2">payments</span>
            <span>View Rate Cards</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => runCommand(() => router.push("/settings"))}>
            <span className="material-symbols-outlined mr-2">settings</span>
            <span>Open Settings</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
