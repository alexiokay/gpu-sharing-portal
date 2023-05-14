import { defineStore } from "pinia";

import { createPinia } from "pinia";
import uniqid from "uniqid";
import { useStorage } from "@vueuse/core";

const pinia = createPinia();
import { useUserStore } from "./User";
export const useMainStore = defineStore("mainStore", {
  state: () => {
    return {};
  },
  getters: {},
  actions: {},
  persist: {
    storage: persistedState.sessionStorage,
  },
  // other options...
});

export default pinia;
