import { create } from "zustand";
import type { CompleteLessonResponse } from "@/actions/course/continue";

interface XpPopupStore {
  showXpPopup: boolean;
  xpData: CompleteLessonResponse | null;
  showPopup: (data: CompleteLessonResponse) => void;
  hidePopup: () => void;
}

export const useXpPopupStore = create<XpPopupStore>((set) => ({
  showXpPopup: false,
  xpData: null,
  showPopup: (data: CompleteLessonResponse) => {
    set({ showXpPopup: true, xpData: data });
    // Remove o popup após 2 segundos
    setTimeout(() => {
      set({ showXpPopup: false, xpData: null });
    }, 2000);
  },
  hidePopup: () => set({ showXpPopup: false, xpData: null }),
}));

