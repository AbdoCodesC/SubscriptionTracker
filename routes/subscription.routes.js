import { Router } from 'express'

const subRouter = Router()

subRouter.get('/', (req, res) => res.send({ title: 'GET all subs' }))
subRouter.get('/:id', (req, res) => res.send({ title: 'GET sub' }))
subRouter.post('/', (req, res) => res.send({ title: 'CREATE new sub' }))
subRouter.patch('/:id', (req, res) => res.send({ title: 'UPDATE sub' }))
subRouter.patch('/:id', (req, res) => res.send({ title: 'UPDATE sub' }))
subRouter.delete('/:id', (req, res) => res.send({ title: 'DELETE sub' }))

subRouter.get('/user/:id', (req, res) => res.send({ title: 'GET all user subs' }))
subRouter.put('/:id/cancel', (req, res) => res.send({ title: 'CANCEL sub' }))
subRouter.get('/upcoming-renewals', (req, res) => res.send({ title: 'GET upcoming renewal' }))

export default subRouter
