function setup(app, controllers) {
  //Root path
  app.get('/', function(req, res){
    res.json({message: 'Express Hello'});
  })

  app.get('/api/itineraries', controllers.itineraries_controller.index);
  app.post('/api/itineraries', controllers.itineraries_controller.create);
  app.get('/api/itineraries/:itinerary_id', controllers.itineraries_controller.show);
  app.put('/api/itineraries/:itinerary_id', controllers.itineraries_controller.update);
  app.delete('/api/itineraries/:itinerary_id', controllers.itineraries_controller.destroy);

}

exports.setup = setup;
