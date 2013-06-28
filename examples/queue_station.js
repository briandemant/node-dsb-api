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
/*
$> node examples/queue_station.js
Train comming into Odense
          on track undefined
          going to Fredericia
         departing Fri, 28 Jun 2013 22:39:00 GMT
Fri, 28 Jun 2013 22:48:00 GMT  > Tommerup
Fri, 28 Jun 2013 22:54:00 GMT  > Aarup
Fri, 28 Jun 2013 22:58:00 GMT  > Gelsted
Fri, 28 Jun 2013 23:03:00 GMT  > Ejby
Fri, 28 Jun 2013 23:07:00 GMT  > Nørre Åby
Fri, 28 Jun 2013 23:14:00 GMT  > Middelfart
*/
