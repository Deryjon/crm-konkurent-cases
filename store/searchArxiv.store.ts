import { defineStore } from 'pinia'
export const useSearchArxivStore = defineStore('pinia', {
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
