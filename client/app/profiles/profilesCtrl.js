angular.module('app.profiles', ['ui.router'])

.controller('ProfilesCtrl', ['$scope', '$http', 'HttpRequest', 'Profile', function ($scope, $http, HttpRequest, Profile) {

  HttpRequest.getProfiles()
    .then(function (res) {
      $scope.profiles = res.data;
      $scope.setProfile= function (profile) {
        $scope.currentProfile = Profile.setProfile(profile); 
      }
    });

    // used for showing the modal in profiles.html
    $scope.modalDetails = function(profile){
        $scope.profile = profile;
        $('#modalDetails').openModal();
    };

}])
