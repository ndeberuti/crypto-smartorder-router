import express from 'express'
import * as healthController from '../server/controller/healthController'
import * as optimalPriceController from './controller/optimalPriceController'
import * as orderController from './controller/orderController'

export const bind = (app: express.Application): void => {
    // TODO use camelCase
    app.get('/health', healthController.check)
    app.post('/optimal-price', optimalPriceController.optimalPrice)
    app.post('/swap-order', orderController.swap)
    app.post('/apply-order/:id', orderController.apply)
}
