process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const knex = require('../db/knex');

chai.use(chaiHttp);

describe('GET to /api/v1/projects', () => {
  beforeEach( done => {
    knex.migrate.rollback()
    .then(() => {
      knex.migrate.latest()
      .then(() => {
        return knex.seed.run()
        .then(() =>{
          done()
        })
      })
    })
  })

  it('should return all projects', done => {
    chai.request(server)
    .get('/api/v1/projects')
    .end((err, response) => {
      response.should.have.status(200);
      response.should.be.json;
      response.body.should.be.a('array');
      response.body.length.should.equal(1);
      response.body[0].should.have.property('project_name');
      response.body[0].project_name.should.equal('Party Time');
      response.body[0].should.have.property('id');
      response.body[0].id.should.equal(1);
    })
    done()
  })

  it('should return a 404 for a route that does not exist', done => {
    chai.request(server)
    .get('/sad')
    .end((err, response) => {
      response.should.have.status(404);
    })
    done()
  })
})

describe ('GET to /api/v1/palettes', () => {
  beforeEach( done => {
    knex.migrate.rollback()
    .then(() => {
      knex.migrate.latest()
      .then(() => {
        return knex.seed.run()
        .then(() =>{
          done()
        })
      })
    })
  })

  it('should return all palettes', done => {
    chai.request(server)
    .get('/api/v1/palettes')
    .end((err, response) => {
      response.should.have.status(200);
      response.should.be.json;
      response.body.should.be.a('array');
      response.body.length.should.equal(2);
      response.body[0].should.have.property('palette_name');
      response.body[0].palette_name.should.equal('best');
      response.body[0].should.have.property('color_1');
      response.body[0].color_1.should.equal('#30E8A7');
      response.body[0].should.have.property('color_2');
      response.body[0].color_2.should.equal('#FC68D1');
      response.body[0].should.have.property('color_3');
      response.body[0].color_3.should.equal('#A0CE39');
      response.body[0].should.have.property('color_4');
      response.body[0].color_4.should.equal('#D5E403');
      response.body[0].should.have.property('color_5');
      response.body[0].color_5.should.equal('#819ADD');
      response.body[0].should.have.property('project_id');
      response.body[0].project_id.should.equal(1);
      response.body[0].should.have.property('id');
      response.body[0].id.should.equal(1);
      response.body[1].should.have.property('palette_name');
      response.body[1].palette_name.should.equal('so good');
      response.body[1].should.have.property('color_1');
      response.body[1].color_1.should.equal('#30E8A7');
      response.body[1].should.have.property('color_2');
      response.body[1].color_2.should.equal('#FC68D1');
      response.body[1].should.have.property('color_3');
      response.body[1].color_3.should.equal('#A0CE39');
      response.body[1].should.have.property('color_4');
      response.body[1].color_4.should.equal('#D5E403');
      response.body[1].should.have.property('color_5');
      response.body[1].color_5.should.equal('#819ADD');
      response.body[1].should.have.property('project_id');
      response.body[1].project_id.should.equal(1);
      response.body[1].should.have.property('id');
      response.body[1].id.should.equal(2);
    })
    done();
  })

   it('should return a 404 for a route that does not exist', done => {
    chai.request(server)
    .get('/sad')
    .end((err, response) => {
      response.should.have.status(404);
    })
    done()
  })
})
