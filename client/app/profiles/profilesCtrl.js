angular.module('profiles.controller', ['ui.router'])

.controller('ProfilesCtrl', ['$scope', '$http', 'HttpRequest', 'Profile', function ($scope, $http, HttpRequest, Profile) {

  HttpRequest.getProfiles().then(function (res) {
    $scope.profiles = res.data;
  });

  $scope.hireable = {};
    console.log(this.hireable, 'before anything');  // logs undefined "before anything"

    // OMG checked toggles!
  $scope.hireableFilter = function () {
    console.log(this.hireable, 'before function');  // logs Object {checked: true} "before function"
    this.hireable.value = true;
    if (this.hireable.checked) {
      console.log('box is checked');
    }
    else {
      console.log('box is empty');
    }
    console.log(this.hireable, 'after function');  // logs Object {checked: true, value: true} "after function"
    console.log($scope.hireable.checked.$modelValue);  // undefined
  };

  $scope.myVar = 1;

  $scope.$watch('hireable', function() {
      alert('hey, myVar has changed!');
  });

  $scope.buttonClicked = function() {
     $scope.myVar = 2; // This will trigger $watch expression to kick in
  };

  // used for showing the modal in profiles.html
  $scope.modalDetails = function(profile){
    $scope.profile = profile;
    $('#modalDetails').openModal();
  };

}]);
