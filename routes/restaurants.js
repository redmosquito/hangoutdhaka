var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('restaurantdb', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'restaurantdb' database");
        db.collection('restaurants', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'restaurants' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});
 
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving restaurant data: ' + id);
    db.collection('restaurants', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};
 
exports.findAll = function(req, res) {
    db.collection('restaurants', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};
 
exports.addRestaurant = function(req, res) {
    var restaurant = req.body;
    console.log('Adding restaurants: ' + JSON.stringify(restaurant));
    db.collection('restaurants', function(err, collection) {
        collection.insert(restaurant, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}
 
exports.updateRestaurant = function(req, res) {
    var id = req.params.id;
    var restaurant = req.body;
    console.log('Updating restaurant: ' + id);
    console.log(JSON.stringify(restaurant));
    db.collection('restaurant', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, restaurant, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating restaurant: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(restaurant);
            }
        });
    });
}
 
exports.deleteRestaurant = function(req, res) {
    var id = req.params.id;
    console.log('Deleting restaurant: ' + id);
    db.collection('restaurants', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}
 
/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {
 
    var restaurants = [
    {
        name: "Izumi",
        year_started: "2011",
        cuisine: "Japanese",
        address: "Gulshan-2 Dhaka",
        master_chef: "Nakajimaya Masayuki",
        phone: "+8801762635083",
        description: "The aromas of fruit and spice...",
        picture: "saint_cosme.jpg"
    },
    {
        name: "Flambe",
        year_started: "2010",
        cuisine: "Tex-Mex",
        address: "Road 6 House 47 Dhanmandi",
        master_chef: "Joy Hasan",
        phone: "+880121233232",
        description: "The aromas of fruit and spice...",
        picture: "saint_cosme.jpg"
    }];
 
    db.collection('restaurants', function(err, collection) {
        collection.insert(restaurants, {safe:true}, function(err, result) {});
    });
 
};