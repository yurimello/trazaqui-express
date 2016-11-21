process.env.ENV = 'test';

const Place = require('../../app/models/place');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Place', () => {
  beforeEach((done) => { //Before each test we empty the database

      Place.remove({}, (err) => {
         done();
      });
  });

  describe('/GET /api/places', () => {

    it('it should GET all the places', (done) => {
      chai.request(server)
        .get('/api/places')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('/POST /api/places', () => {
    it('it should not POST a place without name field', (done) => {
      let place = {};

      chai.request(server)
        .post('/api/places')
        .send(place)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('name');
          res.body.errors.name.should.have.property('kind').eql('required');
          done();
        })
    });

    it('it should POST a place', (done) => {
      let place = {
        name: 'Prezunic'
      };

      chai.request(server)
        .post('/api/places')
        .send(place)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Place created!');
          res.body.place.should.have.property('name');
          done();
        })
    });
  });

  describe('/GET/:place_id /api/places/:place_id', () => {
    it('it should GET a place by the given id', (done) => {
      let place = new Place({name: 'Prezunic'})

      place.save((err, place) => {
        chai.request(server)
          .get('/api/places/' + place.id)
          .send(place)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('_id').eql(place.id);
            done();
          })
      })
    });
  })

  describe('/PUT/:place_id /api/places/:place_id', () => {
    it('it should UPDATE a place given the id', (done) => {
      let place = new Place({name: 'Prezunic'});
      place.save((err, place) => {
        chai.request(server)
          .put('/api/places/' + place.id)
          .send({name: 'SuperPrix'})
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Place updated!');
            res.body.place.should.have.property('name').eql('SuperPrix');
            done();
          })
      })
    })
  })

  describe('/DELETE/:place_id /api/places/:place_id', () => {
    it('it should DELETE a place given the id', (done) => {
      let place = new Place({name: 'Prezunic'});
      place.save((err, place) => {
        chai.request(server)
          .delete('/api/places/' + place.id)
          .send({name: 'SuperPrix'})
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Place deleted!');
            res.body.result.should.have.property('ok').eql(1);
            res.body.result.should.have.property('n').eql(1);
            done();
          })
      })
    })
  })
});
