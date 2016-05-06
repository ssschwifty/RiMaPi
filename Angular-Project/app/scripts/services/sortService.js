angular.module('riot.services')
.service('Sort', function() {

	var gradeOrder = [
		"S+", "S", "S-",
		"A+", "A", "A-",
		"B+", "B", "B-",
		"C+", "C", "C-",
		"D+", "D", "D-",
		"N\\A"
	];

	sortFunctionGradeChampionPoints = function(a, b) {
		if(gradeOrder.indexOf(a.highestGrade) - gradeOrder.indexOf(b.highestGrade) == 0) {
			return b.championPoints - a.championPoints;
		} else {
			return gradeOrder.indexOf(a.highestGrade) - gradeOrder.indexOf(b.highestGrade);
		}
	};
	sortFunctionPointUntilNextLevel = function(a, b) {
		return a.championPointsUntilNextLevel - b.championPointsUntilNextLevel;
	}
	
	return {
		sortByGradeThenChampionPoints: function(champions) {
			champions.sort(sortFunctionGradeChampionPoints);
			var results = champions.map(function(a) {
				[a.championId];
			});
			return results;
		},
		sortByPointsUntilNextLevel: function(champions){
			champions.sort(sortFunctionPointUntilNextLevel);
			var results = champions.map(function(a) {
				[a.championId];
			});
			return results;
		}

	}
});