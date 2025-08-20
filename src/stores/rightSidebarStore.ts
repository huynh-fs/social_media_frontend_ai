import { create } from "zustand";

export type PanelType = "DEFAULT" | "EXPLORE" | "NOTIFICATIONS" | "MESSAGES" | "PROFILE";

interface IRightSidebarState {
  activePanel: PanelType;
  setActivePanel: (panel: PanelType) => void;
}

export const useRightSidebarStore = create<IRightSidebarState>((set) => ({
  activePanel: "DEFAULT",
  setActivePanel: (panel) => set({ activePanel: panel }),
}));
