angular.module('app.login', ['ui.router', 'util.http'])

.controller('loginCtrl', ['$scope', 'HttpRequest', function ($scope, HttpRequest) {
  $scope.login= function (){
    HttpRequest.login()
      .then(
        function (res) {
          console.log('res to login', res); 
        },
        function (err) {
          console.log('there was an error'); 
        }
      )
  }
}])