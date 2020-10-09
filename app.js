const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require('body-parser');
require ('dotenv/config');

// Middlewares
const seriesRoute = require('./routes/series');
app.use(bodyParser.json());
app.use('/series', seriesRoute);

//routes
app.get('/',(req,res)=>{
	res.send("fffff");
});

// DB
mongoose.connect(process.env.DB_CONNECTION,
	{useNewUrlParser: true, useUnifiedTopology: true}, ()=>{
		console.log("CONNECTED TO DB");
	});

app.listen(3000);
