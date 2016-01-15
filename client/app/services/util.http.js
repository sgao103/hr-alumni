angular.module('util.http', ['ui.router'])

.factory('HttpRequest', ['$http', '$q', function ($http, $q){
  var deferred= $q.defer();
  var submitProfile = function (isValid, data) {
      console.log('Second isValid: ', isValid);
    if (isValid) {
        console.log('data does it get here>=? ', data);
        return $http({
            method: 'POST',
            url: '/api/updateProfile',
            data: data
        })
    } else {

    }
  };

  var getProfiles= function () {
    return $http({
      method: 'GET',
      url: '/api/profiles'
    }).success(function(result){
      // deferred.resolve(result); 
      deferred.resolve(result); 
    }).error(function (result){
      deferred.reject(result);
    })
  }

  var getProfile= function (githubName){
    return $http({
      method: 'GET',
      url: '/api/profile/'+githubName
    }).success(function(result){
      deferred.resolve(result);
    }).error(function (result){
      deferred.reject(result);
    })
  }

  return {
    submitProfile: submitProfile,
    getProfiles: getProfiles,
    getProfile: getProfile
  }
}])