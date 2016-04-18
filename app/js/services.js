'use strict';

/* Services */

var xeniaServices = angular.module('xeniaServices', ['ngResource']);


xeniaServices.factory('Events', ['$resource', 'serverUrl',
    function($resource, serverUrl) {
        return $resource(serverUrl + '/events', {}, {
            query: {method:'GET', isArray:false}
        })
    }
   ]
);

xeniaServices.factory('Event', ['$resource', 'serverUrl',
    function($resource, serverUrl){
        return $resource(serverUrl + '/event/:id');
    }
]);

xeniaServices.factory('Attendees', ['$resource', 'serverUrl',
    function($resource, serverUrl){
        return $resource(serverUrl + '/event/:id/attendees');
    }
]);

xeniaServices.factory('GiveAways', ['$resource', 'serverUrl',
    function($resource, serverUrl){
        return $resource(serverUrl + '/event/:id/giveaways');
    }
]);
xeniaServices.factory('GiveAwaySingle', ['$resource', 'serverUrl',
    function($resource, serverUrl){
        return $resource(serverUrl + '/event/:eventId/giveaway/:id', {}, {
            query: {method: 'GET', isArray: false}
         });
    }
]);

xeniaServices.factory('GiveAway', ['$resource', 'serverUrl',
    function($resource, serverUrl){
        return $resource(serverUrl + '/event/:id/giveaway', {}, {
            save: {method: 'POST', isArray: false}
        });
    }
]);

xeniaServices.factory('Draws', ['$resource', 'serverUrl',
    function($resource, serverUrl){
        return $resource(serverUrl + '/event/:eventId/giveaway/:id/draws', {}, {
            query: {method: 'GET', isArray: false}
        });
    }
]);

xeniaServices.factory('DrawPost', ['$resource', 'serverUrl',
    function($resource, serverUrl){
        return $resource(serverUrl + '/event/:eventId/giveaway/:id/draw');
    }
]);

xeniaServices.factory('DrawPut', ['$resource', 'serverUrl',
    function($resource, serverUrl){
        return $resource(serverUrl + '/event/:eventId/giveaway/:giveAwayId/draw/:id', {}, {
            update: {method: 'PUT', isArray: false}
            
        });
    }
]);

xeniaServices.factory('AllDrawPost', ['$resource', 'serverUrl',
    function($resource, serverUrl){
        return $resource(serverUrl + '/event/:eventId/all-draws');
    }
]);

xeniaServices.factory('ConfirmAllDrawPost', ['$resource', 'serverUrl',
    function($resource, serverUrl){
        return $resource(serverUrl + '/event/:eventId/draws/confirm');
    }
]);

xeniaServices.factory('Draw', ['$resource', 'serverUrl',
    function($resource, serverUrl){
        return $resource(serverUrl + '/event/:eventId/giveaway/:giveawayId/draw/:id', {}, {
            query: {method: 'GET', isArray: false}
        });
    }
]);

xeniaServices.factory('DrawConfirm', ['$resource', 'serverUrl',
    function($resource, serverUrl){
        return $resource(serverUrl + '/event/:eventId/giveaway/:giveawayId/draw/:id', {}, {
           
            confirm: {method: 'PATCH', isArray: false }
        });
    }
]);

xeniaServices.factory('Prizes', ['$resource', 'serverUrl',
    function($resource, serverUrl) {
        return $resource(serverUrl + '/prizes', {}, {
            query: {method:'GET', isArray:false },
        });
    }
]
);

xeniaServices.service('PrizeService', function($http, serverUrl) {

        this.currentPrize = {};

        this.update = function(prize) {
            console.log('PrizeService.update(' + prize.id + ')');
            this.currentPrize = prize;
            return $http.put(serverUrl + '/prize/' + prize.id, prize);
        }

        //note: Not nice solution (state added), not working via opennig edit page with id via url
        this.getCurrent = function() {
            console.log('PrizeService.getCurrent(). Returns prize.id: ' + this.currentPrize.id);
            return this.currentPrize
        }
        //note: asking for troubles but i am too despered to make this work
        //todo: remove state from service
        this.setCurrent = function(prize) {
            this.currentPrize = prize;
            console.log('PrizeService.setCurrent(' + prize.id + ')');
        }
    }
);