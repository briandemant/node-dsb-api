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
/*
$> node examples/queues.js
found 7
Fri, 28 Jun 2013 22:39:00 GMT: Fredericia (Rv 3879)
Fri, 28 Jun 2013 22:46:00 GMT: Cph lufthavn (Ic 168)
Fri, 28 Jun 2013 23:03:00 GMT: Sønderborg (Ic 981)
Fri, 28 Jun 2013 23:09:00 GMT: Ringe (Rv 2682)
Fri, 28 Jun 2013 23:19:00 GMT: Østerport (Ic 868)
Fri, 28 Jun 2013 23:23:00 GMT: Svendborg (Rv 4682)
Fri, 28 Jun 2013 23:39:00 GMT: Aarhus h (Ic 179)
*/
