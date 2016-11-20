const Place = require('../models/place');

module.exports.controller = function(app) {
  let router = app._router;

  router.route('/places')
    .get(function(req, res){
      Place.find(function(err, places){
        if(err)
          res.send(err);

        res.json(places);
      })
    })

    .post(function(req, res){
      let place = new Place(); // create a new instance of place model

      place.name = req.body.name; // set place name from request

      place.save(function (err) {
        if (err) {
          console.log(err);
        } else {
          res.json({message: 'Place created!'});
        }
      });
    })

  router.route('/places/:place_id')

    .get(function(req, res){
      Place.findById(req.params.place_id, function(err, place){
        if(err)
          res.send(err)

        res.json(place);
      })
    })

    .put(function(req, res){
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
      })
    })

    .delete(function(req, res){
      Place.remove({ _id: req.params.place_id }, function(err, place) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
      });
    })
}
