var dsbApi = require('../');

require('colors');

// All trains arriving at Odense 
dsbApi.Queue.find({filter : "StationUic eq '8600512'", orderBy : 'ScheduledDeparture'}, function(err, list) {
	console.log("found " + list.length);
	for (var i = 0; i < list.length; i++) {
		var queue = list[i];
		
		console.log(queue.ScheduledDeparture.toUTCString().green + ": " + queue.DestinationName + " (" + (queue.TrainType + " " + queue.TrainNumber).yellow + ")");
	} 
});