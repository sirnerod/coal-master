const mongoose = require('mongoose');


const SeriesSchema = mongoose.Schema({
    series_id: String,
	name: String,
	units: String,
	f: String,
	unitsshort: String,
	description: String,
	copyright: String,
	source: String,
	iso3166: String,
	geography: String,
	start: String,
	end: String,
	data: Array
});

module.exports = mongoose.model('Series', SeriesSchema);