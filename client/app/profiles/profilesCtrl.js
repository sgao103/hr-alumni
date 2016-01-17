angular.module('profiles.controller', ['ui.router'])

.controller('ProfilesCtrl', ['$scope', '$http', 'HttpRequest', 'Profile', function ($scope, $http, HttpRequest, Profile) {

  HttpRequest.getProfiles().then(function (res) {
    $scope.profiles = res.data;
  });

  $scope.hireable = {};

  $scope.hireableFilter = function () {
    if (this.hireable.checked) {
      console.log('box is checked');
      console.log(this.profiles.filter(function(eachProfile){
        return eachProfile.about.status && eachProfile.about.status !== '';
      }), 'all profiles? this.profile.about.status');
      console.log(this.profiles.filter(function(eachProfile){
        return eachProfile.links.blog && eachProfile.links.blog !== '';
      }), 'filter for blog first');
      return this.profiles.filter(function(eachProfile){
        return eachProfile.about.status && eachProfile.about.status !== '';
      });
    }
    else {
      console.log('box is empty');
      console.log(this.profiles[0].about.status, 'this.profiles.about.status');
    }
  };

  // | filter:hireableFilter <tr ng-repeat="player in players | filter:{id: player_id, name:player_name} | filter:ageFilter">

  $scope.ageFilter = function (player) {
      return (player.age > $scope.min_age && player.age < $scope.max_age);
  }

  // used for showing the modal in profiles.html
  $scope.modalDetails = function(profile){
    $scope.profile = profile;
    $('#modalDetails').openModal();
  };

}]);
