angular.module('app', ['ui.router',
    'app.home',
    'app.login',
    'app.profiles',
    'app.updateProfile',
    'profileFactory',
    'httpFactory',
    'jobPosting.factory',
    'jobPosting.jobPostingPost.controller',
    'jobPosting.jobPostingSearch.controller',
    'jobPosting.jobPostingSpecific.controller'
])

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider
    .state('home', {
      url:'/home',
      views: {
        'mainContent': {
          templateUrl: 'app/home/home.html',
          controller:  'HomeCtrl'
        }
      }
    })
    .state('login', {
      url: '/login',
      views: {
        'mainContent': {
          templateUrl: 'app/login/login.html',
          controller:  'LoginCtrl'
        }
      }
    })
    .state('profiles', {
      url: '/profiles',
      views: {
        'mainContent': {
          templateUrl: 'app/profiles/profiles.html', // plural
          controller:  'ProfilesCtrl'
        }
      }
    })
    .state('profiles.profile', {
      url: '',
      templateUrl: 'app/profiles/profile.html', // singular
      controller:  'ProfileCtrl'
    })
    .state('updateProfile', {
      url: '/updateProfile/:githubName',
      views: {
        'mainContent': {
          templateUrl: 'app/updateProfile/updateProfile.html',
          controller:  'UpdateProfileCtrl'
        }
      }
    })
    .state('jobPostings', {
      views: {
        'mainContent': {
          templateUrl: 'app/jobPostings/jobPosting/jobPostings.html',
        }
      }
    })
      .state('jobPostings.Search', {
      templateUrl: 'app/jobPostings/jobPostingSearch/jobPostingsSearch.html',
      controller : 'jobSearchingCtrl'
    })
    .state('jobPostings.Post', {
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
