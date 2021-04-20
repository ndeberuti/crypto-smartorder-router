import * as sinon from 'sinon';
import nock from 'nock';
import 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

import app from '../../src/server/app';


const mockReq = sinon.stub()
const mockRes = sinon.stub();
const mockNext = sinon.stub();

describe('Integration tests: /health route ',  () => { 
    
  it('should return status code 200 and expected message when called', async () => {
      chai
      .request(app)
      .get('/health')
      .end((err, res) => {
          chai.expect(res).to.have.status(200);
          chai.expect(res.body).to.eql({
            message: "OK"
            });
      });
    })
  }); 


