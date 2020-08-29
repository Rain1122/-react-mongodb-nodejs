const mongoose = require('mongoose')

const subscriberSchema = new mongoose.Schema({
    message:{
        type: String,
        required: true
    },
    Date:{
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Subscriber', subscriberSchema)