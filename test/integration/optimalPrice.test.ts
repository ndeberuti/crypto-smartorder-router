import * as sinon from 'sinon';
import nock from 'nock';
import 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';

import axios from 'axios';
import sql from "mssql";

chai.use(chaiHttp);

import app from '../../src/server/app';
import { DatabaseClient } from '../../src/clients/databaseClient';
import { Pair } from '../../src/interfaces/pair';
import { Side } from '../../src/interfaces/side';

const mockReq = sinon.stub()
const mockRes = sinon.stub();
const dummyPair: Pair = Pair.EthUsdt;
const dummySide: Side = Side.Sell;

const databaseInstanceMock: DatabaseClient | any = {
  saveOrder: async () => dummyOrderId,
  getOrder: async (orderId: string) => {
    return {
      pair: dummyPair ,
      side: dummySide,
      price: "1000",
      volume: "0.1",
    }
  }
}

const dummyClientId = 'dummyClient';
const dummyOrderId = 'dummyOrderId';

const dummyRequestBody = {
  "pair": "ETH-USDT",
  "side": "sell",
  "volume": "0.3"
};

const dummyResponse = {
  property: "value"
};

describe('Integration tests: /optimal-price route ',  () => { 
  beforeEach(() => {
  });
  afterEach(() => {
  });
    
  it('should return status code 200 and expected message when called', async () => { 
    sinon.stub(axios, 'request').resolves({status: 200, data: {data:[
      {
        askPx: 'dummyAskPrice'
      }
    ]}});

    sinon.stub(DatabaseClient, 'getInstance').resolves(databaseInstanceMock);
    // sinon.stub(DatabaseClient.prototype, 'saveOrder').resolves('saveOrderValue');
    // sinon.stub(DatabaseClient.prototype, 'getOrder').resolves({
    //   pair: dummyPair ,
    //   side: dummySide,
    //   price: "1000",
    //   volume: "0.1",
    // });

    await chai
    .request(app)
    .post('/optimal-price')
    .set('x-client-id', dummyClientId)
    // .send(dummyRequestBody)
    .end((err, res) => {
      chai.expect(res).to.have.status(201);
    })})
  }); 
