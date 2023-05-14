import { defineStore } from "pinia";
import { createPinia } from "pinia";

const pinia = createPinia();

// @ts-ignore: Unreachable code error
export const useUserStore = defineStore("User", {
  state: () => {
    return {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      token: "",
      isLogged: false,
      is_activated: false,
      activated_by: null,
      accountType: "arrow-employee", //arrow_employee, carrier
    };
  },
  getters: {
    getUser(state) {
      return {
        username: state.username,
        email: state.email,
        token: state.token,
        isLogged: state.isLogged,
        accountType: state.accountType,
      };
    },
    getUsername(state) {
      return state.username;
    },
    getEmail(state) {
      return state.email;
    },
    getToken(state) {
      return state.token;
    },
    getIsLogged(state) {
      return state.isLogged;
    },
    getAccountType(state) {
      return state.accountType;
    },
  },
  actions: {
    setUsername(username: string) {
      this.username = username;
    },
    setEmail(email: string) {
      this.email = email;
    },
    setToken(token: string) {
      this.token = token;
    },
    setIsLogged(bool: boolean) {
      this.isLogged = bool;
    },
    logout() {
      this.username = "";
      this.email = "";
      this.token = "";
      this.isLogged = false;
      this.accountType = "";
    },

    setUser(data: any) {
      const user = data.user;
      const account_type =
        user.is_ArrowEmployee === false && user.is_carrier === true
          ? "carrier"
          : "arrow-employee";

      if (account_type === "carrier") {
        const carrier = data.member.carrier_family;
      }
      this.firstName = user.first_name;
      this.lastName = user.last_name;

      this.accountType = account_type;
      this.username = user.username;
      this.email = user.email;
      this.token = data.key ? data.key : data.token;
      this.isLogged = true;
      this.is_activated = user.is_activated;
      this.activated_by = user.activated_by;
    },
  },

  persist: {
    storage: persistedState.cookies,
  },
});

export default pinia;
