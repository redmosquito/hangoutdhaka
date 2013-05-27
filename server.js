var express = require('express'),
    restaurant = require('./routes/restaurants');
 
var app = express();

app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});
 
app.get('/restaurants', restaurant.findAll);
app.get('/restaurants/:id', restaurant.findById);
app.post('/restaurants', restaurant.addRestaurant);
app.put('/restaurants/:id', restaurant.updateRestaurant);
app.delete('/restaurants/:id', restaurant.deleteRestaurant);
 
app.listen(3000);
console.log('Listening on port 3000...');