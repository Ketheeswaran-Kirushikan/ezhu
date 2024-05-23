import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set((state) => ({ ...state, selectedConversation })),
  messages: [],
  setMessages: (messages) => set((state) => ({ ...state, messages })),
}));

export default useConversation;
