angular.module('app', ['ui.router',
    'app.home',
    'app.login',
    'util.http',
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
      views: {
        'mainContent': {
          templateUrl: 'app/home/home.html',
          controller:  'homeCtrl'
        }
      }
    })
    .state('login', {
      url: '/login',
      views: {
        'mainContent': {
          templateUrl: 'app/login/login.html',
          controller:  'homeCtrl'
        }
      }
    })
    .state('profiles', {
      url: '/profiles',
      templateUrl: 'app/views/profiles.html'
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
      templateUrl: 'app/jobPostings/jobPosting/jobPostings.html'
    })
    .state('jobPostings.Search', {
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
