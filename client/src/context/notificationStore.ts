import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import apiRequest from "../data/apiRequest";

interface NotificationState {
  count: number;
  fetchCount: () => void;
  decreaseCount: () => void;
}

export const useNotificationStore = create<NotificationState>()(
  devtools(
    persist(
      (set) => ({
        count: 0,
        fetchCount: async () => {
          const res = await apiRequest("/user/notification");

          set({ count: res.data });
        },
        decreaseCount: () => {
          set((state) => ({
            count: state.count - 1,
          }));
        },
      }),
      { name: "notificationStore" }
    )
  )
);
