import { expect } from 'chai';
import * as sinon from 'sinon';
import * as express from 'express';
import config from 'config';

import * as healthController from '../../../src/server/controller'

const mockReq: express.Request | any =  sinon.stub();
const mockRes: express.Response | any = {
  status: sinon.stub().returns({
    json: sinon.stub().returns({
      status: 200,
      message: 'OK'
    }),
  }),
};
const mockNext: express.NextFunction | any = sinon.stub();

describe('First test', 
  () => { 
    it('should return expected response', async () => {
      const expectedResponse = {
        status: 200,
        message: 'OK'
      }
      const result = await healthController.check(mockReq, mockRes, mockNext);
     
      expect(result).to.equal(true); 
  }); 
});

