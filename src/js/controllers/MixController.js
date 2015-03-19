app.controller('MixController', function($scope, $interval, audioChannelsFactory, backendFactory) {

    $scope.inputDevice = audioChannelsFactory.inputDevice;
    $scope.$watch(function() { return audioChannelsFactory.inputDevice; }, function() {
        $scope.inputDevice = audioChannelsFactory.inputDevice;
    });

    $scope.$watchCollection(function() { return $scope.audioChannels; }, function() {
        console.log('change');
    });

    $scope.soloAudioChannel = function(index) {
        if ($scope.soloMode = !$scope.audioChannels[index].solo) {
            $scope.audioChannels.forEach(function(audioChannel) {
                audioChannel.solo = false;
            });
        }
        $scope.audioChannels[index].solo = !$scope.audioChannels[index].solo;
        //$scope.audioChannels.forEach(function(audioChannel, audioChannelIndex) {
        //    if (audioChannelIndex === index) { return; }
        //});
    };

    $scope.muteAudioChannel = function(index) {
        $scope.audioChannels[index].muted = !$scope.audioChannels[index].muted;
        //$scope.audioChannels.forEach(function(audioChannel, audioChannelIndex) {
        //    if (audioChannelIndex === index) { return; }
        //});
    };

    $scope.formatSliderTooltip = function(value) {
        return value + '%';
    };

    $interval(function() {
        $scope.inputDevice.audioChannels.forEach(function(audioChannel) {
            audioChannel.level = backendFactory.Receiver.getAudioOutputLevel();
            audioChannel.level = Math.max(audioChannel.level, 0);
            audioChannel.level = Math.min(audioChannel.level, 100);
        });
    }, 100);
});
