import graphService from '../service/graph.service'

const state = {
    currChartItem: {},
    sortedChartData: { data: [] }
}
const actions = {
    async sortByYear({ commit }, content) {
        const sortedList = await graphService.sortList(content)
        commit('setSortedList', sortedList)
    },
    async createChartItem({ commit }, item) {
        const lineChartItem = await graphService.createLineChartItem(item)
        commit('setLineChartItem', lineChartItem)
    }
}
const mutations = {
    setLineChartItem(state, item) {
        state.currChartItem = item
    },
    setSortedList(state, sortedList) {
        state.sortedChartData.data = sortedList
    },
}
const getters = {
    getCurrChartItem(state) {
        return state.currChartItem
    },
    getSortedChart(state) {
        return state.sortedChartData.data.sort((a, b) => { return parseInt(a.Year) - parseInt(b.Year) })
    }
}

export default {
    namespaced: true,
    actions,
    state,
    mutations,
    getters
}