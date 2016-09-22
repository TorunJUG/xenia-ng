angular.module('Xenia.Common')
    .service('Giveaway', function($http, XENIA_API_URL){
        var model = this;

        model.listAll = function(eventId) {
            return $http.get(XENIA_API_URL + "/events/" + eventId + "/giveaways");
        };

        model.create = function(eventId, giveaway) {
            return $http.post(XENIA_API_URL + "/events/" + eventId + "/giveaways", giveaway);
        };

        model.delete = function(eventId, giveawayId) {
            return $http.delete(XENIA_API_URL + "/events/" + eventId + "/giveaways/" + giveawayId);
        };

        model.update = function(eventId, giveawayId, giveaway) {
            return $http.put(XENIA_API_URL + "/events/" + eventId + "/giveaways/" + giveawayId, giveaway);
        };

        model.prizesQueue = function(eventId) {
            return $http.get(XENIA_API_URL + "/events/" + eventId + "/giveaways/prizes/queue");
        };

        model.drawCandidate = function(eventId, giveawayId, absentMemberId) {
            return $http.get(XENIA_API_URL + "/events/" + eventId + "/giveaways/" + giveawayId + "/draw?absent=" + absentMemberId);
        };

        model.confirmWinner = function(eventId, giveawayId, winnerId) {
            return $http.post(XENIA_API_URL + "/events/" + eventId + "/giveaways/" + giveawayId + "/draw", { memberId: winnerId });
        };

        model.winners = function(eventId) {
            return $http.get(XENIA_API_URL + "/events/" + eventId + "/giveaways/result/grouped");
        }
    });