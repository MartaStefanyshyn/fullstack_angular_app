import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './dashbord.routes';

export class DashbordController {

  /*@ngInject*/
  constructor($http, $state, $cookieStore) {
    this.$http = $http;
    this.$state = $state;
    this.$cookieStore = $cookieStore;
  }

  checkAuth() {
    let token = this.$cookieStore.get('session');
    this.$http({
      method: 'GET',
      url: '/api/login',
      headers: {
        'Authorization': token
      }
    }).then(() => {
      alert("You are logged in");
    }).catch((resp) => {
      this.$cookieStore.remove('session');
      this.$state.go('main');
    });

  }
}

export default angular.module('angularFullstackApp.dashbord', [uiRouter])
  .config(routing)
  .component('dashbord', {
    template: require('./dashbord.html'),
    controller: DashbordController
  })
  .name;
