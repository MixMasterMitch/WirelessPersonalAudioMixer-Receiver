app.directive('volumeLevelBar', function() {
    return {
        templateUrl : 'partials/volumeLevelBar.html',
        scope : {
            volume : '='
        },
        controller : function($scope) {
            $scope.greenBarStyle = function() {
                return {width: Math.min($scope.volume, 60) + '%'}
            };
            $scope.yellowBarStyle = function() {
                return {width: Math.min($scope.volume - 60, 20) + '%'}
            };
            $scope.redBarStyle = function() {
                return {width: Math.min($scope.volume - 80, 20) + '%'}
            };
        }
    }
});
