var _ = require('underscore');

exports.buildClass = function(baseClass, ctor, prototypeProperties, staticProperties) {
    //TODO: add inheritance 

    function F() {
        if (typeof ctor == 'function') {
            //console.log('###ctor');
            //console.log(arguments);
            ctor.apply(this, arguments);
        }
    }

    var fPrototype = F.prototype;

    _.each(prototypeProperties, function(val, key, list) {
        fPrototype[key] = val;
    });

    _.each(staticProperties, function(val, key, list) {
        F[key] = val;
    });

    return F;
}

exports.respond404 = function(res) {
    res.writeHead(404, {'Content-type' : 'text/plain'});
    res.end('Resource not found');
}
