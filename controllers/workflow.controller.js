import { createRequire } from 'module'
import Subscriptions from '../models/subscription.model.js'
import dayjs from 'dayjs'
const require = createRequire(import.meta.url)
const { serve } = require('@upstash/workflow/express')

const REMINDERS = [7, 5, 3, 1]

export const sendReminders = serve(async (context) => {
    const { subscriptionId } = context.requestPayload
    const subscription = await fetchSubscription(context, subscriptionId)

    if (!subscription || subscription.status !== 'active') return

    const renewalDate = dayjs(subscription.renewalDate)

    if (renewalDate.isBefore(dayjs())) {
        console.log(`Renewal date has passed fro subscription ${subscriptionId}. Stopping workflow`);
        return
    }

    for (const daysBefore of REMINDERS) {
        const reminderDate = renewalDate.subtract(daysBefore, 'day')
        if (reminderDate.isAfter(dayjs())) {
            await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate)
        }
        await triggerReminder(context, `Reminder ${daysBefore} days before`)
    }
})

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', async () => {
        return Subscriptions.findById(subscriptionId).populate('user', 'name email')
    })
}

const sleepUntilReminder = async (context, label, date) => {
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate())
}

const triggerReminder = async (context, label) => {
    return await context.run(label, () => {
        console.log(`Triggering ${label} reminder`);
    })
}