const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('GET to /api/v1/projects', () => {
  it('should return all projects', done => {
    chai.request(server)
    .get('/api/v1/students')
    .end((err, response) => {
      response.should.have.status(200);
    })
    done()
  })
})