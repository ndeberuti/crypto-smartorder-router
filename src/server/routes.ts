import express from 'express'
import * as healthController from './controller'
import * as priceEstimationController from './controller'

export const bind = (app: express.Application): void => {
    app.get('/health', healthController.check)
    app.get('/prime-estimation', priceEstimationController.checkPrice)
}
