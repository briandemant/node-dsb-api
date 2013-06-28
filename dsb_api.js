var request = require('request');

var opendataUrl = "http://traindata.dsb.dk/stationdeparture/opendataprotocol.svc/";

var api = module.exports = {};

//function camelCase(str) {
//	return str.replace(/(:?_|^)(.)/g, function(match, group1,group2) {
//		return group2.toUpperCase();
//	});
//}


// http://traindata.dsb.dk/stationdeparture/opendataprotocol.svc/Queue?$format=json&$select=DestinationName

// http://www.dsb.dk/dsb-labs/webservice-stationsafgange/
// http://www.odata.org/documentation/uri-conventions#45_Filter_System_Query_Option_filter
function opendata(model, cb, options) {
	if (!cb) {
		cb = options;
		options = {};
	}


	var ops = {
		url : "http://traindata.dsb.dk/stationdeparture/opendataprotocol.svc/" + model,
		json : true,
		encoding : 'utf8',
		qs : {
			'$format' : 'json'
		}
	};

	if (options.filter) {
		ops['qs']['$filter'] = options.filter;
	}
	if (options.select) {
		ops['qs']['$select'] = typeof options.select === 'string' ? options.select : options.select.join();
	}
	if (options.limit) {
		ops['qs']['$top'] = options.limit;
	}
	if (options.skip) {
		ops['qs']['$skip'] = options.skip;
	}
	if (options.orderBy) {
		ops['qs']['$orderby'] = options.orderBy;
	}
	request(ops, function(err, r, json) {
//		console.log(r.request.href);
//		console.log(r.headers);
		var result = json['d'];
//		console.log(Object.keys(result));
//		console.log(JSON.stringify(result).substr(0, 100));
		cb(null, result);
	});
}

function Model(name, prepare) {
	this.find = function(options, cb) {
		opendata(name, prepare(cb), options);
	};

	this.findOne = function(options, cb) {
		options.limit = 1;
		opendata(name, prepare(function(err, list) {
			cb(err, list[0]);
		}), options);
	};
}

api.Station = new Model('Station', function(cb) {
	return function(err, list) {
		cb(err, list);
	}
});

function toInt(item, key) {
	if (item[key]) {
		item[key] = +item[key];
	}
}
function toDate(item, key) {
	if (item[key]) {
		item[key] = new Date(+item[key].substr(6, 13));
	}
}
api.Queue = new Model('Queue', function(cb) {
	return function(err, list) {
		for (var i = 0; i < list.length; i++) {
			var item = list[i];
			toInt(item, 'ArrivalDelay');
			toInt(item, 'DepartureDelay');
			toInt(item, 'Track');
			toInt(item, 'TrainNumber');
			toInt(item, 'DestinationCountryCode');
			toDate(item, 'Generated');
			toDate(item, 'ScheduledDeparture');
			toDate(item, 'ScheduledArrival'); 
		}
		cb(err, list);
	}
});