process.env.ENV = 'test';

const Itinerary = require('../../app/models/itinerary');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Itinerary', () => {
  beforeEach((done) => { //Before each test we empty the database

      Itinerary.remove({}, (err) => {
         done();
      });
  });

  function postServer(path, params){
    return chai.request(server).post(path).send(params)
  }

  function getServer(path, params){
    request = chai.request(server).get(path)
    if(params)
      request.send(params)
    return request
  }

  describe('/GET /api/itineraries', () => {
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

  describe('/POST /api/itineraries', () => {
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

  // describe('/GET/:itinerary_id /api/itineraries/:itinerary_id', () => {
  //   it('it should GET a itinerary by the given id', (done) => {
  //     let itinerary = new Itinerary({name: 'Prezunic'})
  //
  //     itinerary.save((err, itinerary) => {
  //       chai.request(server)
  //         .get('/api/itineraries/' + itinerary.id)
  //         .send(itinerary)
  //         .end((err, res) => {
  //           res.should.have.status(200);
  //           res.body.should.be.a('object');
  //           res.body.should.have.property('name');
  //           res.body.should.have.property('_id').eql(itinerary.id);
  //           done();
  //         })
  //     })
  //   });
  // })
  //
  // describe('/PUT/:itinerary_id /api/itineraries/:itinerary_id', () => {
  //   it('it should UPDATE a itinerary given the id', (done) => {
  //     let itinerary = new Itinerary({name: 'Prezunic'});
  //     itinerary.save((err, itinerary) => {
  //       chai.request(server)
  //         .put('/api/itineraries/' + itinerary.id)
  //         .send({name: 'SuperPrix'})
  //         .end((err, res) => {
  //           res.should.have.status(200);
  //           res.body.should.be.a('object');
  //           res.body.should.have.property('message').eql('Itinerary updated!');
  //           res.body.itinerary.should.have.property('name').eql('SuperPrix');
  //           done();
  //         })
  //     })
  //   })
  // })
  //
  // describe('/DELETE/:itinerary_id /api/itineraries/:itinerary_id', () => {
  //   it('it should DELETE a itinerary given the id', (done) => {
  //     let itinerary = new Itinerary({name: 'Prezunic'});
  //     itinerary.save((err, itinerary) => {
  //       chai.request(server)
  //         .delete('/api/itineraries/' + itinerary.id)
  //         .send({name: 'SuperPrix'})
  //         .end((err, res) => {
  //           res.should.have.status(200);
  //           res.body.should.be.a('object');
  //           res.body.should.have.property('message').eql('Itinerary deleted!');
  //           res.body.result.should.have.property('ok').eql(1);
  //           res.body.result.should.have.property('n').eql(1);
  //           done();
  //         })
  //     })
  //   })
  // })
});
