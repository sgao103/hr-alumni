/**
 * Created by VaibhavNamburi on 16/01/2016.
 */
var jobPostingController = require('./jobs/jobPostingController');
var userController = require('./users/userController.js')


module.exports = function(apiRouter){

    /*     Routes beginning with /api/profiles

     See documentation at corresponding
     function in request-handler.js
     */
    apiRouter.get('/profiles', userController.findAll);
    apiRouter.post('/profiles', userController.createProfile);
    apiRouter.get('/profile/:githubName', userController.findOne);


    apiRouter.post('/updateProfile', userController.updateProfile);

    /*     Routes beginning with /api/jobPostings
     See documentation at corresponding
     function in jobPostingController.js
     */
    apiRouter.get('/jobPostings', jobPostingController.getJobPosting);
    apiRouter.post('/jobPostings', jobPostingController.createJobPosting);
    apiRouter.get('/jobPostings/:specificJob',jobPostingController.specificJobPosting)


}
