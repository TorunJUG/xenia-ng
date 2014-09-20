var xeniaControllers = angular.module('xeniaControllers', []);

xeniaControllers.controller('NavigationCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
}]);

xeniaControllers.controller('EventsListCtrl', ['$scope', 'Events', function($scope, Events) {
  $scope.events = Events.query()
}]);

xeniaControllers.controller('PrizesCtrl', ['$scope', '$location', '$http', 'Prizes', function($scope, $location, $http, Prizes) {
    $scope.list = Prizes.query()

    $scope.add = function() {
        $location.path('/prizes/add');
    }

    $scope.save = function(prize) {
        if (prize != undefined) {
            $http.post('http://localhost:8080/prize', prize)
                .success(function(result){
                    $location.path('/prizes')
                })
                .error(function(){

                });
        }
    }

    $scope.cancel = function() {
        $location.path('/prizes');
    }
}]);

