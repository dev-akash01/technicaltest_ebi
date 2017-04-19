'use strict';
// Controller naming conventions should start with an uppercase letter
function HomeCtrl($scope, AddauthorModel) {
	$scope.title = "";
	$scope.authors = [];
	$scope.affiliations = [];
	$scope.dataAvailabale = false;

	function init(){
		AddauthorModel.getjsondata().then(function(data){
			$scope.title = data.data.title;
	      	$scope.authors = data.data.authors;
	      	$scope.affiliations = data.data.affiliations;
	      	//console.log(data)
	      	$scope.dataAvailabale =true;
    }, function(err){

    });
	}
	init();
}

// $inject is necessary for minification. See http://bit.ly/1lNICde for explanation.
HomeCtrl.$inject = ['$scope', 'AddauthorModel'];
module.exports = HomeCtrl;