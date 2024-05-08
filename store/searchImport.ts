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
    // Метод мутации для установки fromDate
    setFromDate(newFromDate) {
      this.fromDate = newFromDate;
    },
    
    // Метод мутации для установки toDate
    setToDate(newToDate) {
      this.toDate = newToDate;
    }
  }
});
