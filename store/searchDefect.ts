import { defineStore } from 'pinia'
export const useSearchDefectStore = defineStore('pinia', {
  state: () => ({
    searchField: 'fio',
    searchValue: ''
  }),

  getters: {
    computedSearchValue(state) {
      return state.searchValue;
    }
  }
});
