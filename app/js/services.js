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
            query: {method:'GET', isArray:false}
        })
    }
]
);