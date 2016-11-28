process.env.ENV = 'test';

const Itinerary = require('../../app/models/itinerary');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();

chai.use(chaiHttp);

describe('ItinerariesController', () => {
  beforeEach((done) => { //Before each test we empty the database

      Itinerary.remove({}, (err) => {
         done();
      });
  });

  function postServer(path, params){
    return chai.request(server).post(path).send(params)
  }

  function putServer(path, params){
    return chai.request(server).put(path).send(params)
  }

  function getServer(path, params){
    request = chai.request(server).get(path)
    if(params)
      request.send(params)
    return request
  }

  describe('GET /api/itineraries', () => {
    let actionPath = '/api/itineraries'

    describe('GET all the itineraries', (done) => {
      it('status must be 200(ok)', (done) => {
        getServer(actionPath, null)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        })
      });

      it('response must to be an array', (done) => {
        getServer(actionPath, null)
        .end((err, res) => {
          res.body.should.be.a('array');
          done();
        })
      });

      it('itineraries array must be empty', (done) => {
        getServer(actionPath, null)
        .end((err, res) => {
          res.body.length.should.be.eql(0);
          done();
        })
      })
    });
  });

  describe('POST /api/itineraries', () => {
    let actionPath = '/api/itineraries'

    describe('without places field', () => {
      let itinerary = {};

      it('status must be 403(forbidden)', (done) => {
        postServer(actionPath, itinerary)
        .end((err, res) => {
          res.should.have.status(403);
          done();
        })
      });

      it('must respnse with an object', (done) => {
        postServer(actionPath, itinerary)
        .end((err, res) => {
          res.body.should.be.a('object');
          done();
        })
      });

      it('places field must to be required', (done) => {
        postServer(actionPath, itinerary)
        .end((err, res) => {
          res.body.errors.places.should.have.property('kind').eql('required');
          done();
        })
      })
    })

    describe('without places.0.name field', (done) => {
      let itinerary = {
        places: {}
      };

      it('status must be 403(forbidden)', (done) => {
        postServer(actionPath, itinerary)
        .end((err, res) => {
          res.should.have.status(403);
          done();
        })
      });

      it('must respnse with an object', (done) => {
        postServer(actionPath, itinerary)
        .end((err, res) => {
          res.body.should.be.a('object');
          done();
        })
      });

      it('places.0.name field must to be required', (done) => {
        postServer(actionPath, itinerary)
        .end((err, res) => {
          res.body.errors['places.0.name'].should.have.property('kind').eql('required');
          done();
        })
      })
    });

    describe('without places.0.items field', (done) => {
      let itinerary = {
        places: {name: 'Prezunic'}
      };

      it('status must be 403(forbidden)', (done) => {
        postServer(actionPath, itinerary)
        .end((err, res) => {
          res.should.have.status(403);
          done();
        })
      });

      it('must respnse with an object', (done) => {
        postServer(actionPath, itinerary)
        .end((err, res) => {
          res.body.should.be.a('object');
          done();
        })
      });

      it('places.0.items field must to be required', (done) => {
        postServer(actionPath, itinerary)
        .end((err, res) => {
          res.body.errors['places.0.items'].should.have.property('kind').eql('required');
          done();
        })
      })
    });

    describe('without places.0.items.0.name field', (done) => {
      let itinerary = {
        places: {
          name: 'prezunic',
          items: {}
        }
      };

      it('status must be 403(forbidden)', (done) => {
        postServer(actionPath, itinerary)
        .end((err, res) => {
          res.should.have.status(403);
          done();
        })
      });

      it('must respnse with an object', (done) => {
        postServer(actionPath, itinerary)
        .end((err, res) => {
          res.body.should.be.a('object');
          done();
        })
      });

      it('places.0.items.0.name field must to be required', (done) => {
        postServer(actionPath, itinerary)
        .end((err, res) => {
          res.body.errors['places.0.items.0.name'].should.have.property('kind').eql('required');
          done();
        })
      })
    });

    describe('with all required params', (done) => {
      let itinerary = {
        places: {
          name: 'prezunic',
          items: {
            name: '1kg de açucar'
          }
        }
      };

      it('status must be 200(ok)', (done) => {
        postServer(actionPath, itinerary)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        })
      });

      it('must respnse with an object', (done) => {
        postServer(actionPath, itinerary)
        .end((err, res) => {
          res.body.should.be.a('object');
          done();
        })
      });

      it('must response with success message', (done) => {
        postServer(actionPath, itinerary)
        .end((err, res) => {
          res.body.should.have.property('message').eql('Itinerary created!');
          done();
        })
      });
    });
  });

  describe('GET /api/itineraries/:itinerary_id', () => {

    function actionPath(itinerary){
      return '/api/itineraries/' + itinerary.id
    }

    describe('with correct id', () => {
      function itinerary(){
        let i = new Itinerary({
          places: [{
            name: 'Prezunic',
            items: [{
              name: '1kg de açucar',
            }]
          }]
        })
        return i
      }

      it('status must to be 200(ok)', (done) =>{
        itinerary().save((err, itinerary) => {
          getServer(actionPath(itinerary), itinerary)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          })
        })
      });

      it('response must to be an object', (done) =>{
        itinerary().save((err, itinerary) => {
          getServer(actionPath(itinerary), itinerary)
          .end((err, res) => {
            res.body.should.be.a('object');
            done();
          })
        })
      });

      it('response must have first place named equals to given itinerary', (done) =>{
        itinerary().save((err, itinerary) => {
          getServer(actionPath(itinerary), itinerary)
          .end((err, res) => {
            res.body.places[0].should.have.property('name').eql(itinerary.places[0].name);
            done();
          })
        })
      });

      it('response id must be equals to given itinerary', (done) =>{
        itinerary().save((err, itinerary) => {
          getServer(actionPath(itinerary), itinerary)
          .end((err, res) => {
            res.body.should.have.property('_id').eql(itinerary.id);
            done();
          })
        })
      });

      it('response must have place', (done) => {
        itinerary().save((err, itinerary) => {
          getServer(actionPath(itinerary), itinerary)
          .end((err, res) => {
            res.body.places[0].should.have.property('name').eql(itinerary.places[0].name);
            done();
          })
        })
      });

      it('response must have place item', (done) => {
        itinerary().save((err, itinerary) => {
          getServer(actionPath(itinerary), itinerary)
          .end((err, res) => {
            res.body.places[0].items[0].should.have.property('name').eql(itinerary.places[0].items[0].name);
            done();
          })
        })
      });
    })

    describe('with incorrect id', () =>{
      it('status must to be 404(not found)', (done) =>{
        getServer(actionPath('not_found'), {})
        .end((err, res) => {
          res.should.have.status(404);
          done();
        })
      });

      it('response must to be not found message', (done) =>{
        getServer(actionPath('not_found'), {})
        .end((err, res) => {
          res.body.should.have.property('message').eql('Itinerary not found')
          done();
        })
      });
    })
  });

  describe('PUT /api/itineraries/:itinerary_id', () => {

    function actionPath(itinerary){
      return '/api/itineraries/' + itinerary.id
    }

    function itinerary(){
      let i = new Itinerary({
        places: [{
          name: 'Prezunic',
          items: [{
            name: '1kg de açucar'
          }]
        }]
      })
      return i
    }

    describe('with all correct params', () => {

      let params = {
        places: [{
          name: 'SuperPrix',
          items: [{
            name: '3 garrafas de cerveja'
          }]
        }]
      }

      it('status must to be 200(ok)', (done) =>{
        itinerary().save((err, itinerary) => {
          putServer(actionPath(itinerary), params)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          })
        })
      });

      it('response must to be an object', (done) =>{
        itinerary().save((err, itinerary) => {
          putServer(actionPath(itinerary), params)
          .end((err, res) => {
            res.body.should.be.a('object');
            done();
          })
        })
      });

      it('changes places[0] name', (done) =>{
        itinerary().save((err, itinerary) => {
          putServer(actionPath(itinerary), params)
          .end((err, res) => {
            response_place = res.body.itinerary.places[0];
            old_name = itinerary.places[0].name
            new_name = params.places[0].name

            response_place.should.have.property('name').not.eql(old_name)
            response_place.should.have.property('name').eql(new_name)
            done();
          })
        })
      });

      it('changes places[0]items[0] name', (done) =>{
        itinerary().save((err, itinerary) => {
          putServer(actionPath(itinerary), params)
          .end((err, res) => {
            response_item = res.body.itinerary.places[0].items[0];
            old_name = itinerary.places[0].items[0].name
            new_name = params.places[0].items[0].name

            response_item.should.have.property('name').not.eql(old_name)
            response_item.should.have.property('name').eql(new_name)
            done();
          })
        })
      });


    })
  })
});
