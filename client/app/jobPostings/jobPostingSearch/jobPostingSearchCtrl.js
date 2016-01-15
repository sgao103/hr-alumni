angular.module('jobPosting.controller.jobPostingSearch', ['ui.router'])

.controller('jobSearchingCtrl',['$scope','$http','jobPostingFactory','$state',function($scope,$http,jobPostingFactory,$state){

    $scope.data ={
        jobTitle : '',
        company : '',
    };

    $scope.relevantJobPostings = ''

    $scope.$watch('[data.jobTitle,data.company]',function(){
        if($scope.data.jobTitle !== '' || $scope.data.company !== ''){
            jobPostingFactory.getJob($scope.data).then(function(data){
                console.log(data)
                $scope.relevantJobPostings = data
            });
        }

    })

    $scope.goToJob = function(job){
        console.log('go job',job)
        $state.go('jobPostings.SpecificJob',job);

    }

}])
