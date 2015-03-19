var app = angular.module('WirelessPersonalAudioMixerReceiver', ['ui.bootstrap-slider']);

app.run(function($rootScope, shortid, transmitterDiscovery, backendFactory) {
    $rootScope.inputChannels = [
        {
            id : shortid.generate(),
            name : 'Built-in Input',
            deviceNumber : 0,
            latency : 3
        },
        {
            id : shortid.generate(),
            name : 'Roland',
            deviceNumber : 1,
            inputNumber : 0,
            latency : 10
        },
        {
            id : shortid.generate(),
            name : 'Roland',
            deviceNumber : 1,
            inputNumber : 1,
            latency : 10
        }
    ];
    $rootScope.audioChannels = [
        {
            id : shortid.generate(),
            name : 'Mitchell\'s Mic',
            inputChannel : $rootScope.inputChannels[0],
            muted : false,
            solo : false,
            level : 55
        },
        {
            id : shortid.generate(),
            name : 'Mitchell\'s Piano',
            inputChannel : $rootScope.inputChannels[3],
            muted : false,
            solo : false,
            level : 75
        }
    ];
    $rootScope.clients = [
        {
            id : shortid.generate(),
            name : 'MixMasterMitch',
            gains : {}
        },
        {
            id : shortid.generate(),
            name : 'Mitchell Loeppky',
            gains : {}
        }
    ];
    $rootScope.clients[0].gains[$rootScope.audioChannels[0].id] = 0;
    $rootScope.clients[0].gains[$rootScope.audioChannels[1].id] = 50;
    $rootScope.clients[1].gains[$rootScope.audioChannels[0].id] = -50;
    $rootScope.clients[1].gains[$rootScope.audioChannels[1].id] = 0;

    transmitterDiscovery.start();
    backendFactory.initialize();
    backendFactory.Receiver.start();

});
