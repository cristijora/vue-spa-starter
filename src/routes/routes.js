import Router from 'vue-router'
import Vue from 'vue'
import AppView from './../components/App.vue'
import SignUpView from './../components/Signup.vue'
import LoginView from './../components/Login.vue'
import NotFoundView from './../components/404.vue'
Vue.use(Router)
// Routing logic
var router = new Router({
  history: true,
  saveScrollPosition: true
})

function initializeRoutes(){
  // Routes
  router.map({
    '/login': {
      component: LoginView
    },
    '/signup': {
      component: SignUpView
    },
    '/': {
      component: function(resolve) {
        require(['./../components/Dash.vue'], resolve);
      },
      auth: true,
      subRoutes: {
        '': {
          component: function(resolve) {
            require(['./../components/dash/Dashboard.vue'], resolve);
          },
          name: 'Dashboard',
          description: 'Overview of environment'
        },

        '/setting': {
          component: function(resolve) {
            require(['./../components/dash/Setting.vue'], resolve);
          },
          name: 'Settings',
          description: 'User settings page'
        }
      }
    },
    // not found handler
    '*': {
      component: NotFoundView
    }
  })
  // Redirect for shortcuts
  router.redirect({
    '/jobs': '/user/jobs',
    '/me': '/user'
  })

}

function initializeTokenVerification(){
  // Some middleware to help us ensure the user is authenticated.
  router.beforeEach(function (transition) {
    // window.console.log('Transition', transition)
    var token = transition.to.router.app.$store.state.token
    var isInvalidToken = token === null || token === 'null'
    if (transition.to.auth && isInvalidToken) {
      window.console.log('Not authenticated')
      transition.redirect('/login')
    } else {
      transition.next()
    }
  })
}


export function initializeRouter(){
  initializeRoutes();
  initializeTokenVerification();
  router.start(AppView, '#root')
}


