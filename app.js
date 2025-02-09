import express from 'express'
import { PORT } from './config/env.js'
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
import subRouter from './routes/subscription.routes.js'

const app = express()
const port = PORT || 3001

app.get('/', (req, res) => {
  res.send('<h1>Welcome to Subscription Tracker Api</h1>')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscriptions', subRouter)

app.get('*', (req, res) => {
  res.send({ title: 'Error' })
})

app.listen(port, () => console.log(`Subscription Tracker Api running on http://localhost:${port}`))

export default app
