/**
 * Created by VaibhavNamburi on 15/01/2016.
 */
var mongoose = require('mongoose');

var JobPostingSchema = new mongoose.Schema({
    jobTitle : String,
    description : String,
    company : String,
    experience : String,
    companyLinkedIn :String,
    postedDate : {type : Date, default : Date.now}
})

module.exports = mongoose.model('JobPosting',JobPostingSchema)
