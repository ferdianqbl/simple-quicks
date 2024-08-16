import { create } from "zustand";

type Store = {
  isNew: boolean;
  setNew: (status: boolean) => void;
};

const useNewMessageStore = create<Store>()((set) => ({
  isNew: false,
  setNew: (status) => set({ isNew: status }),
}));

export { useNewMessageStore };
