'use strict';

/* App Module */

var xeniaApp = angular.module('xeniaApp', ['ngRoute', 'xeniaControllers', 'xeniaServices']);

xeniaApp.config(['$routeProvider', '$httpProvider',
    function($routeProvider, $httpProvider) {
        $routeProvider.
            when('/events', {
                templateUrl: 'partials/events.html',
                controller: 'EventsListCtrl'
            }).
            when('/prizes', {
                templateUrl: 'partials/prizes.html',
                controller: 'PrizesCtrl'
            }).
            when('/prizes/add', {
                templateUrl: 'partials/prizesAdd.html',
                controller: 'PrizesCtrl'
            }).
            otherwise({
                redirectTo: '/events'
            });

        //Enable cross domain calls
        $httpProvider.defaults.useXDomain = true;

        //Remove the header used to identify ajax call  that would prevent CORS from working
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }]);