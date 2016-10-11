import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {

  awesomeThings = [];

  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
  }

  checkAuth() {
    this.$http({
      method: 'GET',
      url: '/api/things',
      header: {
        'auth': this.token
      }
    }).then(response => {
        this.awesomeThings = response.data;
      });

  }
  createUser() {
    this.$http.post('/api/things', {   'name':'igor',
      'password':'123',
      'token':'',
      'date':''

    })
      .then(response => {
      this.awesomeThings = response.data;
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
