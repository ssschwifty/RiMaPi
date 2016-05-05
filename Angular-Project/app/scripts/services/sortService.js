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

	sortFunction = function(a, b) {
		if(gradeOrder.indexOf(a.highestGrade) - gradeOrder.indexOf(b.highestGrade) == 0) {
			return b.championPoints - a.championPoints;
		} else {
			return gradeOrder.indexOf(a.highestGrade) - gradeOrder.indexOf(b.highestGrade);
		}
	}
	
	return {
		sortByGradeThenChampionPoints: function(champions) {
			champions.sort(sortFunction);
			var results = champions.map(function(a) {
				[a.championId];
			});
			return results;
		}

	}
});