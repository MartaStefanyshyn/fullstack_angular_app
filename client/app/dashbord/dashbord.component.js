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
    let token = this.$cookieStore.get('session')
    this.$http({
      method: 'GET',
      url: '/api/things',
      headers: {
        'Authorization': token
      }
    }).then(response => {
      console.log(response.data);
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
