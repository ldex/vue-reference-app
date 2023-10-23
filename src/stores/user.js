import { defineStore } from "pinia"
import UserService from "@/services/UserService.js"

export const useUserStore = defineStore("user", {
  state: () => ({
    username: null,
    token: null,
  }),
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
  },
  actions: {
    login(credentials) {
      return UserService.login(credentials).then(data => {
        this.token = data.token
        this.username = credentials.username
        UserService.saveToLocalStorage(this.token, this.username)
      });
    },
    logout() {
        this.token = null
        this.username = null
        UserService.logout()
    },
    checkPreviousLogin() {
      if (UserService.isInLocalStorage()) {
        const user = UserService.getFromLocalStorage()
        this.token = user.auth_token
        this.username = user.username
      }
    },
  },
});
