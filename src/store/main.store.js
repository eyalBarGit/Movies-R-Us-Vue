import mediaService from '../service/media.service'

const state = {
    movies: {
        moviesList: null,
        resultCount: null
    },
    games: {
        gamesList: null,
        resultCount: null
    },
    series: {
        seriesList: null,
        resultCount: null
    },
    isResultList: true,
    isNoteRecieved: false,
    detailedItem: {},
    paginatedPage: {},
    visitedPages: [],
    sortedChartData: { data: [] }
}
const actions = {
    async query({ commit }, title) {
        try {
            const media = await mediaService.query(title)
            const movies = media[0]
            const games = media[1]
            const series = media[2]

            commit('setMovies', movies)
            commit('setGames', games)
            commit('setSeries', series)
        } catch (err) {
            throw err
        }
    },
    async paginatePage({ commit }, currPage) {
        try {
            const media = await mediaService.getPageToDisplay(currPage)
            commit('setPaginatedPage', media)
        } catch (err) {
            throw err
        }
    },
    async getItem({ commit }, itemId) {
        try {
            const detailedItem = await mediaService.getItemById(itemId)
            commit('setDetailedItem', detailedItem)
        } catch (err) {
            throw err
        }
    },
    closeResultList({ commit }) {
        commit('onCloseResultList')
    },
    openResultList({ commit }) {
        commit('onOpenResultList')
    },
    clearList({ commit }) {
        commit('setMovies', {
            moviesList: null,
            resultCount: null
        })
        commit('setGames', {
            moviesList: null,
            resultCount: null
        })
        commit('setSeries', {
            moviesList: null,
            resultCount: null
        })
    },
    clearDetailedItem({ commit }) {
        commit('onClearDetailedItem')
    },
    sendNote({ commit }, note) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
                console.log('Recieved Note:', note)
                commit('setNoteResponse')
            }, 1000);
        })
    },
    addVisitedPage({ commit }, page) {
        commit('addToVisitedPages', page)
    },
    removeVisitedPage({ commit },) {
        commit('removeVisitedPage')
    },

    async addToChartItems({ commit }, mediaId) {
        const detailedItem = await mediaService.getItemById(mediaId)
        commit('setDetailedItem', detailedItem)
    },
    async sortByYear({ commit }, content) {
        const sortedList = await mediaService.sortList(content)
        commit('setSortedList', sortedList)
    }
}

const mutations = {
    setMovies(state, movies) {
        state.movies.moviesList = movies.Search
        state.movies.resultCount = movies.totalResults
    },
    setGames(state, games) {
        state.games.gamesList = games.Search
        state.games.resultCount = games.totalResults
    },
    setSeries(state, series) {
        state.series.seriesList = series.Search
        state.series.resultCount = series.totalResults
    },
    onCloseResultList(state) {
        state.isResultList = false
    },
    onOpenResultList(state) {
        state.isResultList = true
    },
    setNoteResponse(state) {
        state.isNoteRecieved = true
        setTimeout(() => {
            state.isNoteRecieved = false
        }, 1000);
    },
    setDetailedItem(state, detailedItem) {
        state.detailedItem = detailedItem
    },
    setPaginatedPage(state, currPage) {
        state.paginatedPage = currPage
    },
    addToVisitedPages(state, page) {
        state.visitedPages.push(page)
    },
    removeVisitedPage(state) {
        state.visitedPages.pop()
    },
    setSortedList(state, sortedList) {
        state.sortedChartData.data = sortedList
    },
    onClearDetailedItem(state) {
        state.detailedItem = {}
    }
}


const getters = {
    getMovies(state) {
        return state.movies
    },
    getGames(state) {
        return state.games
    },
    getSeries(state) {
        return state.series
    },
    getIsResultOpen(state) {
        return state.isResultList
    },
    getNoteResponse(state) {
        return state.isNoteRecieved
    },
    getDetailedItem(state) {
        return state.detailedItem
    },
    getPaginatedPage(state) {
        return state.paginatedPage
    },
    getVisitedPages(state) {
        return state.visitedPages
    },
    getSortedChart(state) {
        return state.sortedChartData.data.sort((a, b) => { return parseInt(a.Year) - parseInt(b.Year) })
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}