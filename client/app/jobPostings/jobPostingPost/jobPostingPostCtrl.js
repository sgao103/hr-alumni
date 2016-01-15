angular.module('jobPosting.controller.jobPostingPost', ['ui.router'])

    .controller('jobPostingCtrl',['$scope','$http','jobPostingFactory',function($scope,$http,jobPostingFactory){

        $scope.data ={
            jobTitle : '',
            description : '',
            company : '',
            experience : '',
            companyLinkedIn : ''
        }

        $scope.jobPostingSubmit = function(){

            jobPostingFactory.postJob($scope.data).then(function(data){
                console.log(data)
            })
        }

    }])
