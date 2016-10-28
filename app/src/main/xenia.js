var xenia = angular.module('xenia', [
    'ngRoute',
    'ngAnimate',
    'Xenia.Common',
    'Xenia.Navigation',
    'Xenia.Event',
    'Xenia.Prize',
    'Xenia.Dashboard'
]);

xenia.value('XENIA_API_URL', 'http://localhost:8080');

xenia.config(function($routeProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $routeProvider
        .when('/dashboard', {
            controller: 'DashboardCtrl',
            controllerAs: 'dashboard',
            templateUrl: 'src/main/dashboard/views/dashboard.html'
        })
        .when('/event/:id', {
            controller: 'EventCtrl',
            controllerAs: 'event',
            templateUrl: 'src/main/event/views/event.html'
        })
        .when('/prizes', {
            controller: 'PrizeCtrl',
            controllerAs: 'prizes',
            templateUrl: 'src/main/prize/views/prizes.html'
        })
        .otherwise({
            redirectTo: '/dashboard'
        });
});