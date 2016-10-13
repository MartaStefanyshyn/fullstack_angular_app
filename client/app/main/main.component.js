import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {

  awesomeThings = [];
  token = '';

  /*@ngInject*/
  constructor($http, $state, $cookieStore) {
    this.$http = $http;
    this.$state = $state;
    this.$cookieStore = $cookieStore;
    this.credentials = {
        name: '',
        password: '',
        token: '',
        date: ''
    }
  }

  checkAuth() {
    console.log(this.token)
    this.$http({
      method: 'GET',
      url: '/api/things',
      headers: {
        'Authorization': this.token
      }
    }).then(response => {
        this.awesomeThings = response.data;
      });

  }
  createUser(credentials) {
    this.$http.post('/api/things', credentials)
      .then(response => {
      this.token = response.data;
      this.$cookieStore.put('session', response.data);
      this.awesomeThings = response.data;
      this.$state.go('dashbord');
  });
  }
}

export default angular.module('angularFullstackApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
