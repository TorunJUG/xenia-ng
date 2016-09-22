angular.module('Xenia.Common')
    .service('Attendee', function($http, XENIA_API_URL){
        var model = this;

        model.listAll = function(id) {
            return $http.get(XENIA_API_URL + "/events/" + id + "/attendees");
        };

        model.refreshAll = function(id) {
            return $http.post(XENIA_API_URL + "/events/" + id + "/attendees/refresh", {});
        };
    });