angular.module('Xenia.Dashboard')
    .controller('DashboardCtrl', function(Event){
        var dashboard = this;

        dashboard.events = [];
        dashboard.isRefreshing = false;

        dashboard.init = function() {
            dashboard.getEvents();
        };

        dashboard.getEvents = function() {
            Event.listAll().then(function(result){
                dashboard.events = result.data;
            });
        };

        dashboard.refreshEvents = function() {
            dashboard.isRefreshing = true;
            Event.refreshAll().then(function(){
                dashboard.getEvents();
                dashboard.isRefreshing = false;
            });
        };

        dashboard.init();
    });