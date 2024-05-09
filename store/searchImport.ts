export const useImport = defineStore('pinia', {
  state: () => ({
    fromDate: ' ',
    toDate: ''
  }),

  getters: {
    computedSearchValue(state) {
      if (state.fromDate === undefined) {
        return ''
      } else {
        return state.fromDate
      }
    }
  },

  actions: {
    setFromDate(newFromDate) {
      this.fromDate = newFromDate;
    },
    setToDate(newToDate) {
      this.toDate = newToDate;
    }
  }
});
