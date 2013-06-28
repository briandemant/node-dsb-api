var dsbApi = require('../');
   
dsbApi.Station.findOne({filter : "Name eq 'Odense'", select : 'UIC,Name,CountryName'}, function(err, odense) {
	console.log(odense); 
}); 