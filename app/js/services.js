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

xeniaServices.factory('Prizes', ['$resource', 'serverUrl',
    function($resource, serverUrl) {
        return $resource(serverUrl + '/prizes', {}, {
            query: {method:'GET', isArray:false}
        })
    }
]
);