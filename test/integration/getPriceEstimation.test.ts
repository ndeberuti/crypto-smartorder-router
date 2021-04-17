import { expect } from 'chai';
import * as sinon from 'sinon';
import * as express from 'express';

import { priceEstimationService } from '../../src/services/priceEstimationService';

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
    
      const result = await priceEstimationService();
     
      console.log(result); 
  }); 
});

