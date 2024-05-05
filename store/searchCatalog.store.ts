import { defineStore } from 'pinia'

export const useSearchStore = defineStore('pinia', {
  state: () => ({
    searchField: ' ',
    searchValue: ''
  }),

  getters: {
    computedSearchValue(state) {
      if (state.searchValue === undefined) {
        return ''
      } else {
        return state.searchValue
      }
    }
  }
});

