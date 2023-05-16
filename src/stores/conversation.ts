import { create } from "zustand";

export const useConversationStore = create((set) => ({
  configs: [],
  messages: [],
  name: "",
  setConversation: ({
    configs,
    messages,
  }: {
    configs: any;
    messages: any;
  }) =>
    set((state: any) => ({
      configs,
      messages,
    })),
}));
