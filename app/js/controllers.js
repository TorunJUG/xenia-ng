var xeniaControllers = angular.module('xeniaControllers', []);

xeniaControllers.controller('NavigationCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
}]);

xeniaControllers.controller('EventsListCtrl', ['$scope', '$http', '$route', 'serverUrl', 'notificationArea', 'Events',
    function ($scope, $http, $route, serverUrl, notificationArea, Events) {
        $scope.events = Events.query()

        $scope.refresh = function () {
            jQuery(notificationArea).html("Refreshing events...").fadeIn();

            $http({
                url: serverUrl + '/events/refresh',
                method: 'GET'
            }).success(function (response) {
                jQuery(notificationArea).fadeOut();
                $route.reload();
            }).error(function () {
                jQuery(notificationArea).fadeOut();
                displayError({text: 'An error has occurred'});
            });
        }
    }
]);

xeniaControllers.controller('EventDetailsCtrl', ['$scope', '$route', '$routeParams', 'serverUrl', 'Event', 'Attendees', 'GiveAways', 'GiveAwaySingle', 'Prizes', 'GiveAway',
    "AllDrawPost", 'Draws', 'DrawPost', 'DrawPut','Draw', 'DrawConfirm', 'ConfirmAllDrawPost',
    function ($scope, $route, $routeParams, serverUrl, Event, Attendees, GiveAways, GiveAwaySingle, Prizes, GiveAway, AllDrawPost, Draws, DrawPost, DrawPut, Draw, DrawConfirm, ConfirmAllDrawPost) {

        $scope.refreshWinners = function() {

            $scope.giveAways = GiveAways.get({id: $scope.event.id}, function(response) {
                console.log("refreshing")
                $scope.draws = []

                response.giveAways.forEach(function (giveAway) {
                    giveAway.drawn.forEach(function (drawEl) {
                        $scope.draws.push({"giveAway":giveAway, "drawn":drawEl})
                    })

                });
                console.log(response)
                console.log($scope.draws)
                //$scope.$apply()
            })

        };
        
        $scope.event = Event.get({id: $routeParams.id});

        $scope.attendees = Attendees.get({id: $routeParams.id});

        $scope.placeholderAvatar = 'http://img2.meetupstatic.com/img/458386242735519287330/noPhoto_50.png';

        $scope.giveAways = GiveAways.get({id: $routeParams.id});

        $scope.draws = []

        $scope.drawAll = function (input) {
            AllDrawPost.save({eventId: $scope.event.id}, input, $scope.refreshWinners)
        }

        $scope.confirmAll = function(input) {
            ConfirmAllDrawPost.save({eventId: $scope.event.id}, input, $scope.refreshWinners)

        }

        $scope.redraw = function(giveAwayId, drawId) {
            DrawPut.update({eventId: $scope.event.id, giveAwayId: giveAwayId, id: drawId}, {} , $scope.refreshWinners)

        }



        $scope.prizes = {prizes: []};

        $scope.createGiveAway = function () {
            $scope.prizes = Prizes.query();
            $('#createGiveAwayModal').modal();
        }

        $scope.saveGiveAway = function (input) {
            if (input != undefined && $scope.createGiveAwayForm.$valid) {
                GiveAway.save({id: $routeParams.id}, input, function (response) {
                    $('#createGiveAwayModal').modal('toggle');
                    $route.reload();
                });
            }
        }

        $scope.drawDialog = function (giveAway) {
            $scope.draws = Draws.query({eventId: $routeParams.id, id: giveAway.id})
            $scope.giveaway = giveAway;
            $('#createDrawPrizeModal').modal();
        }

        $scope.draw = function (input) {

            DrawPost.save({eventId: $routeParams.id, id: $scope.giveaway.id}, input, function (response) {
                drawId = response.resourceUrl.split("/").slice(-1)[0]
                $scope.winner = Draw.query({eventId: $routeParams.id, giveawayId: $scope.giveaway.id, id: drawId})
                $('#createPrizeDrawnModal').modal();
            }, function (response) {
                $('#createDrawPrizeModal').modal('toggle');
                displayError({
                    text: '<b>' + response.data.error + ':</b> ' + response.data.message
                });
            });
        }

        $scope.confirm = function (input) {

            DrawConfirm.confirm({
                eventId: $routeParams.id,
                giveawayId: $scope.giveaway.id,
                id: $scope.winner.id
            }, {confirmed: "true"}, function (response) {

                GiveAwaySingle.query({eventId: $routeParams.id, id: $scope.giveaway.id}, {}, function (response) {
                    $('#createPrizeDrawnModal').modal('toggle');
                    $('#createDrawPrizeModal').modal('toggle');
                    $scope.giveaway = response;
                    $scope.drawDialog($scope.giveaway);
                    $scope.giveAways = GiveAways.get({id: $routeParams.id});
                });
            });
        }
    }
]);

xeniaControllers.controller('PrizesCtrl', ['$scope', '$location', 'Prizes', function ($scope, $location, Prizes) {
    $scope.list = Prizes.query();

    $scope.add = function () {
        $location.path('/prizes/add');
    };
}]);

xeniaControllers.controller('PrizeAddCtrl', ['$scope', '$location', '$http', 'serverUrl', 'Prizes', function ($scope, $location, $http, serverUrl, Prizes) {
    $scope.save = function (prize) {
        if (prize != undefined && $scope.prizeAddForm.$valid) {
            $http({
                url: serverUrl + '/prize',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: prize
            }).success(function (response) {
                $location.path('/prizes');
            }).error(function () {
                displayError({
                    text: 'Error :)'
                });
            });
        }
    };

    $scope.cancel = function () {
        $location.path('/prizes');
    };
}]);

