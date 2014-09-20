'use strict';

/* Services */

var xeniaServices = angular.module('xeniaServices', ['ngResource']);


xeniaServices.factory('Events', ['$resource', 
    function($resource) {
        return $resource('http://localhost:8080/events', {}, {
            query: {method:'GET', isArray:false}
        })
    }
   ]
);

xeniaServices.factory('Prizes', ['$resource',
    function($resource) {
        return $resource('http://localhost:8080/prizes', {}, {
            query: {method:'GET', isArray:false}
        })
    }
]
);