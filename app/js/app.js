'use strict';

/* App Module */

var xeniaApp = angular.module('xeniaApp', ['ngRoute', 'ui.bootstrap', 'xeniaControllers', 'xeniaServices']);

xeniaApp.value('serverUrl', 'http://localhost:8080');
xeniaApp.value('notificationArea', '#process-notification-area');

xeniaApp.config(['$routeProvider', '$httpProvider',
    function($routeProvider, $httpProvider) {
        //Enable cross domain calls
        $httpProvider.defaults.useXDomain = true;
        //Remove the header used to identify ajax call  that would prevent CORS from working
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $routeProvider.
            when('/events', {
                templateUrl: 'partials/events.html',
                controller: 'EventsListCtrl'
            }).
            when('/event/:id', {
                templateUrl: 'partials/eventDetails.html',
                controller: 'EventDetailsCtrl'
            }).
            when('/prizes', {
                templateUrl: 'partials/prizes.html',
                controller: 'PrizesCtrl'
            }).
            when('/prizes/add', {
                templateUrl: 'partials/prizesAdd.html',
                controller: 'PrizeAddCtrl'
            }).
            when('/prize/:id', {
                templateUrl: 'partials/prizesEdit.html',
                controller: 'PrizeEditCtrl'
            }).
            when('/prize/:id/edit', {
                templateUrl: 'partials/prizesEdit.html',
                controller: 'PrizeEditCtrl'
            }).
            otherwise({
                redirectTo: '/events'
            });
    }]);
/*Logging for binding*/
/*xeniaApp.config(function($provide){
    $provide.decorator("$interpolate", function($delegate){

        var interpolateWrap = function(){
            var interpolationFn = $delegate.apply(this, arguments);
            if(interpolationFn) {
                return interpolationFnWrap(interpolationFn, arguments);
            }
        };

        var interpolationFnWrap = function(interpolationFn, interpolationArgs){
            return function(){
                var result = interpolationFn.apply(this, arguments);
                var log = result ? console.log : console.warn;
                log.call(console, "interpolation of  " + interpolationArgs[0].trim(),
                                  ":", result.trim());
                return result;
            };
        };

        angular.extend(interpolateWrap, $delegate);
        return interpolateWrap;

    });
});
*/