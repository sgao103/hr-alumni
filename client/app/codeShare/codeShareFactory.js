angular.module('codeShare.factory', [])


.factory('CodeShare', function($http) {

  var apiUrl = 'http://localhost:3000';

  var postCode = function(codeShare) {
    return $http.post(apiUrl + '/api/codeShare', codeShare)
      .then(function(res) {
        return res.data;
      }, function(err) {
        return err;
      });
  };

  var getCode = function() {
    return $http.get(apiUrl + '/api/codeShare', {
        params: {
          // jobTitle: jobSearch.jobTitle,
          // company: jobSearch.company
        }
      })
      .then(function(res) {
        return res.data;
      }, function(err) {
        return err;
      });
  };

  var upvote = function(codeID, userID) {
    var data = {codeID: codeID, userID: userID};
    return $http.post(apiUrl + '/api/codeShare/upvote', data)
      .then(function(res) {
        return res.data;
      }, function(err) {
        return err;
      });
  };

  return {
    postCode: postCode,
    getCode : getCode,
    upvote  : upvote
  };

})
