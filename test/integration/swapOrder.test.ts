import * as sinon from 'sinon';
import 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import axios from 'axios';
chai.use(chaiHttp);

import app from '../../src/server/app';
import { Pair } from '../../src/interfaces/pair';
import { Side } from '../../src/interfaces/side';
import { Order } from '../../src/interfaces/order';
import { SwapOrder } from '../../src/interfaces/swapOrder';

const dummySwapOrderBuyEthUsdtWithNoType: SwapOrder = {
        pair: Pair.EthUsdt,
        side: Side.Buy,
        price: '1000',
        volume: '0.1',
};

const dummySwapOrderSellBtcUsdtWithLimitType: SwapOrder = {
    pair: Pair.BtcUsdt,
    side: Side.Sell,
    type: Order.Limit,
    price: '1000',
    volume: '0.1',
};

const dummySwapOrderSellBtcUsdtWithIoCType: SwapOrder = {
    pair: Pair.BtcUsdt,
    side: Side.Sell,
    type: Order.Ioc,
    price: '1000',
    volume: '0.1',
};

const dummyIocRequestBody = {
  "orderType": Order.Ioc
 };

describe('Integration tests: /swap-order route ',  () => { 
  beforeEach(() => {
    sinon.restore();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return status code 200 and expected message when executing a swap "Immediate or Cancel" order to buy ETH-USDT pair with no explicit type  ', async () => { 
   const axiosStubbed = sinon.stub(axios, 'request').resolves({status: 200, data: {}});
    
    const requestData = {
        instId: Pair.EthUsdt,
        tdMode: "cash",
        side: Side.Buy,
        ordType: Order.Ioc,
        px: "1000",
        sz: "0.1",
    };

    chai
    .request(app)
    .post(`/swap-order`)
    .send(dummySwapOrderBuyEthUsdtWithNoType)
    .end((err, res) => {
      chai.expect(res).to.have.status(200);
      chai.expect(res.body).to.eql({});
      chai.expect(JSON.stringify(axiosStubbed.args[0][0].data)).to.be.equal(JSON.stringify(requestData));
  })});

  it('should return status code 200 and expected message when executing a swap "Limit" order to sell BTC-USDT pair with explicit type Limit  ', async () => { 
    const axiosStubbed = sinon.stub(axios, 'request').resolves({status: 200, data: {}});
    
    const requestData = {
        instId: Pair.BtcUsdt,
        tdMode: "cash",
        side: Side.Sell,
        ordType: Order.Limit,
        px: "1000",
        sz: "0.1",
    };

    chai
    .request(app)
    .post(`/swap-order`)
    .send(dummySwapOrderSellBtcUsdtWithLimitType)
    .end((err, res) => {
      chai.expect(res).to.have.status(200);
      chai.expect(res.body).to.eql({});
      chai.expect(JSON.stringify(axiosStubbed.args[0][0].data)).to.be.equal(JSON.stringify(requestData));
  })});

  it('should return status code 200 and expected message when executing a swap "Immediate or Cancel" order to sell BTC-USDT pair with explicit type "IoC"  ', async () => { 
    const axiosStubbed = sinon.stub(axios, 'request').resolves({status: 200, data: {}});
    
    const requestData = {
        instId: Pair.BtcUsdt,
        tdMode: "cash",
        side: Side.Sell,
        ordType: Order.Ioc,
        px: "1000",
        sz: "0.1",
    };

    chai
    .request(app)
    .post(`/swap-order`)
    .send(dummySwapOrderSellBtcUsdtWithIoCType)
    .end((err, res) => {
      chai.expect(res).to.have.status(200);
      chai.expect(res.body).to.eql({});
      chai.expect(JSON.stringify(axiosStubbed.args[0][0].data)).to.be.equal(JSON.stringify(requestData));
  })});
      
}); 

