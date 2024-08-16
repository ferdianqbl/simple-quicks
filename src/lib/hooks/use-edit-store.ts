import { create } from "zustand";
import { TMessage } from "../types";

type Store = {
  isEdit: boolean;
  setIsEdit: (status: boolean) => void;
  editData: TMessage;
  setEditData: (data: TMessage) => void;
};

const useEditStore = create<Store>()((set) => ({
  isEdit: false,
  setIsEdit: () => set((state) => ({ isEdit: !state.isEdit })),
  editData: {
    id: 0,
    message: "",
    sender: 0,
    timestamp: "",
  },
  setEditData: (data) => set({ editData: data }),
}));

export { useEditStore };
