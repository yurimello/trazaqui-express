const Itinerary = require('../models/itinerary');

const ItinerariesController = function(){

  this.index = function(req, res){
    Itinerary.find(function(err, itineraries){
      if(err)
        res.send(err);

      res.json(itineraries);
    });
  };

  this.show = function(req, res){
    Itinerary.findById(req.params.itinerary_id, function(err, itinerary){
      if(err){
        res.status(404);
        res.send({message: 'Itinerary not found'})
      }
      res.json(itinerary);
    });
  };

  this.create = function(req, res){
    let itinerary = new Itinerary(req.body);

    itinerary.save(function (err) {
      if (err){
        res.status(403);
        res.send(err);
      }
      else {
        res.json({message: 'Itinerary created!', itinerary});
      }
    });
  };

  this.update = function(req, res){
    Itinerary.findById(req.params.itinerary_id, function(err, itinerary){
      if(err) res.send(err);
      Object.assign(itinerary, req.body).save((err, itinerary) => {
        if(err) res.send(err);
        res.json({ message: 'Itinerary updated!', itinerary });
      });
    });
  };

  this.destroy = function(req, res){
    Itinerary.remove({ _id: req.params.itinerary_id }, function(err, result) {
      if (err)
          res.send(err);

      res.json({ message: 'Itinerary deleted!', result });
    });
  };
}

module.exports = ItinerariesController;
