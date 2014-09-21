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

xeniaControllers.controller('EventDetailsCtrl', ['$scope', '$route', '$routeParams', 'serverUrl', 'Event', 'Attendees', 'GiveAways', 'Prizes', 'GiveAway', 'Draws', 'DrawPost', 'Draw',
    function($scope, $route, $routeParams, serverUrl, Event, Attendees, GiveAways, Prizes, GiveAway, Draws, DrawPost, Draw){
        $scope.event = Event.get({id: $routeParams.id});

        $scope.attendees = Attendees.get({id: $routeParams.id});

        $scope.placeholderAvatar = 'http://img2.meetupstatic.com/img/458386242735519287330/noPhoto_50.png';

        $scope.giveAways = GiveAways.get({id: $routeParams.id});

        $scope.prizes = {prizes:[]};

        $scope.createGiveAway = function() {
            $scope.prizes = Prizes.query();
            $('#createGiveAwayModal').modal();
        }

        $scope.saveGiveAway = function(input) {
            if (input != undefined && $scope.createGiveAwayForm.$valid) {
                GiveAway.save({id: $routeParams.id}, input, function(response){
                    $('#createGiveAwayModal').modal('toggle');
                    $route.reload();
                });
            }
        }
        
        $scope.drawDialog = function(amount, prizeName, giveAwayId) {
            $scope.draws = Draws.query({eventId: $routeParams.id, id: giveAwayId})
            $scope.amount = amount
            $scope.prizeName = prizeName
            $scope.giveAwayId = giveAwayId
            $('#createDrawPrizeModal').modal();
        }
        
        $scope.draw = function(input, giveAwayId ) {
        
            DrawPost.post({eventId: $routeParams.id, id: $scope.giveAwayId}, input, function(response){
            alert(response.data)
                 $scope.winner = Draw.query({draw_resource: response.data.resourceUrl})
                 $('#createPrizeDrawnModal').modal();    
                
            })
            
           
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
                    displayError({
                        text: 'Error :)'
                    });
                });
        }
    };

    $scope.cancel = function() {
        $location.path('/prizes');
    };
}]);

