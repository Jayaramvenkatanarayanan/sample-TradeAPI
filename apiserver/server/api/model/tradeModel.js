
// create tradeModelSchema
const mongoose = require('mongoose');

const tradeModelSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    user:{
        id: {
            type: Number,
            unique: true,
            require: true
           },
           name: {
              type: String,
              require: true,
              trim: true,
              minlength: 5,
              maxlength: 40
           }
    },
    symbol: {
        type: String,
        require: true,
        maxlength: 40
    },
    shares: {
        type: Number,
        require: true,
        min: 10,
        max: 30
    },
    price: {
        type: Number,
        require: true,
        min: 130.42,
        max: 195.65
    },
    totalprice:{
        type: Number,
    },
    timestamp: {
        type: Date
    },
    userTraid: {
        type: String,
        require: true
    },
    userid: {
        type: String,
        require: true
    },
    created_at: {
        type: Number
    },
    updated_at: {
        type: Number
    }
});

const TradeModel = mongoose.model('tradeTransaction', tradeModelSchema);

module.exports = {
    TradeModel
}