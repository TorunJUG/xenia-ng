var xeniaControllers = angular.module('xeniaControllers', []);

xeniaControllers.controller('NavigationCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
}]);

xeniaControllers.controller('EventsListCtrl', ['$scope', '$http', '$route', 'serverUrl', 'notificationArea', 'Events',
    function($scope, $http, $route, serverUrl, notificationArea, Events) {
        $scope.events = Events.query()

        $scope.refresh = function() {
            jQuery(notificationArea).html("Refreshing events...").fadeIn();

            $http({
                url: serverUrl + '/events/refresh',
                method: 'GET'
            }).success(function(response){
                    jQuery(notificationArea).fadeOut();
                    $route.reload();
                }).error(function(){
                    jQuery(notificationArea).fadeOut();
                    displayError({text: 'An error has occurred'});
                });
        }
    }
]);

xeniaControllers.controller('PrizesCtrl', ['$scope', '$location', 'Prizes', function($scope, $location, Prizes) {
    $scope.list = Prizes.query();

    $scope.add = function() {
        $location.path('/prizes/add');
    };
}]);

xeniaControllers.controller('PrizeAddCtrl', ['$scope', '$location', '$http', 'serverUrl', 'Prizes', function($scope, $location, $http, serverUrl, Prizes) {
    $scope.save = function(prize) {
        if (prize != undefined && $scope.prizeAddForm.$valid) {
            $http({
                url: serverUrl + '/prize',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: prize
            }).success(function(response){
                    $location.path('/prizes');
                }).error(function(){
                    console.log('error :)');
                });
        }
    };

    $scope.cancel = function() {
        $location.path('/prizes');
    };
}]);

