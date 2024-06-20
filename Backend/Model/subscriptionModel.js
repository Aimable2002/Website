import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    expiration_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Subscription = new mongoose.model('Subscription', SubscriptionSchema)

export default Subscription
