'use strict';

var AlertsManager = function() {
	var AlertsManager = {

		alerts: {},
        addAlert: function(message, type) {
            this.alerts[type] = this.alerts[type] || [];
            this.alerts[type].push(message);
        },
        clearAlerts: function() {
            for(var x in this.alerts) {
           delete this.alerts[x];
        }
        }
	}
    return AlertsManager;
};

AlertsManager.$inject = [];
module.exports = AlertsManager;
