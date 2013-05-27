exports.findAll = function(req, res) {
    res.send([{name:'restaurant1'}, {name:'restaurant2'}, {name:'restaurant3'}]);
};
 
exports.findById = function(req, res) {
    res.send({id:req.params.id, name: "Restaurant Name", description: "description"});
};