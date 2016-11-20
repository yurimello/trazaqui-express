function setup(app, controllers) {
  //Root path
  app.get('/', function(req, res){
    res.json({message: 'Express Hello'});
  })

  app.get('/api/places', controllers.places_controller.index);
  app.post('/api/places', controllers.places_controller.create);
  app.get('/api/places/:place_id', controllers.places_controller.show);
  app.put('/api/places/:place_id', controllers.places_controller.update);
  app.delete('/api/places/:place_id', controllers.places_controller.destroy);

}

exports.setup = setup;
