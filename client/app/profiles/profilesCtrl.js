angular.module('app.profiles', ['ui.router'])

.controller('profileCtrl', ['$scope', 'Profile', function ($scope, Profile) {
  console.log('controller gets called'); 
  // $scope.currentProfile= Profile.getProfile(); 
  console.log('currentProfile where it counts', $scope.currentProfile); 
}])

.controller('profilesCtrl', ['$scope', '$http', 'HttpRequest', 'Profile', function ($scope, $http, HttpRequest, Profile) {

  HttpRequest.getProfiles()
    .then(function (res) {

      // STUBBED THIS OUT FOR TESTING PURPOSES
      // $scope.profiles= res.data;
      $scope.profiles = fakeData;

      $scope.setProfile= function (profile) {
        console.log('set profile called'); 
        $scope.currentProfile= Profile.setProfile(profile); 
        console.log('currentProfile', $scope.currentProfile); 
      }
    });

    // used for showing the modal in profiles.html
    $scope.modalDetails = function(profile){
        console.log(profile);
        $scope.profile = profile;
        $('#modalDetails').openModal();
    };

}])
