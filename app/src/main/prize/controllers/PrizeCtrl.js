angular.module('Xenia.Prize')
    .controller('PrizeCtrl', function(Prize){
        var prizes = this;

        prizes.currentList = [];
        prizes.active = [];
        prizes.inactive = [];
        prizes.editingPrize = {};

        prizes.init = function() {
            prizes.getPrizes(function(){
                prizes.currentList = prizes.active;
            });
        };

        prizes.getPrizes = function(onSuccess) {
            Prize.listActive().then(function(result){
                prizes.active = result.data;

                Prize.listInactive().then(function(result){
                    prizes.inactive = result.data;

                    if (typeof onSuccess != "undefined") {
                        onSuccess();
                    }
                });
            });
        };

        prizes.isEditing = function() {
            return typeof  prizes.editingPrize.id != "undefined";
        };

        prizes.clearForm = function() {
            prizes.editingPrize = {};
        };

        prizes.addNew = function(){
            prizes.clearForm();
            $("#prizeModal").modal("show");
        };

        prizes.create = function() {
            Prize.create(prizes.editingPrize).then(function(){
                prizes.getPrizes(function(){
                    if (prizes.editingPrize.inactive) {
                        prizes.currentList = prizes.inactive;
                    } else {
                        prizes.currentList = prizes.active;
                    }
                    $("#prizeModal").modal("hide");
                });
                prizes.clearForm();
            });
        };

        prizes.selectPrize = function(id) {
            var prize = jQuery.grep(prizes.currentList, function(el) {
                return el.id == id;
            })[0];

            prizes.editingPrize = prize;

            $("#prizeModal").modal("show");
        };

        prizes.update = function() {
            Prize.update(prizes.editingPrize.id, prizes.editingPrize).then(function(){
                prizes.getPrizes(function(){
                    if (prizes.editingPrize.inactive) {
                        prizes.currentList = prizes.inactive;
                    } else {
                        prizes.currentList = prizes.active;
                    }
                    $("#prizeModal").modal("hide");
                });
                prizes.clearForm();
            });
        };

        prizes.selectActive = function() {
            prizes.currentList = prizes.active;
        };

        prizes.selectInactive = function() {
            prizes.currentList = prizes.inactive;
        };

        prizes.makeActive = function(prizeId){
            Prize.makeActive(prizeId).then(function(){
                prizes.getPrizes(function(){
                    prizes.currentList = prizes.inactive;
                })
            });
        };

        prizes.makeInactive = function(prizeId){
            Prize.makeInactive(prizeId).then(function(){
                prizes.getPrizes(function(){
                    prizes.currentList = prizes.active;
                })
            });
        };


        prizes.init();
    });