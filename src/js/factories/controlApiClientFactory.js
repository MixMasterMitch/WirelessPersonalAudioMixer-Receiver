app.factory('controlApiClientFactory', function($rootScope, receiverName, audioChannelsFactory) {
    var http = require('http');
    var ip = require('ip');
    var querystring = require('querystring');

    var controlApiClientFactory = {};

    controlApiClientFactory.register = function(transmitter) {
        var req = http.request({
            hostname : transmitter.apiHost,
            port : transmitter.apiPort,
            path : '/register?' + querystring.stringify({host : ip.address(), name : receiverName.name}),
            method : 'GET'
        }, function(res) {
            res.on('data', function(chunk) {
                audioChannelsFactory.inputDevice = angular.fromJson(chunk.toString());
                console.log(audioChannelsFactory.inputDevice);
                $rootScope.connected = true;
            });
        });
        req.end();
    };

    return controlApiClientFactory;
});
