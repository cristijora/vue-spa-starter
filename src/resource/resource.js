import Vue from 'vue'
import Resource from 'vue-resource'

function authorizationInterceptor(){
  Vue.use(Resource)
  Vue.http.interceptors.push({
    request: function (request) {
      /*
       Enable this when you have a backend that you authenticate against */
      var headers = request.headers

      if (window.location.pathname !== '/login' && !headers.hasOwnProperty('Authorization')) {
        if(!this.$store.state.ignoreAuthToken){
          headers.Authorization = this.$store.state.token
        }
      }

      // console.log(headers)
      return request
    },
    response: function (response) {
      return response
    }
  })
}

function requestConfigs(){
  // Start out app!
  Vue.config.debug = true
  Vue.http.headers.common = {}
  Vue.http.headers.post = {}
  Vue.http.headers.put = {}
}

export function initializeVueResource(){
  authorizationInterceptor();
  requestConfigs();
}
