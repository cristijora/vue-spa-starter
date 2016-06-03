import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  callingAPI: false,
  searching: '',
  serverURI: 'http://localhost:58618',
  user: null,
  token: null,
  ignoreAuthToken:false,
  userInfo: {
    messages: [{1: 'test', 2: 'test'}],
    notifications: [],
    tasks: []
  }
}

const mutations = {
  TOGGLE_LOADING (state) {
    state.callingAPI = !state.callingAPI
  },
  TOGGLE_SEARCHING (state) {
    state.searching = (state.searching === '') ? 'loading' : ''
  },
  SET_USER (state, user) {
    state.user = user
  },
  SET_TOKEN (state, token) {
    state.token = token
  },
  SET_EMULATE_JSON(state, emulateJson){
    Vue.http.options.emulateJSON = emulateJson
  },
  SET_IGNORE_AUTH_TOKEN(state,ignoreAuthToken){
    state.ignoreAuthToken = ignoreAuthToken
  }
}

export default new Vuex.Store({
  state,
  mutations
})
