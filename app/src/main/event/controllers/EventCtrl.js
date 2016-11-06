angular.module('Xenia.Event')
    .controller('EventCtrl', function(XENIA_API_URL, $routeParams, $scope, Event, Attendee, Giveaway, Prize){
        var event = this;

        event.details = {};
        event.attendees = [];
        event.prizes = [];
        event.giveaways = [];
        event.prizesQueue = [];
        event.winner = {};
        event.winners = {};
        event.avatarPlaceholder = 'http://img2.meetupstatic.com/img/458386242735519287330/noPhoto_50.png';

        event.giveaway = {};

        event.init = function() {
            Event.findById($routeParams.id).then(function(result){
                event.details = result.data;
            });

            Attendee.listAll($routeParams.id).then(function(result){
                event.attendees = result.data;
            });

            Prize.listActive().then(function(result){
                event.prizes = result.data;
            });

            event.getGiveaways();
        };

        event.getGiveaways = function() {
            Giveaway.listAll($routeParams.id).then(function(result){
                event.giveaways = result.data;
                event.getPrizesQueue();
                event.getWinners();
            });
        };

        event.countGiveaways = function() {
            return event.giveaways.reduce(function(acc,el){
                return acc + el.amount;
            }, 0);
        };

        event.getPrizesQueue = function() {
            Giveaway.prizesQueue($routeParams.id).then(function(result){
                event.prizesQueue = result.data;
            });
        };

        event.getWinners = function() {
            Giveaway.winners($routeParams.id).then(function(result){
                event.winners = result.data;
            });
        };

        event.refreshingAttendees = false;

        event.refreshAttendees = function() {
            event.refreshingAttendees = true;

            Attendee.refreshAll($routeParams.id).then(function(result){
                event.attendees = result.data;
                event.refreshingAttendees = false;
            });
        };

        event.openCreateGiveawayModal = function() {
            event.giveaway = {};
            $("#giveawayModal").modal("show");
        };

        event.createGiveaway = function(){
            Giveaway.create($routeParams.id, event.giveaway).then(function(result) {
                event.giveaway = {};
                event.getGiveaways();
                $("#giveawayModal").modal("hide");
            });
        };

        event.nextGiveaway = function() {
            if (event.canDrawGiveaway()) {
                return event.prizesQueue[0];
            }

            return {};
        };

        event.canDrawGiveaway = function() {
            return event.prizesQueue.length > 0;
        };

        event.canPickWinnerAndDrawNextGiveaway = function() {
            return event.prizesQueue.length > 1 && event.winner.id > 0;
        };

        event.drawCandidateAndSkipCurrentWinner = function(giveawayId) {
            var skippedMemberId = (typeof event.winner.id != "undefined") ? event.winner.id : 0;

            Giveaway.drawCandidateAndSkipMember($routeParams.id, giveawayId, skippedMemberId).then(function(result){
                event.winner = result.data.member;
            });
        }

        event.drawCandidateAndSetCurrentWinnerAbsent = function(giveawayId) {
            var absentMemberId = (typeof event.winner.id != "undefined") ? event.winner.id : 0;

            Giveaway.drawCandidateAndSetAbsentMember($routeParams.id, giveawayId, absentMemberId).then(function(result){
                event.winner = result.data.member;
            });
        };

        event.drawCandidate = function(giveawayId) {
            Giveaway.drawCandidate($routeParams.id, giveawayId).then(function(result){
                event.winner = result.data.member;
            });
        };

        event.winnerDrawn = function(){
            return event.winner !== {} && event.winner.id > 0;
        };

        event.confirmWinnerAndDrawNextGiveaway = function(giveawayId){
            Giveaway.confirmWinner($routeParams.id, giveawayId, event.winner.id).then(function(result){
                if (typeof event.winners[giveawayId] == "undefined") {
                    event.winners[giveawayId] = [];
                }
                event.winners[giveawayId].push(event.winner.name);
                event.winner = {};

                event.prizesQueue.splice(0, 1);

                if (event.canDrawGiveaway()) {
                    event.drawCandidate(event.nextGiveaway().id);
                }
            });
        };

        event.canUpdateGiveaway = function(giveawayId) {
            return typeof event.winners[giveawayId] === "undefined";
        };

        event.deleteGiveaway = function(giveawayId) {
            Giveaway.delete($routeParams.id, giveawayId).then(function(result){
                event.getGiveaways();
            });
        };

        event.selectGiveawayToUpdate = function(giveawayId) {
            var giveaway = jQuery.grep(event.giveaways, function(el){
                return el.id == giveawayId;
            })[0];

            event.giveaway = {
                id: giveaway.id,
                prize: giveaway.prize.id,
                amount: giveaway.amount,
                emailRequired: giveaway.emailRequired
            };

            $("#giveawayModal").modal("show");
        };

        event.isCreatingNewGiveaway = function() {
            return typeof event.giveaway.id == "undefined";
        };

        event.cancelUpdateGiveaway = function() {
            event.giveaway = {};
        };

        event.updateGiveaway = function() {
            Giveaway.update($routeParams.id, event.giveaway.id, event.giveaway).then(function(){
                event.giveaway = {};
                event.getGiveaways();
                $("#giveawayModal").modal("hide");
            });
        };

        event.drawFinished = function() {
            return event.giveaways.length > 0 && event.prizesQueue.length == 0;
        };

        event.downloadCsvUrl = function() {
            return XENIA_API_URL + "/events/" + $routeParams.id + "/giveaways/result/csv";
        };

        event.init();

        jQuery('[data-toggle="checkbox"]').radiocheck();
    });