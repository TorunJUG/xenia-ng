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

xeniaControllers.controller('PrizesCtrl', ['$scope', '$location', 'Prizes', 'PrizeService','Prize', function ($scope, $location, Prizes, PrizeService,Prize) {
    $scope.list = Prizes.query();

    $scope.add = function () {
        $location.path('/prizes/add');
    };

    $scope.placeholderPrize = 'css/images/no-image.png';

    $scope.edit = function (prize) {
            PrizeService.setCurrent(prize);
            var id = prize.id;
            $location.path('/prize/'+ id);
            console.debug('edit prize id:' + id);
        };

    $scope.searchPrize = '';

    $scope.sortType = 'name';
    $scope.sortReverse = false;

    $scope.startDelete = function() {
        $scope.isDeleting = true;
    };

    var stopDelete = function() {
        $scope.isDeleting = false;
    };

    $scope.cancelDelete = function() {
        stopDelete();
    };

    $scope.isDeleting = false;

    $scope.delete = function (prize) {
        Prize.delete({id: prize.id}).$promise.then(
            function(response){
                var index = $scope.list.prizes.indexOf(prize)
                    if (index !==-1) {
                         $scope.list.prizes.splice(index, 1);
                    }
                stopDelete();
                console.debug('Successfully deleted prize. Data:' + response);
            },
            function(error){
                displayError({text: 'Error: '+error.data.message})
                console.error('Prize delete unsuccessful! Details: ' + error);
            }
        );

         //PrizeService.delete(
         //               prize
         //           ).success(function (response) {
         //               $location.path('/prizes');
         //               console.log('Successfully deleted prize. Data:' + response);
         //           }).error(function (data, status) {
         //               displayError({
         //                   text: 'Error: ' + data.message
         //               });
         //               console.log('Prize delete was not successful! Status: ' + status + ' Details: ' + data.message);
         //           });
    };
}]);

xeniaControllers.controller('PrizeAddCtrl', ['$scope', '$location', '$http', 'serverUrl', 'Prizes', 'PrizeService', function ($scope, $location, $http, serverUrl, Prizes, PrizeService) {
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
            }).error(function (data, status) {
                displayError({
                    text: 'Error: ' + data.message
                });
            });
        }
    };

    $scope.cancel = function () {
        $location.path('/prizes');
    };

    $scope.getProducers = function(prefix) {
        return PrizeService.getPrizeProducers(prefix);
    };

    $scope.getSponsors = function(prefix) {
            return PrizeService.getPrizeSponsors(prefix);
    };

    $scope.getNames = function(prefix) {
            return PrizeService.getPrizeNames(prefix);
    };
}
]);

xeniaControllers.controller('PrizeEditCtrl',['$scope','$location','$routeParams','Prize',function($scope, $location,$routeParams,Prize){

    $scope.prize=Prize.get({id:$routeParams.id});

    $scope.update = function(prize){
        Prize.update(prize);
    };

    $scope.cancel = function () {
        $location.path('/prizes');
    };
}
]);




xeniaControllers.controller('PrizeEditCtrl', ['$scope', '$location', 'PrizeService', function ($scope, $location, PrizeService) {
    $scope.prize = PrizeService.getCurrent()

    $scope.save = function (prize) {
        if ($scope.prize  != undefined && $scope.prizeEditForm.$valid) {
            PrizeService.update(
                $scope.prize
            ).success(function (response) {
                $location.path('/prizes');
                console.debug('Successfully updated prize. Data:' + response);
            }).error(function (data, status) {
                displayError({
                    text: 'Error: ' + data.message
                });
                console.error('Prize update was not successful!', status, data);
            });
        }
        else {
            console.warn('Edit prize is not defined or valid')
        }
    };

    $scope.cancel = function () {
        $location.path('/prizes');
    };


    $scope.getProducers = function(prefix) {
        return PrizeService.getPrizeProducers(prefix);
    };

    $scope.getSponsors = function(prefix) {
            return PrizeService.getPrizeSponsors(prefix);
        };

    $scope.getNames = function(prefix) {
            return PrizeService.getPrizeNames(prefix);
        };
}]);

