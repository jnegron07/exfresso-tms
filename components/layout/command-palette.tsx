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

interface CommandPaletteProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CommandPalette({ open: externalOpen, onOpenChange }: CommandPaletteProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const router = useRouter();
  const open = externalOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (!externalOpen) {
          setInternalOpen((open) => !open);
        }
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [externalOpen]);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search shipments, contacts, documents..." />
      <CommandList>
        <CommandEmpty>No se encontraron resultados.</CommandEmpty>
        
        <CommandGroup heading="Shipments">
          <CommandItem onSelect={() => runCommand(() => router.push("/shipments"))}>
            <span className="material-symbols-outlined mr-2">local_shipping</span>
            <span>View All Shipments</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/shipments/new"))}>
            <span className="material-symbols-outlined mr-2">add_circle</span>
            <span>Create New Shipment</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/tracking/map"))}>
            <span className="material-symbols-outlined mr-2">location_on</span>
            <span>Track on Map</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Contacts">
          <CommandItem onSelect={() => runCommand(() => router.push("/contacts"))}>
            <span className="material-symbols-outlined mr-2">person</span>
            <span>Search Contacts</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/contacts/new"))}>
            <span className="material-symbols-outlined mr-2">person_add</span>
            <span>Add Contact</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Rate Cards">
          <CommandItem onSelect={() => runCommand(() => router.push("/rate-cards"))}>
            <span className="material-symbols-outlined mr-2">payments</span>
            <span>View Rate Cards</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/rate-cards/new"))}>
            <span className="material-symbols-outlined mr-2">add_card</span>
            <span>Create Rate</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Documents">
          <CommandItem onSelect={() => runCommand(() => router.push("/documents"))}>
            <span className="material-symbols-outlined mr-2">description</span>
            <span>View Documents</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/documents/upload"))}>
            <span className="material-symbols-outlined mr-2">upload_file</span>
            <span>Upload Document</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => runCommand(() => router.push("/settings"))}>
            <span className="material-symbols-outlined mr-2">settings</span>
            <span>Settings</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard"))}>
            <span className="material-symbols-outlined mr-2">dashboard</span>
            <span>Dashboard</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
