angular.module('profiles.controller', ['ui.router'])

.controller('ProfilesCtrl', ['$scope', '$http', 'HttpRequest', 'Profile', function ($scope, $http, HttpRequest, Profile) {

  HttpRequest.getProfiles().then(function (res) {
    $scope.profiles = res.data;
    $scope.categories = $scope.getCategories();
  });

  $scope.filter = {};

  $scope.categories = [];

  $scope.getCategories = function () {
    // want the keys of the profile object
    var categories = [];
    var example = $scope.profiles[0] || {};
    for (var key in example) {
      if (key && example.hasOwnProperty(key) && typeof example[key] === 'object') {
        for (var subKey in example[key]) {
          categories.push(subKey);
        }
      }
    }
    return categories;
  };

  $scope.filterByCategory = function (person) {
    for (var key in person) {
      if (key && person.hasOwnProperty(key) && typeof person[key] === 'object') {
        for (var subKey in person[key]) {
          if ($scope.filter[subKey]) {
            // box is checked and value of object at that property is not null or ''
            if (!person[key][subKey]) {
              return false;
            }
          }
        }
      }
    }

    return true;
  };

  // $scope.filterByCategory = function (profile) {
  //   // Display the person if the person's hireable checkbox is checked, or if there are no active filters
  //   return $scope.filter[profile.links.blog] || noFilter($scope.filter);
  // };
  // where noFilter is a function that checks if there is any filter activated (and returns true if there is none):

  function noFilter(filterObj) {
    for (var key in filterObj) {
      if (filterObj[key]) {
        // There is at least one checkbox checked
        return false;
      }
    }
    return true;
  }

  // used for showing the modal in profiles.html
  $scope.modalDetails = function(profile){
    $scope.profile = profile;
    $('#modalDetails').openModal();
  };

}]);
