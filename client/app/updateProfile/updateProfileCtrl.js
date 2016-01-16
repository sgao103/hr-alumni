angular.module('app.updateProfile', ['ui.router'])

.controller('updateProfileCtrl', ['$scope', '$stateParams','HttpRequest', function ($scope, $stateParams, HttpRequest){
  console.log('$stateParams are: ', $stateParams); 
  // redirects to /updateProfile/:githubName
  // $scope.submitProfile = function (isValid, formData) {
  //       console.log('formData', formData);
  //       console.log('First isValid: ', isValid);
  //       // HttpRequest.submitProfile(isValid, formData);
  // }

  $scope.submitProfile = function (isValid, formData) {
    HttpRequest.submitProfile(isValid, formData);
  }

  //prepopulation of data
  HttpRequest.getProfile($stateParams.githubName)
    .then(function (res) {
      $scope.data = res.data;
    })
}])

.factory('Profile', function (){
  var storedProfile; 
  var setProfile= function (profile) {
    console.log('profile set'); 
    storedProfile= profile;
    return storedProfile;  
  }
  var getProfile= function (){
    console.log('get profile'); 
    return storedProfile; 
  }
  return {
    setProfile: setProfile,
    getProfile: getProfile
  }

})
