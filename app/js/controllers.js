var xeniaControllers = angular.module('xeniaControllers', []);

xeniaControllers.controller('NavigationCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
}]);

xeniaControllers.controller('EventsListCtrl', ['$scope', 'Events', function($scope, Events) {
  $scope.events = Events.query()
}]);

xeniaControllers.controller('PrizesCtrl', ['$scope', '$location', 'Prizes', function($scope, $location, Prizes) {
    $scope.list = Prizes.query()

    $scope.add = function() {
        $location.path('/prizes/add')
    }
}]);

