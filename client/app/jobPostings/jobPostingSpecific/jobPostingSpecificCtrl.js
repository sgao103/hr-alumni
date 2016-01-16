angular.module('jobPosting.jobPostingSpecific.controller', ['ui.router'])

.controller('specificJobCtrl',['$scope','$http','jobPostingFactory','$stateParams',function($scope,$http,jobPostingFactory,$stateParams){

    $scope.data = {
        specificJob : {
            jobTitle : $stateParams.jobTitle,
            description : $stateParams.description,
            company : $stateParams.company,
            experience : $stateParams.experience,
            companyLinkedIn : $stateParams.companyLinkedIn
        }
    }

    console.log('specfic',$scope.data)

}])
