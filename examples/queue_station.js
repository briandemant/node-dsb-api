var dsbApi = require('../');

require('colors');

// All trains arriving at Odense 
function printStation(err, queue) {
	console.log("Train comming into " + "Odense".red);
	console.log("          on track " + (queue.Track || "?").red);
	console.log("          going to " + queue.DestinationName.red);
	console.log("         departing " + queue.ScheduledDeparture.toUTCString().red);

	dsbApi.Queue.find({filter : "TrainNumber eq '" + queue.TrainNumber + "'", orderBy : 'ScheduledDeparture'}, function(err, list) {
		function next(list, idx) {
			function printDepartTures(err, station) {
				console.log(list[idx].ScheduledDeparture.toUTCString() + "  > " + station.Name.red);
				if (list.length > idx + 1) {
					next(list, idx + 1);
				} else {
					// done .. the api cant help us with arrival on destination
					// it's only about departure
				}
			}

			dsbApi.Station.findOne({filter : "UIC eq '" + list[idx].StationUic + "'", select : 'Name'}, printDepartTures);
		}

		next(list, 1); // skip the one in odense
	});
}


dsbApi.Queue.findOne({filter : "StationUic eq '8600512'", orderBy : 'ScheduledDeparture'}, printStation);