angular.module('jobPosting.factory', [])



.factory('jobPostingFactory',function($http){

    var apiUrl = 'http://localhost:3000';

    var postJob = function(jobPosting){

        return $http.post(apiUrl + '/api/jobPostings', jobPosting)
            .then(function(res) {
                return res.data;
            }, function(err) {
                return err;
            });

    };

    var getJob = function(jobSearch){

        return $http.get(apiUrl + '/api/jobPostings', {
                params : {
                    jobTitle : jobSearch.jobTitle,
                    company : jobSearch.company
                }
            })
            .then(function(res) {
                return res.data;
            }, function(err) {
                return err;
            });

    };

    var specificJob = function(jobID){
        return $http.get(apiUrl + '/api/jobPostings/' + jobID)
            .then(function(res) {
                return res.data;
            }, function(err) {
                return err;
            });
    }


    return{
        postJob : postJob,
        getJob : getJob,
        specificJob : specificJob
    }

})
