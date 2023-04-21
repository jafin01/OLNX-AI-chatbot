import { create } from "zustand";

export const useConfigStore = create((set) => ({
  configs: [],
  setConversation: ({
    configs,
  }: {
    configs: any;
    messages: any;
    name: any;
  }) =>
    set((state: any) => ({
      configs: configs,
    })),
}));
