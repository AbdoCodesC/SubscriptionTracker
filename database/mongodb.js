import { mongoose } from 'mongoose'
import { NODE_ENV, DB_URI } from '../config/env.js'

if (!DB_URI)
  throw new Error(`Please define the MONGODB_URI env variable inside .env<${NODE_ENV}>.local`)

const connectToDB = async () => {
  try {
    await mongoose.connect(DB_URI)
    console.log(`Connected to database in ${NODE_ENV} mode`)
  } catch (error) {
    console.error('Error connecting to database: ', error)
    return
  }
}

export default connectToDB
