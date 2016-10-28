angular.module('Xenia.Common')
    .service('Event', function($http, XENIA_API_URL){
        var model = this;

        model.listAll = function() {
            return $http.get(XENIA_API_URL +  "/events");
        };

        model.refreshAll = function() {
            return $http.post(XENIA_API_URL +  "/events/refresh", {});
        };

        model.findById = function(id) {
            return $http.get(XENIA_API_URL + "/events/" + id);
        }
    });