import { base_url } from "~/api";
interface IAuthStore {
  login: string;
  password: string;
  status: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): IAuthStore => ({
    login: '',
    password: '',
    status: false,
  }),
  getters: {
    isAuth: (state) => !!state.status,
  },
  actions: {
    async loginUser() {
      const { data } = await useFetch<{ token: string }, unknown>(
        base_url + '/login',
        {
          method: 'POST',
          body: JSON.stringify({ login: this.login, password: this.password }),
        }
      );
      const token = data.value.token;
      if (token) {
        
          localStorage.setItem('token', data.value.token);
        this.status = true;
      }
    },
  },
});
