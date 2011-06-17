var _ = require('underscore'),
    url = require('url'),
    Context = require('./context'),
    action = require('./action'),
    route = require('./route'),
    utils = require('./utils');

module.exports = utils.buildClass(null,
function(route) {
    this._route = route;
},
// prototype properties
{
    dispatch: function(req, res) {
        var urlInfo,
            matchRoute,
            routePath,
            targetAction,
            ctx = new Context(req, res);

        urlInfo = url.parse(req.url);

        matchRoute = this._route.find(urlInfo.pathname);
        if (!matchRoute) {
            console.log('routing failed');
            utils.respond404(res);
            return;
        }

        routePath = matchRoute.arguments.module + '/' + matchRoute.arguments.action;

        //todo: get action method
        //
        targetAction = this.getAction(routePath);

        action.processAction(ctx, targetAction);
    },

    getAction : function(routePath) {
        return require(routePath).action;
    }
});

