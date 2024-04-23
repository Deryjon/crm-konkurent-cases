import { base_url } from "~/api";
interface IAuthStore {
  login: string;
  password: string;
  status: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): IAuthStore & { errorText: string } => ({
    login: '',
    password: '',
    status: false,
    errorText: '',
  }),
  getters: {
    isAuth: (state) => !!state.status,
  },
  actions: {
    async loginUser() {
      const { data, status } = await useFetch<{ token: string }, unknown>(
        base_url + '/login',
        {
          method: 'POST',
          body: JSON.stringify({ login: this.login, password: this.password }),
        }
      );
console.log(status.value);

      if (status.value === "success") {
        localStorage.setItem('token', data.value.token);
        this.status = true;
      } else {
            this.errorText = 'Неверный логин или пароль';
        }
        console.log(this.errorText);
      }

  },
});
