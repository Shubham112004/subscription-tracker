import Subscriptions from '../models/subscription.model.js'

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscriptions.create({
            ...req.body,
            user: req.user._id,
        })

        res.status(201).json({
            success: true,
            data: subscription
        })
    } catch (error) {
        next(error)
    }
}


export const getUserSubscriptions = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id) {
            const error = new Error('You are not owner of this account')
            error.status = 401
            throw error
        }

        const subscriptions = await Subscriptions.find({ user: req.params.id })

        res.status(200).json({
            success: true,
            data: subscriptions
        })
    } catch (error) {
        next(error)
    }
}