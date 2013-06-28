var dsbApi = require('../');
   
dsbApi.Station.findOne({filter : "Name eq 'Odense'", select : 'UIC,Name,CountryName'}, function(err, odense) {
	console.log(odense); 
}); 
/*
$> node examples/one_station.js
{ __metadata: 
   { uri: 'http://traindata.dsb.dk/StationDeparture/opendataprotocol.svc/Station(\'8600512\')',
     type: 'ITogLogic.Model.Station' },
  Name: 'Odense',
  UIC: '8600512',
  CountryName: 'DK' }
*/
