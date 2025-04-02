import { Router } from 'express'

const subscriptionRouter = Router()

subscriptionRouter.get('/', (req, res) => res.send({ title: 'GET all subscritptions' }))

subscriptionRouter.get('/:id', (req, res) => res.send({ title: 'GET subscritption details' }))

subscriptionRouter.post('/', (req, res) => res.send({ title: 'CREATE subscritption' }))

subscriptionRouter.put('/:id', (req, res) => res.send({ title: 'UPDATE subscritption' }))

subscriptionRouter.delete('/:id', (req, res) => res.send({ title: 'DELETE subscritption' }))

subscriptionRouter.get('/user/:id', (req, res) => res.send({ title: 'GET all user subscritptions' }))

subscriptionRouter.put('/:id/cancle', (req, res) => res.send({ title: 'CANCLE subscritption' }))

subscriptionRouter.get('/upcomming-renewals', (req, res) => res.send({ title: 'GET upcomming renewals' }))

export default subscriptionRouter