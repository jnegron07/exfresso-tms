import { create } from "zustand";

interface RouteSearchState {
  origin: string;
  destination: string;
  mode: string;
  isSearching: boolean;
  results: any[];
  setSearchParams: (origin: string, destination: string, mode: string) => void;
  setSearching: (isSearching: boolean) => void;
  setResults: (results: any[]) => void;
  reset: () => void;
}

export const useRouteSearchStore = create<RouteSearchState>((set) => ({
  origin: "",
  destination: "",
  mode: "Ocean",
  isSearching: false,
  results: [],
  setSearchParams: (origin, destination, mode) => set({ origin, destination, mode }),
  setSearching: (isSearching) => set({ isSearching }),
  setResults: (results) => set({ results }),
  reset: () => set({ origin: "", destination: "", isSearching: false, results: [] }),
}));
