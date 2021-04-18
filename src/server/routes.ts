import express from 'express'
import * as healthController from '../server/controller/healthController'
import * as priceEstimationController from '../server/controller/priceEstimationController'
import * as swapOrderController from '../server/controller/swapOrderController'

export const bind = (app: express.Application): void => {
    app.get('/health', healthController.check)
    app.get('/prime-estimation', priceEstimationController.checkPrice)
    app.post('/swap-order', swapOrderController.swap)
}
