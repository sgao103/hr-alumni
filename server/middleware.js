var morgan     = require('morgan'),
    bodyParser = require('body-parser'),
    gitRouter = require('./gitRoutes.js');

module.exports = function(app,express){
    var apiRouter = express.Router();

    app.use(bodyParser.urlencoded( {extended:true} ));
    app.use(bodyParser.json());
    app.use(express.static(__dirname + '/../client'));

    app.use('/auth',gitRouter);
    app.use('/api',apiRouter);
    require('./apiRoutes')(apiRouter)
};
