import express from 'express'

export const check = async (req: express.Request, res: express.Response, 
    next: express.NextFunction) => {
    try {
        return res.status(200).json({status: 'OK'});
    } catch (error) {
        next(error)
    }
}
