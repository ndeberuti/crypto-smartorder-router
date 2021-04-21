import * as sinon from 'sinon';
import 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';

import axios from 'axios';

chai.use(chaiHttp);

import app from '../../src/server/app';
import { DatabaseClient } from '../../src/clients/databaseClient';
import { Pair } from '../../src/interfaces/pair';
import { Side } from '../../src/interfaces/side';
import { Order } from '../../src/interfaces/order';

const saveOrderStub = sinon.stub()
const getOrderStub = sinon.stub()

const databaseInstanceMock: DatabaseClient | any = {
  saveOrder: saveOrderStub,
  getOrder: getOrderStub
}

const dummyOrderId = 'dummyOrderId';

const dummyLimitRequestBody = {
 "orderType": Order.Limit
};

const dummyIocRequestBody = {
  "orderType": Order.Ioc
};

describe('Integration tests: /apply-order route ',  () => { 
  beforeEach(() => {
    sinon.restore();
  });

  it('should return status code 200 and expected message when applying a sell limit order for ETH-USDT pair  ', async () => { 
    const axiosStubbed = sinon.stub(axios, 'request').resolves({status: 200, data: {}});
    
    const dbData = {
      pair: Pair.EthUsdt ,
      side: Side.Sell,
      price: "1000",
      volume: "0.1",
    };

    getOrderStub.resolves(dbData);

    const requestData = {
        instId: "ETH-USDT",
        tdMode: "cash",
        side: "sell",
        ordType: "limit",
        px: "1000",
        sz: "0.1",
    };

    sinon.stub(DatabaseClient, 'getInstance').resolves(databaseInstanceMock);

    chai
    .request(app)
    .post(`/apply-order/${dummyOrderId}`)
    .send(dummyLimitRequestBody)
    .end((err, res) => {
      chai.expect(res).to.have.status(200);
      chai.expect(res.body).to.eql({});
      chai.expect(JSON.stringify(axiosStubbed.args[0][0].data)).to.be.equal(JSON.stringify(requestData));
  })});

  
  it('should return status code 200 and expected message when applying a buy limit order for BTC-USDT pair  ', async () => { 
    const axiosStubbed = sinon.stub(axios, 'request').resolves({status: 200, data: {}});
    
    const dbData = {
      pair: Pair.BtcUsdt ,
      side: Side.Buy,
      price: "1000",
      volume: "0.1",
    };

    getOrderStub.resolves(dbData);

    const btcUsdtLimitBuyRequestData = {
        instId: Pair.BtcUsdt,
        tdMode: "cash",
        side: Side.Buy,
        ordType: Order.Limit,
        px: "1000",
        sz: "0.1",
    };

    sinon.stub(DatabaseClient, 'getInstance').resolves(databaseInstanceMock);

    chai
    .request(app)
    .post(`/apply-order/${dummyOrderId}`)
    .send(dummyLimitRequestBody)
    .end((err, res) => {
      chai.expect(res).to.have.status(200);
      chai.expect(res.body).to.eql({});
      chai.expect(JSON.stringify(axiosStubbed.args[0][0].data)).to.be.equal(JSON.stringify(btcUsdtLimitBuyRequestData));
    })});

    it('should return status code 200 and expected message when applying a sell "Immediate or Cancel" order for ETH-USDT pair  ', async () => { 
      const axiosStubbed = sinon.stub(axios, 'request').resolves({status: 200, data: {}});
      
      const dbData = {
        pair: Pair.EthUsdt ,
        side: Side.Sell,
        price: "1000",
        volume: "0.1",
      };
  
      getOrderStub.resolves(dbData);
  
      const requestData = {
          instId: Pair.EthUsdt,
          tdMode: "cash",
          side: Side.Sell,
          ordType: Order.Ioc,
          px: "1000",
          sz: "0.1",
      };
  
      sinon.stub(DatabaseClient, 'getInstance').resolves(databaseInstanceMock);
  
      chai
      .request(app)
      .post(`/apply-order/${dummyOrderId}`)
      .send(dummyIocRequestBody)
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.eql({});
        chai.expect(JSON.stringify(axiosStubbed.args[0][0].data)).to.be.equal(JSON.stringify(requestData));
    })});
  
    
    it('should return status code 200 and expected message when applying a buy "Immediate or Cancel" order for BTC-USDT pair  ', async () => { 
      const axiosStubbed = sinon.stub(axios, 'request').resolves({status: 200, data: {}});
      
      const dbData = {
        pair: Pair.BtcUsdt ,
        side: Side.Buy,
        price: "1000",
        volume: "0.1",
      };
  
      getOrderStub.resolves(dbData);
  
      const btcUsdtLimitBuyRequestData = {
          instId: Pair.BtcUsdt,
          tdMode: "cash",
          side: "buy",
          ordType: Order.Ioc,
          px: "1000",
          sz: "0.1",
      };
  
      sinon.stub(DatabaseClient, 'getInstance').resolves(databaseInstanceMock);
  
      chai
      .request(app)
      .post(`/apply-order/${dummyOrderId}`)
      .send(dummyIocRequestBody)
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.eql({});
        chai.expect(JSON.stringify(axiosStubbed.args[0][0].data)).to.be.equal(JSON.stringify(btcUsdtLimitBuyRequestData));
      })});

      
}); 

