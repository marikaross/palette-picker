process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('GET to /api/v1/projects', () => {
  it('should return all projects', done => {
    chai.request(server)
    .get('/api/v1/projects')
    .end((err, response) => {
      response.should.have.status(200);
      response.should.be.json;
      response.body.should.be.a('array');
      response.body.length.should.equal(1);
      response.body[0].should.have.property(project_name);
      response.body[0].project_name.should.equal('Party Time');
      response.body[0].should.have.property('id');
      response.body[0].id.should.equal(1);
    })
    done()
  })
})

describe ('GET to /api/v1/palettes' () => {
  it('should return all palettes', done => {
    done()
  })
})