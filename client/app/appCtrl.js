angular.module('app.controller', [])

.controller('AppCtrl', function($scope, $state, User) {

  $scope.notLoggedIn = function() {
    return !User.isloggedIn()
  };

  // $scope.logOut = function() {
  //   User.signOut();
  // };

  // $scope.login = function() {
  //   $state.go('app.login');
  // };

  // $scope.signUp = function() {
  //   $state.go('app.signUp');
  // };
  
})
