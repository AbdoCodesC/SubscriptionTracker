import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { PORT } from './config/env.js'
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
import subRouter from './routes/subscription.routes.js'
import connectToDB from './database/mongodb.js'
import errorMiddleware from './middlewares/error.middleware.js'
import arcjetMiddleware from './middlewares/arcjet.middleware.js'
import workflowRouter from './routes/workflow.routes.js'

const app = express()
const port = PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(morgan('tiny'))
app.use(arcjetMiddleware)

// Routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscriptions', subRouter)
app.use('/api/v1/workflows', workflowRouter)

// Middleware
app.use(errorMiddleware)

app.get('*', (req, res) => {
  res.send({ title: 'Error' })
})

app.listen(port, async () => {
  console.log(`Subscription Tracker API running on http://localhost:${port}`)
  await connectToDB()
})

export default app
