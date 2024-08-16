import { create } from "zustand";
import { TMessage } from "../types";

type Store = {
  isReply: boolean;
  setIsReply: (status: boolean) => void;
  replyData: TMessage;
  setReplyData: (data: TMessage) => void;
};

const useReplyStore = create<Store>()((set) => ({
  isReply: false,
  setIsReply: () => set((state) => ({ isReply: !state.isReply })),
  replyData: {
    id: 0,
    message: "",
    sender: 0,
    timestamp: "",
  },
  setReplyData: (data) => set({ replyData: data }),
}));

export { useReplyStore };
