app.controller('TransmitterController', function($scope, transmitterDiscovery, controlApiClientFactory) {
    $scope.$watchCollection(function() { return transmitterDiscovery.transmitters }, function() {
        $scope.transmitters = transmitterDiscovery.transmitters;
        $scope.transmittersCount = Object.keys(transmitterDiscovery.transmitters).length;
    });

    $scope.connectToTransmitter = function(transmitter) {
        controlApiClientFactory.register(transmitter);
    }
});
