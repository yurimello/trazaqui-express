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
    let place = new Place(req.body);

    place.save(function (err) {
      if (err)
        return res.send(err);

      res.json({message: 'Place created!', place});
    });
  };

  this.update = function(req, res){
    Place.findById(req.params.place_id, function(err, place){
      if(err) res.send(err);
      Object.assign(place, req.body).save((err, place) => {
        if(err) res.send(err);
        res.json({ message: 'Place updated!', place });
      });
    });
  };

  this.destroy = function(req, res){
    Place.remove({ _id: req.params.place_id }, function(err, result) {
      if (err)
          res.send(err);

      res.json({ message: 'Place deleted!', result });
    });
  };
}

module.exports = PlacesController;
