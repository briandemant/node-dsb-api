var dsbApi = require('../');
require('colors');

// showing of limit skip and filter
dsbApi.Station.find({filter : "Name ne 'Aarup'", limit : 100, skip : 300, orderBy : 'CountryName,Name'}, function(err, list) {
	console.log(list.length);
});

dsbApi.Station.find({filter : "indexof(tolower(Name), 'odense') gt -1", select : 'UIC,Name,CountryName'}, function(err, list) {
	console.log("Stations name Odense:".red);
	for (var i = 0; i < list.length; i++) {
		var queue = list[i];
		console.log(queue.Name);
	}
});

 