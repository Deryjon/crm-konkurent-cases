import { base_url } from "~/api";
interface IAuthStore {
  login: string;
  password: string;
  status: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): IAuthStore & { errorText: string } => ({
    login: "",
    password: "",
    status: false,
    errorText: "",
  }),
  getters: {
    isAuth: (state) => !!state.status,
  },
  actions: {
    async loginUser() {
      const { data, status } = await useFetch<{ token: string }, unknown>(
        base_url + "/login",
        {
          method: "POST",
          body: JSON.stringify({ login: this.login, password: this.password }),
        }
      );
      if (status.value === "success") {
        const decodedToken = JSON.parse(atob(data.value.token.split(".")[1]));
        console.log(decodedToken);
        localStorage.setItem("token", data.value.token);
        localStorage.setItem("role", decodedToken.role);
        localStorage.setItem("user_id", decodedToken.user_id);
        this.status = true;
      } else {
        this.errorText = "Неверный логин или пароль";
      }
    },
  },
});

