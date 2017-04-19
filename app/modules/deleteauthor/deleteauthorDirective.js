'use strict';

module.exports = function deleteuthorDirective() {
    return {
        controller: 'DeleteauthorCtrl',
        controllerAs: 'ctrl',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./deleteauthor.html')
    };
};