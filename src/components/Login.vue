<template>
  <div class="container container-table">
    <div class="row vertical-10p">
      <div class="container">
        <img src="/static/img/logo.png" class="center-block logo">
        <div class="text-center col-md-4 col-sm-offset-4">
          <!-- errors -->
          <div v-if=response class="text-red"><p>{{response | capitalize }}</p></div>

          <!-- login form -->
          <form class="ui form loginForm" @submit.prevent="checkCreds">

            <div class="input-group">
              <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
              <input class="form-control" name="username" placeholder="Username" type="text" v-model="username">
            </div>

            <div class="input-group">
              <span class="input-group-addon"><i class="fa fa-lock"></i></span>
              <input class="form-control" name="password" placeholder="Password" type="password" v-model="password">
            </div>
            <button type="submit" class="btn btn-primary btn-lg" :class="loading">Login</button>
          </form>
          <div class="m-t-20">
            <a v-link="'signup'" class="btn btn-primary btn-lg">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .m-t-20{
    margin-top:20px;
  }
  a.btn, button.btn{
    width:100px;
  }
  html, body, .container-table {
    height: 100%;
    background-color: #282B30 !important;
  }

  .container-table {
    display: table;
    color: white;
  }

  .vertical-center-row {
    display: table-cell;
    vertical-align: middle;
  }

  .vertical-20p {
    padding-top: 20%;
  }

  .vertical-10p {
    padding-top: 10%;
  }

  .logo {
    width: 15em;
    padding: 3em;
  }

  .loginForm .input-group {
    padding-bottom: 1em;
    height: 4em;
  }

  .input-group input {
    height: 4em;
  }
</style>
<script>
  module.exports = {
    name: 'Login',
    data: function (router) {
      return {
        section: 'Login',
        loading: '',
        username: '',
        password: '',
        response: ''
      }
    },
    methods: {
      checkCreds: function () {
        var self = this
        var store = this.$store
        var baseUrl = store.state.serverURI
        this.toggleLoading()
        this.resetResponse()
        store.dispatch('TOGGLE_LOADING')
        store.dispatch('SET_EMULATE_JSON', true)
        //  Login api call
        this.$parent.callAPI('POST', baseUrl + '/oauth/Token', {
          grant_type: 'password',
          username: this.username,
          password: this.password
        }).then(function (response) {

          store.dispatch('TOGGLE_LOADING')
          self.handleLoginResponse(response)

        }, function (response) {
          self.handleLoginError(response)
        })
        store.dispatch('SET_EMULATE_JSON', false)
      },
      handleLoginResponse(response){
        var store=this.$store
        if (response.data) {
          var data = response.data
          //  success. Check if token is returned
          if (data.access_token) {
            store.dispatch('SET_USER', data.userName)
            var token = 'Bearer ' + data.access_token
            store.dispatch('SET_TOKEN', token)

            this.saveUserToLocalStorage(data.userName, token)
            if (data.redirect) {
              this.$router.go(data.redirect)
            } else {
              this.$router.go('/')
            }
          }
        }
        else {
          this.response = 'Did not receive a response. Please try again in a few minutes'
        }
        this.toggleLoading()
      },
      handleLoginError(response){
        // error
        var store=this.$store
        store.dispatch('TOGGLE_LOADING')
        this.response = 'Server appears to be offline'
        if (response.data && response.data.error) {
          this.response = response.data.error_description
        }
        this.toggleLoading()
      },
      saveUserToLocalStorage(user, token){
        // Save to local storage as well
        if (window.localStorage) {
          window.localStorage.setItem('user', JSON.stringify(user))
          window.localStorage.setItem('token', token)
        }
      },
      redirectToSignUp(){
        this.$router.go('/signup')
      },
      toggleLoading() {
        this.loading = (this.loading === '') ? 'loading' : ''
      },
      resetResponse() {
        this.response = ''
      }
    }
  }
</script>

