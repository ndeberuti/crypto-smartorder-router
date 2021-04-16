import express from 'express'
import * as healthController from '../controllers'

export const bind = (app: express.Application): void => {
    app.post('/health', healthController.check)
}
