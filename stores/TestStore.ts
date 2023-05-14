import { defineStore } from "pinia";
import Cookies from "js-cookie";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
import uniqid from "uniqid";
import { useStorage } from "@vueuse/core";

type Blueprint = {
  title: string;
  text: string;
};
const pinia = createPinia();
pinia.use(piniaPersist);

export type Tag = {
  id: any;
  tag_name: string;
  color: string;
  folded: boolean;
  editing: boolean;
  people: Array<any>;
};

export type Person = {
  realname: string;
  chat_href: string;
};

export const useStore = defineStore("chatsorted", {
  state: () => {
    return {
      // all these properties will have their type inferred automatically

      user: useStorage("user", {
        username: "",
        profile: 0,
      }),

      premium: useStorage("premium", true),
      validated: true,
      actualUrl: useStorage("actualUrl", ""),
      focused: null as Tag | null,
      token: useStorage("token", ""),
    };
  },
  getters: {
    getPremiumStatus(state) {
      return state.premium;
    },
    getToken(state) {
      return state.token;
    },
  },
  actions: {
    setuser(user: any) {
      this.user = user;
    },
    setToken(token: string) {
      this.token = token;
    },

    //updateFriend(friend_name, tags) {
    //  let friend_tags = this.tags.filter(tag => tag.people.some(e => e.realname === friend_name))
    //
    //  console.log(friend_tags)
    //},

    setFocused(value: any) {
      this.focused = value;
    },
    setActualUrl(value: string) {
      this.actualUrl = value;
    },
  },

  // other options...
});

export default pinia;
