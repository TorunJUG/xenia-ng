var xeniaControllers = angular.module('xeniaControllers', []);

xeniaControllers.controller('EventsListCtrl', ['$scope', 'Events', function($scope, Events) {
  $scope.events = Events.query()
}]);

