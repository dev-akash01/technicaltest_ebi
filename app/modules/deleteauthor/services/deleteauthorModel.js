'use strict';

var DeleteAuthorModel = function(Restangular, $q, $http, CONSTANTS) {
	
	var DeleteAuthorModel ={

		getjsondata: function() {
		var deferred = $q.defer();
		$http.get(CONSTANTS.services.jsonApiEnd).then(function(data) {
				//console.log(recomNotificationsObject);
                deferred.resolve(data);
           }, function(resp) {
          deferred.reject(resp);
             });

            return deferred.promise;
		},

		deleteAuthorToJson: function(updateObj) {
		var deferred = $q.defer();
		$http.put(CONSTANTS.services.jsonApiEnd, updateObj).then(function(data) {
                //deferred.resolve(recomNotificationsObject);
                deferred.resolve(data);
           }, function(resp) {
          	 deferred.reject(resp);
             });
			return deferred.promise;
		}
	}

	return DeleteAuthorModel;
};

DeleteAuthorModel.$inject = ['Restangular', '$q', '$http', 'CONSTANTS'];
module.exports = DeleteAuthorModel;
