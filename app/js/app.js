'use strict';

/* App Module */

var xeniaApp = angular.module('xeniaApp', ['ngRoute', 'xeniaControllers', 'xeniaServices']);

xeniaApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/events', {
                templateUrl: 'partials/events.html',
                controller: 'EventsListCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);