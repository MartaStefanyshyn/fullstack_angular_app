'use strict';

export default function routes($stateProvider) {
  'ngInject';



  $stateProvider.state('dashbord', {
    url: '/dashbord',
    template: '<dashbord></dashbord>',
    data: {
      'noLogin': false
    }
  });
}
