import { createRequire } from 'module'
import Subscription from '../models/subscription.model.js'
import dayjs from 'dayjs'
const require = createRequire(import.meta.url)
const { serve } = require('@upstash/workflow/express')

const REMINDERS = [7, 5, 2, 1]

export const sendReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload
  console.log('ID -> ', subscriptionId)
  const { subscription } = await fetchSubscription(context, subscriptionId)
  if (!subscription || subscription.status !== 'active') return

  const renewalDate = dayjs(subscription.renewalDate)
  if (renewalDate.isBefore(dayjs())) {
    console.log(`Renewal date has passed for ${subscriptionId}. Stopping workflow`)
    return
  }

  for (const daysBefore of REMINDERS) {
    const remindersDate = renewalDate.subtract(daysBefore, 'day')

    if (remindersDate.isAfter(dayjs())) {
      await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, remindersDate)
    }

    await triggerReminder(context, `Reminder ${daysBefore} days before`)
  }
})

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run('get subscription', async () => {
    return await Subscription.findById(subscriptionId).populate('user', 'name email')
  })
}

const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping until ${label} reminder at ${date}`)
  return await context.sleepUntil(label, date.toDate())
}

const triggerReminder = async (context, label) => {
  return await context.run(label, () => {
    console.log(`Triggering ${label} reminder`)
    // send email, sms, push noti, etc..
  })
}
