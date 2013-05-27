var express = require('express'),
	restaurants = require('./routes/restaurants');
 
var app = express();
 
app.get('/restaurants',restaurants.findAll);
app.get('/restaurants/:id', restaurants.findById);

app.listen(3000);
console.log('Listening on port 3000...');