/*
* Provides the service-object Sort.  
*/
angular.module('riot.services')
.service('Sort', function() {
	// Array makes the grades comparable and defines their order
	var gradeOrder = [
		"S+", "S", "S-",
		"A+", "A", "A-",
		"B+", "B", "B-",
		"C+", "C", "C-",
		"D+", "D", "D-",
		"N/A"
	];

	// function for sorting an array of champions by the value of highestGrade then by the value of championPoints
	sortFunctionGradeChampionPoints = function(a, b) {
		if(gradeOrder.indexOf(a.highestGrade) - gradeOrder.indexOf(b.highestGrade) == 0) {
			return b.championPoints - a.championPoints;
		} else {
			return gradeOrder.indexOf(a.highestGrade) - gradeOrder.indexOf(b.highestGrade);
		}
	};
	// function for sorting an array of champions by the value of championPointsUntilNextLevel
	sortFunctionPointUntilNextLevel = function(a, b) {
		return a.championPointsUntilNextLevel - b.championPointsUntilNextLevel;
	}
	
	// define public functions
	return {
		// sorts an array of champion objects by grade and championPoints
		// @param champions: array of champion objects, in form of the api response
		// @return results: array with sorted champion object
		sortByGradeThenChampionPoints: function(champions) {
			champions.sort(sortFunctionGradeChampionPoints);
			var results = champions.map(function(a) {
				[a.championId];
			});
			return results;
		},
		// sorts an array of champion objects by the number championPointsUntilNextLevel
		// @param champions: array of champion objects, in form of the api response
		// @return results: array with sorted champion object
		sortByPointsUntilNextLevel: function(champions){
			champions.sort(sortFunctionPointUntilNextLevel);
			var results = champions.map(function(a) {
				[a.championId];
			});
			return results;
		}

	}
});