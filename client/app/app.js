angular.module('app', ['ui.router',
    'app.home',
    'app.login',
    'app.profiles',
    'app.updateProfile',
    'jobPosting.factory',
<<<<<<< HEAD
    'jobPosting.jobPostingPost.controller',
    'jobPosting.jobPostingSearch.controller',
    'jobPosting.jobPostingSpecific.controller'
=======
    'jobPosting.controller.jobPostingPost',
    'jobPosting.controller.jobPostingSearch',
    'jobPosting.controller.jobPostingSpecific',
    'userFactory',
    'profileFactory',
    'httpFactory'
>>>>>>> Refactor states to use nested views
])

.run(function($rootScope, User, $state) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    if (!User.isloggedIn() && toState.name !== 'app.login' && toState.name !== 'app.home') {
      event.preventDefault();
      // window.localStorage.setItem('userToken', ____ )
      $state.go('app.login');
    }
  })
})

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider

    .state('app', {
      url: '/',
      views: {
        'mainContent': {
          templateUrl: 'app/home/home.html',
          controller:  'HomeCtrl'
        },
        'header' :{
          templateUrl: 'app/_partials/nav.html',
        }
      }
    })
    .state('app.home', {
      url:'home',
      views: {
        'mainContent@': {
          templateUrl: 'app/home/home.html',
          controller:  'HomeCtrl'
        }
      }
    })
    .state('app.login', {
      url: 'login',
      views: {
        'mainContent@': {
          templateUrl: 'app/login/login.html',
          controller:  'LoginCtrl'
        }
      }
    })
    .state('app.profiles', {
      url: 'profiles',
      views: {
        'mainContent@': {
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
<<<<<<< HEAD
    })
    .state('jobPostings', {
=======
    })    
    .state('app.jobPostings', {
>>>>>>> Refactor states to use nested views
      views: {
        'mainContent@': {
          templateUrl: 'app/jobPostings/jobPosting/jobPostings.html',
        }
      }
    })
    .state('jobPostings.Search', {
      views : {
        'jobPostings@jobPostings' : {
          templateUrl: 'app/jobPostings/jobPostingSearch/jobPostingsSearch.html',
          controller : 'jobSearchingCtrl'
        }
      }
    })
    .state('jobPostings.Post', {
      views : {
        'jobPostings@jobPostings' : {
          templateUrl: 'app/jobPostings/jobPostingPost/jobPostingsPost.html',
          controller : 'jobPostingCtrl'
        }
      }
    })
    .state('jobPostings.SpecificJob',{
      params : {
        jobTitle : null,
        description : null,
        company : null,
        experience : null,
        companyLinkedIn : null
      },
      views : {
        'jobPostings@jobPostings' : {
          templateUrl: 'app/jobPostings/jobPostingSpecific/jobPostingsSpecific.html',
          controller : 'specificJobCtrl',
        }
      }
    })
}])
