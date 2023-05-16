import { create } from "zustand";

export const useConversationStore = create((set) => ({
  configs: [],
  message: [],
  name: "",
  setConversation: ({
    configs,
    messages,
    name,
  }: {
    configs: any;
    messages: any;
    name: any;
  }) =>
    set((state: any) => ({
      configs: configs,
      messages: messages,
      name: name,
    })),
}));
