import Subscription from '../models/subscription.model.js'
import { workflowClient } from '../config/upstach.js'
import { SERVER_URL } from '../config/env.js'

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    })

    await workflowClient.trigger({
      url: `${SERVER_URL || 'http://localhost:3000'}/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription.id,
      },
      headers: {
        'content-type': 'Application/json',
      },
      retries: 0,
    })
    res.status(201).json({ success: true, data: subscription })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
    next(error)
  }
}

export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error('You are not the owner of this account')
      error.statusCode = 401
      throw error
    }
    const subscriptions = await Subscription.find({ user: req.params.id })
    res.status(200).json({ success: true, data: subscriptions })
  } catch (error) {
    next(error)
  }
}
