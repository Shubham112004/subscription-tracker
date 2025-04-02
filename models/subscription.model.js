import mongoose from "mongoose";

const subscriptionSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minLength: 2,
        maxLength: 100
    },

    price: {
        type: Number,
        required: [true, 'Subscription price is required'],
        minLength: [1, 'Price must be grater than 0']
    },

    currency: {
        type: String,
        enum: ['INR', 'USD', 'EUR '],
        default: 'INR',
    },

    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly']
    },

    category: {
        type: String,
        enum: ['sports', 'news', 'entertainment', 'lifestyle', 'technology', 'financce'],
        required: true
    },

    payment: {
        type: String,
        required: true,
        trim: true
    },

    status: {
        type: String,
        enum: ['active', 'cancled', 'expired'],
        default: 'active'
    },

    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (val) => val <= new Date(),
            message: 'Start date must be in the past'
        }
    },

    renewalDate: {
        type: Date,
        validate: {
            validator: function (val) { return val > this.startDate },
            message: 'Renewal date must be after the start date'
        }
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    }
}, { Timestamp: true })

//auto calculate the renewal date if missing
subscriptionSchema.pre('save', function (next) {
    if (!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        }
        this.renewalDate = new Date(this.startDate)
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency])
    }

    //auto update the status if renewal date has passed
    if (this.renewalDate < new Date()) {
        this.status = 'expired'
    }

    next()
})

const Subscriptions = mongoose.model('Subscriptions', subscriptionSchema)
export default Subscriptions