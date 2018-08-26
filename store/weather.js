const SET_LOCATION_WEATHLER = 'SET_LOCATION_WEATHLER'
const SET_WEATHLER_CURRENT_USER = 'SET_WEATHLER_CURRENT_USER'
const SET_SEARCH_LOCATION_WEATHER = 'SET_SEARCH_LOCATION_WEATHER'
const DEL_LOCATION_WEATHLER = 'DEL_LOCATION_WEATHLER'

export const state = () => ({
  locations: [],
  weatherCurrentUser: null,
  q: []
})

export const getters = {
  locations: state => state.locations,
  locationsBySlug: state => (slug) => {
    return state.locations.find(location => location.slug === slug)
  },
  qBySlug: state => (slug) => {
    return state.q.find(q => q.slug === slug)
  },
  weatherCurrentUser: state => state.weatherCurrentUser
}

export const actions = {
  setWeatherCurrentUser ({ commit }, payload) {
    commit('SET_WEATHLER_CURRENT_USER', payload)
  }
}

export const mutations = {
  [SET_LOCATION_WEATHLER] (state, payload) {
    state.locations.push(payload)
  },
  [SET_SEARCH_LOCATION_WEATHER] (state, payload) {
    state.q.push(payload)
  },
  [SET_WEATHLER_CURRENT_USER] (state, payload) {
    state.weatherCurrentUser = payload.data
  },
  [DEL_LOCATION_WEATHLER] (state, payload) {
    let item = state.locations.find(location => location.slug === payload)
    state.locations.splice(state.locations.indexOf(item), 1)
  }
}
