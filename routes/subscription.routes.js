import { Router } from 'express'
import authorize from '../middlewares/auth.middleware.js'
import { createSubscription, getSubscription, getSubscriptions, getUserSubscriptions, updateSubscription } from '../controllers/subscription.controller.js'

const subscriptionRouter = Router()

subscriptionRouter.get('/', getSubscriptions)

subscriptionRouter.get('/:id', getSubscription)

subscriptionRouter.post('/', authorize, createSubscription)

subscriptionRouter.put('/:id', authorize, updateSubscription)

subscriptionRouter.delete('/:id', (req, res) => res.send({ title: 'DELETE subscritption' }))

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions)

subscriptionRouter.put('/:id/cancle', (req, res) => res.send({ title: 'CANCLE subscritption' }))

subscriptionRouter.get('/upcomming-renewals', (req, res) => res.send({ title: 'GET upcomming renewals' }))

export default subscriptionRouter