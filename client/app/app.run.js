'use strict';

export function runFunction($rootScope, $cookieStore, $state, $http) {
  'ngInject';

  $rootScope.$on('$stateChangeStart', (event, toState) => {
    if (toState.data && !toState.data.noLogin) {
      let token = $cookieStore.get('session');
      $http({
        method: 'GET',
        url: '/api/login',
        headers: {
          'Authorization': token
        }
      }).catch(() => {
        $state.go('main');
      });
    }
  });
}
