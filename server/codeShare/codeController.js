var CodeShare = require('./codeShareModel.js');
var bluebird = require('bluebird');
var util = require('../config/utils.js')

module.exports = {
  createSharedCode: function(req, res, next) {
    var data = req.body;

    var newCodeShare = {
      title: data.title,
      description: data.description,
      tags: data.tags,
      code: data.code
    };

    CodeShare(newCodeShare).save()
      .then(function(createdCodeShare) {
        if (createdCodeShare) {
          res.status(201).json( createdCodeShare );
        }
      })
      .catch(function(err) {
        throw err;
      })
  },

  getSharedCode: function(req, res, next) {
    var resultLimit = Number(req.query.resultLimit) || 10;

    CodeShare.find({})
      .limit(resultLimit)
      .then(function(dbResults) {
        res.json( dbResults );
      })
      .catch(function(err) {
        throw err;
      });
  }
};