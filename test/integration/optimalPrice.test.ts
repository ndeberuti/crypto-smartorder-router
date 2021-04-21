import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);
import axios from 'axios';

import app from '../../src/server/app';
import { DatabaseClient } from '../../src/clients/databaseClient';
import { Pair } from '../../src/interfaces/pair';
import { Side } from '../../src/interfaces/side';

const saveOrderStub = sinon.stub()
const getOrderStub = sinon.stub()
const dummyEthUsdtPair: Pair = Pair.EthUsdt;
const dummySellSide: Side = Side.Sell;

const databaseInstanceMock: DatabaseClient | any = {
  saveOrder: saveOrderStub,
  getOrder: getOrderStub
}

const dummyClientId = 'dummyClient';
const dummyOrderId = 'dummyOrderId';
const dummyPrice = '1000';

const dummyRequestBody = {
  "pair": dummyEthUsdtPair,
  "side": dummySellSide,
  "volume": "0.3"
};

describe('Integration tests: /optimal-price route ',  () => { 
  beforeEach(() => {
    sinon.restore();
  });

  afterEach(() => {
    sinon.restore();
    DatabaseClient.deleteInstance();
  });

  it('should return status code 200 and expected message when called', async () => { 
    sinon.stub(axios, 'request').resolves({status: 200, data: {data:[
      {
        askPx: dummyPrice
      }
    ]}});

    sinon.stub(DatabaseClient, 'getInstance').resolves(databaseInstanceMock);
    saveOrderStub.resolves(dummyOrderId);

    chai
    .request(app)
    .post('/optimal-price')
    .set('x-client-id', dummyClientId)
    .send(dummyRequestBody)
    .end((err, res) => {
      chai.expect(res).to.have.status(200);
      chai.expect(res.body).to.eql(
        {
        orderId: dummyOrderId,
        price: dummyPrice
      });
    })})
  }); 
