angular.module('profiles.controller', ['ui.router'])

.controller('ProfilesCtrl', ['$scope', '$http', 'HttpRequest', 'Profile', function ($scope, $http, HttpRequest, Profile) {

  HttpRequest.getProfiles().then(function (res) {
    $scope.profiles = res.data;
  });

  $scope.filter = {};

  $scope.getCategories = function () {
    return ($scope.profiles || []).map(function (prof) {
      return prof.links.blog;
    }).filter(function (prof, idx, arr) {
      return arr.indexOf(prof) === idx;
    });
  };

  $scope.filterByCategory = function (person) {
    return $scope.filter[person.category] || noFilter($scope.filter);
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
