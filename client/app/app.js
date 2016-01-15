angular.module('app', ['ui.router',
    'app.home',
    'app.login',
    'app.profiles',
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
          controller:  'loginCtrl'
        }
      }
    })
    .state('profiles', {
      url: '/profiles',
      views: {
        'mainContent': {
          templateUrl: 'app/profiles/profiles.html', // plural
          controller:  'profilesCtrl'
        }
      }
    })
    .state('profiles.profile', {
      url: '',
      templateUrl: 'app/profiles/profile.html', // singular
      controller:  'profileCtrl'
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
