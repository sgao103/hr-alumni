angular.module('userFactory', ['ui.router'])

.factory('User', function($http, $state) {

  var details = {
    name: window.localStorage.getItem('hr-alum.user.name') || 'Anonymous',
    loggedIn: false
  };

  var apiUrl = 'http://teslalegacy.herokuapp.com';

  var loggedIn = function() {
    return details.loggedIn;
  };

  var login = function(userID) {
    return $http.post( '/api/users/login', {_id: userID})
                .then(function(response){
                  if (response.data._id !== undefined) {
                    details.loggedIn = true;
                    details.name = response.data.name;
                    window.localStorage.setItem('hr-alum.user.id', response.data._id);
                    window.localStorage.setItem('hr-alum.user.name', response.data.name);
                  }
                });
  };

  var logout = function() {
    details.loggedIn = false;
    window.localStorage.removeItem('hr-alum.user.id');
    window.localStorage.removeItem('hr-alum.user.name');
    $state.go('app.login');
  };

  return {
    loggedIn: loggedIn,
    details: details,
    login: login,
    logout: logout
  };

});
