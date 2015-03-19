app.factory('transmitterDiscovery', function($rootScope, receiverName, shortid) {
    var dgram = require('dgram');
    var ip = require('ip');

    var transmitterDiscovery = {};

    transmitterDiscovery.multicastIp = '239.255.255.251';
    transmitterDiscovery.transmitterPort = 5007;
    transmitterDiscovery.receiverPort = 5008;
    transmitterDiscovery.id = shortid.generate();

    transmitterDiscovery.transmitters = {};

    transmitterDiscovery.start = function() {
        if (transmitterDiscovery.socket) { return; }

        transmitterDiscovery.socket = dgram.createSocket('udp4');

        transmitterDiscovery.socket.on('error', function(err) {
            console.log(err);
        });

        transmitterDiscovery.socket.on('message', function(msg, rinfo) {
            try {
                var response = angular.fromJson(msg.toString());
                if (response.deviceType !== 'wireless-personal-audio-mixer:transmitter') { return; }
                transmitterDiscovery.transmitters[response.id] = {
                    name : response.name,
                    apiHost : response.apiHost,
                    apiPort : response.apiPort
                };
                $rootScope.$apply();
            } catch (e) {}
        });

        transmitterDiscovery.socket.on('listening', function() {
            var address = transmitterDiscovery.socket.address();
            console.log('listening on ' + 'http://' + ip.address() + ':' + address.port);

            transmitterDiscovery.socket.addMembership(transmitterDiscovery.multicastIp);
            transmitterDiscovery.socket.setMulticastTTL(1);
        });

        transmitterDiscovery.socket.bind(transmitterDiscovery.receiverPort);

        setInterval(function() {
            var message = angular.toJson({
                id : transmitterDiscovery.id,
                deviceType : 'wireless-personal-audio-mixer:receiver',
                query : 'wireless-personal-audio-mixer:transmitter',
                name : receiverName.name
            });
            transmitterDiscovery.socket.send(message, 0, message.length, transmitterDiscovery.transmitterPort, transmitterDiscovery.multicastIp);
        }, 1000);
    };

    return transmitterDiscovery;
});
