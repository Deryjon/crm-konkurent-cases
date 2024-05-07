import { defineStore } from 'pinia'
export const useSearchClientStore = defineStore('pinia', {
  state: () => ({
    searchField: 'fio',
    searchValue: ''
  }),

  getters: {
    computedSearchValue(state) {
      console.log(state.searchValue);
      return state.searchValue;
    }
  }
});
