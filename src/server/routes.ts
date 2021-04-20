import express from 'express'
import * as healthController from '../server/controller/healthController'
import * as priceEstimationController from '../server/controller/priceEstimationController'
import * as swapOrderController from '../server/controller/swapOrderController'

export const bind = (app: express.Application): void => {
    app.get('/health', healthController.check)
    app.post('/price-estimation', priceEstimationController.optimalPrice)
    app.post('/swap-order', swapOrderController.swap)
    app.post('/apply-order/:id', swapOrderController.apply)
}
