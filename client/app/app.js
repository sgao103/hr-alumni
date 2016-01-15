angular.module('myApp', ['ui.router',
    'jobPosting.factory',
    'jobPosting.controller.jobPostingPost',
    'jobPosting.controller.jobPostingSearch',
    'jobPosting.controller.jobPostingSpecific'

])

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider
    .state('home', {
      url:'/home',
      templateUrl: 'app/views/home.html'
    })
    .state('profiles', {
      url: '/profiles',
      templateUrl: 'app/views/profiles.html'

    })
    // .state('createProfile', {
    //   url: '/createProfile',
    //   templateUrl: 'app/views/createProfile.html'
    // })
    .state('login', {
      url: '/login',
      templateUrl: 'app/views/login.html'
    })
    .state('profiles.profile', {
      url: '',
      templateUrl: 'app/views/profile.html'
    })
    .state('updateProfile', {
      url: '/updateProfile/:githubName',
      templateUrl: 'app/views/updateProfile.html'
    })
  .state('jobPostings', {
      //url: '/jobPostings',
      //abstract : true,
      templateUrl: 'app/jobPostings/jobPosting/jobPostings.html'
      //controller : 'jobPostingCtrl'
  })
  .state('jobPostings.Search', {
      //url: '/jobPostings',
      templateUrl: 'app/jobPostings/jobPostingSearch/jobPostingsSearch.html',
      controller : 'jobSearchingCtrl'
  })
  .state('jobPostings.Post', {
      //url: '/jobPostings',
      templateUrl: 'app/jobPostings/jobPostingPost/jobPostingsPost.html',
      controller : 'jobPostingCtrl',

  })
  .state('jobPostings.SpecificJob',{
    params : {
       jobTitle : null,
       description : null,
       company : null,
       experience : null,
       companyLinkedIn : null
    },
     templateUrl: 'app/jobPostings/jobPostingSpecific/jobPostingsSpecific.html',
     controller : 'specificJobCtrl',
     parent: 'jobPostings',

  })
}])

.controller('homeCtrl', ['$scope','$state', function ($scope, $state) {

  $state.transitionTo('profiles.profile');

}])

.controller('profileCtrl', ['$scope', 'Profile', function ($scope, Profile) {
  console.log('controller gets called');
  // $scope.currentProfile= Profile.getProfile();
  console.log('currentProfile where it counts', $scope.currentProfile);
}])

.controller('profilesCtrl', ['$scope', '$http', 'HttpRequest', 'Profile', function ($scope, $http, HttpRequest, Profile) {

  HttpRequest.getProfiles()
    .then(function (res) {
      $scope.profiles= res.data;
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

// .controller('createProfileCtrl', ['$scope', 'HttpRequest', function ($scope, HttpRequest){
//   $scope.submitProfile = function (isValid, formData) {
//     console.log(formData);
//     console.log('First isValid: ', isValid);
//     // HttpRequest.submitProfile(isValid, formData);
//   }
// }])

.controller('updateProfileCtrl', ['$scope', '$stateParams','HttpRequest', function ($scope, $stateParams, HttpRequest){
  console.log('$stateParams are: ', $stateParams);
  // redirects to /updateProfile/:githubName
  // $scope.submitProfile = function (isValid, formData) {
  //       console.log('formData', formData);
  //       console.log('First isValid: ', isValid);
  //       // HttpRequest.submitProfile(isValid, formData);
  // }

  $scope.submitProfile = function (isValid, formData) {

        console.log('formData', $scope.data);
        // console.log('First isValid: ', isValid);
        HttpRequest.submitProfile(isValid, formData);
  }

  //prepopulation of data
  HttpRequest.getProfile($stateParams.githubName)
    .then(function (res) {
      $scope.data= res.data;
      console.log('profile data: ', res.data[0]);
      console.log('contact data: ', res.data[0].contact);
      // $scope.setProfile= function (profile) {
      //   console.log('set profile called');
      //   $scope.currentProfile= Profile.setProfile(profile);
      //   console.log('currentProfile', $scope.currentProfile);
      // }


    })

}])

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


//.controller('jobPostingCtrl',['$scope','$http','jobPostingFactory',function($scope,$http,jobPostingFactory){
//
//    $scope.data ={
//        jobTitle : '',
//        description : '',
//        company : '',
//        experience : '',
//        companyLinkedIn : ''
//    }
//
//    $scope.jobPostingSubmit = function(){
//
//        jobPostingFactory.postJob($scope.data).then(function(data){
//            console.log(data)
//        })
//    }
//
//}])

//.controller('jobSearchingCtrl',['$scope','$http','jobPostingFactory','$state',function($scope,$http,jobPostingFactory,$state){
//
//    $scope.data ={
//        jobTitle : '',
//        company : '',
//    };
//
//    $scope.relevantJobPostings = ''
//
//    $scope.$watch('[data.jobTitle,data.company]',function(){
//        if($scope.data.jobTitle !== '' || $scope.data.company !== ''){
//            jobPostingFactory.getJob($scope.data).then(function(data){
//                console.log(data)
//                $scope.relevantJobPostings = data
//            });
//        }
//
//    })
//
//    $scope.goToJob = function(job){
//        console.log('go job',job)
//        $state.go('jobPostings.SpecificJob',job);
//
//    }
//
//}])

//.controller('specificJobCtrl',['$scope','$http','jobPostingFactory','$stateParams',function($scope,$http,jobPostingFactory,$stateParams){
//
//    $scope.data = {
//        specificJob : {
//            jobTitle : $stateParams.jobTitle,
//            description : $stateParams.description,
//            company : $stateParams.company,
//            experience : $stateParams.experience,
//            companyLinkedIn : $stateParams.companyLinkedIn
//        }
//    }
//
//    console.log('specfic',$scope.data)
//
//}])


//.factory('jobPostingFactory',function($http){
//
//    var apiUrl = 'http://localhost:3000';
//
//    var postJob = function(jobPosting){
//
//        return $http.post(apiUrl + '/api/jobPostings', jobPosting)
//            .then(function(res) {
//                return res.data;
//            }, function(err) {
//                return err;
//            });
//
//    };
//
//    var getJob = function(jobSearch){
//
//        return $http.get(apiUrl + '/api/jobPostings', {
//            params : {
//                jobTitle : jobSearch.jobTitle,
//                company : jobSearch.company
//            }
//        })
//            .then(function(res) {
//                return res.data;
//            }, function(err) {
//                return err;
//            });
//
//    };
//
//    var specificJob = function(jobID){
//        return $http.get(apiUrl + '/api/jobPostings/' + jobID)
//            .then(function(res) {
//                return res.data;
//            }, function(err) {
//                return err;
//            });
//    }
//
//
//    return{
//        postJob : postJob,
//        getJob : getJob,
//        specificJob : specificJob
//    }
//
//})


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
