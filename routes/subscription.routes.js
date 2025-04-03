import { Router } from 'express'
import authorize from '../middlewares/auth.middleware.js'
import { createSubscription, getUserSubscriptions } from '../controllers/subscription.controller.js'

const subscriptionRouter = Router()

subscriptionRouter.get('/', (req, res) => res.send({ title: 'GET all subscritptions' }))

subscriptionRouter.get('/:id', (req, res) => res.send({ title: 'GET subscritption details' }))

subscriptionRouter.post('/', authorize, createSubscription)

subscriptionRouter.put('/:id', (req, res) => res.send({ title: 'UPDATE subscritption' }))

subscriptionRouter.delete('/:id', (req, res) => res.send({ title: 'DELETE subscritption' }))

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions)

subscriptionRouter.put('/:id/cancle', (req, res) => res.send({ title: 'CANCLE subscritption' }))

subscriptionRouter.get('/upcomming-renewals', (req, res) => res.send({ title: 'GET upcomming renewals' }))

export default subscriptionRouter