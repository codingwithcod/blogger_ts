import { create } from "zustand";
import { persist } from "zustand/middleware";

const authStore = (set) => ({
  userProfile: null,
  allUsers: [],

  addUser: (user) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }),
});

const useAuthStore = create(
  persist(authStore, {
    name: "blogger_profle",
  })
);

export default useAuthStore;
