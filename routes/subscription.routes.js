import { Router } from 'express'
import { createSubscription, getUserSubscriptions } from '../controllers/subscription.controller.js'
import authorize from '../middlewares/auth.middleware.js'

const subRouter = Router()

subRouter.get('/', (req, res) => res.send({ title: 'GET all subs' }))
subRouter.get('/:id', (req, res) => res.send({ title: 'GET sub' }))
subRouter.post('/', authorize, createSubscription)
subRouter.patch('/:id', (req, res) => res.send({ title: 'UPDATE sub' }))
subRouter.patch('/:id', (req, res) => res.send({ title: 'UPDATE sub' }))
subRouter.delete('/:id', (req, res) => res.send({ title: 'DELETE sub' }))

subRouter.get('/user/:id', authorize, getUserSubscriptions)
subRouter.put('/:id/cancel', (req, res) => res.send({ title: 'CANCEL sub' }))
subRouter.get('/upcoming-renewals', (req, res) => res.send({ title: 'GET upcoming renewal' }))

export default subRouter
