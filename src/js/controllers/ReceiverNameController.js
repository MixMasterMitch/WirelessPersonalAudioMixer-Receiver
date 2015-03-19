app.controller('ReceiverNameController', function($scope, receiverName) {
    $scope.name = receiverName.name;

    $scope.$watch('name', function() {
        receiverName.name = $scope.name;
    });

    $scope.$watch(function() { return receiverName.name }, function() {
        $scope.name = receiverName.name;
    });
});
