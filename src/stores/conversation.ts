import { create } from "zustand";

export const useConversationStore = create((set) => ({
  config1: {},
  config2: {},
  message: [],
  name: "",
  setConversation: ({
    config1,
    config2,
    messages,
    name,
  }: {
    config1: any;
    config2: any;
    messages: any;
    name: any;
  }) =>
    set((state: any) => ({
      config1: config1,
      config2: config2,
      messages: messages,
      name: name,
    })),
}));
