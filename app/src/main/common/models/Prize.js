angular.module('Xenia.Common')
    .service('Prize', function($http, XENIA_API_URL){
        var model = this;

        model.listAll = function() {
            return $http.get(XENIA_API_URL + "/prizes");
        };

        model.listInactive = function() {
            return $http.get(XENIA_API_URL + "/prizes/inactive");
        };

        model.listActive = function() {
            return $http.get(XENIA_API_URL + "/prizes/active");
        };

        model.create = function(prize) {
            return $http.post(XENIA_API_URL + "/prizes", prize);
        };

        model.update = function(id, prize) {
            return $http.put(XENIA_API_URL + "/prizes/" + id, prize);
        };

        model.makeActive = function(id) {
            return $http.post(XENIA_API_URL + "/prizes/" + id + "/activate", {});
        };

        model.makeInactive = function(id) {
            return $http.post(XENIA_API_URL + "/prizes/" + id + "/disable", {});
        };
    });