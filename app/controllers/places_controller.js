const Place = require('../models/place');

const PlacesController = function(){

  this.index = function(req, res){
    Place.find(function(err, places){
      if(err)
        res.send(err);

      res.json(places);
    });
  };

  this.show = function(req, res){
    Place.findById(req.params.place_id, function(err, place){
      if(err)
        res.send(err)

      res.json(place);
    });
  };

  this.create = function(req, res){
    let place = new Place();
    place.name = req.body.name;

    place.save(function (err) {
      if (err)
        console.log(err);

      res.json({message: 'Place created!'});
    });
  };

  this.update = function(req, res){
    Place.findById(req.params.place_id, function(err, place){
      if (err)
        res.send(err);

      place.name = req.body.name;

      place.save(function (err) {
        if (err) {
          console.log(err);
        } else {
          res.json({message: 'Place updated!'});
        }
      })
    });
  };

  this.destroy = function(req, res){
    Place.remove({ _id: req.params.place_id }, function(err, place) {
      if (err)
          res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
  };
}

module.exports = PlacesController;
