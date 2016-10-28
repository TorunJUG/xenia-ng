angular.module('Xenia.Navigation')
    .controller('NavigationCtrl', function($location){
        var nav = this;

        nav.isActive = function(viewLocation) {
            return $location.path().startsWith(viewLocation);
        }
    });