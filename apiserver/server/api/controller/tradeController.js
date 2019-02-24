// Importing validator & models

const validator = require('../validator/tradeValidator');
const momentTimeZone = require('moment-timezone');
const randomNumber = require('random-number');
const winston = require('winston');
const _ = require('lodash')
const {TradeModel} = require('../model/tradeModel')
/*
--This function use creating randomNumber
*/
var generateRandomNumber = randomNumber.generator({
    min: parseInt(process.env.randomNumberStart)
  , max:  parseInt(process.env.randomNumberEnd)
  , integer: true
  })

/*
--This function use creating Logger
*/

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: 'APIlogs.log' })
    ]
  });

/*
--This function use deleteAll trade
-- step 1: get the request and delete all trade records send the status code
*/

const deleteAllTrades=((input,callback)=>{
    let output ={}
    TradeModel.deleteMany().then((result)=>{
    if(result.ok === 1 || result.ok === true ){
        output.status = true;
        output.message = "All the trades was deleted";
        output.statusCode = parseInt(process.env.statusOk);
    }
    logger.info( '', { message: `Method : Delete All trades : time ${_.now()}  - All the trades was deleted` });
    callback(output)
    }).catch(err => console.log(err));
})


/*
--This function use creating trade
-- step 1: check the input using tradeValidator
-- step 2: after checking if any error comes callback the error
-- step 3: if no error insert the trade input into trade model and callback the results
*/
const createTrade = ((input, callback) => {
    let tradesID = generateRandomNumber();
    let userid =  generateRandomNumber();
    let newTrades = {
        id: input.body.id || tradesID,
        type: input.body.type,
        user:{
           id:input.body.user.id || userid,
           name: input.body.user.name
        },
        symbol: input.body.symbol,
        shares: input.body.shares,
        price: input.body.price,
        timestamp: input.body.timestamp || momentTimeZone
            .tz('America/Los_Angeles')
            .format('YYYY-MM-DD HH:mm:ss')
    }
    validator.createTradeValidator(newTrades, (error) => {
        if (error) {
            logger.info( '', { message: `Method : create trades - time: ${_.now()}  - createTradeValidator error` })
            callback(error)
        } else {
            let output = {}
            TradeModel
                .find({id: newTrades.id})
                .then((result) => {
                    if (result.length > 0) {
                        output.error = "Tradeid must be unique"
                        output.status = false
                        output.statusCode = parseInt(process.env.statusBadRequest)
                        logger.info( '', { message: `Method : create trades: time ${_.now()}  - result error` });
                        callback(output)
                    } else {
                        newTrades.totalprice = (newTrades.price * newTrades.shares)
                        userTrades = new TradeModel(newTrades)
                        userTrades
                            .save()
                            .then((userTradesResult) => {
                                if(userTradesResult){
                                    output.message ="Trade save successfully"
                                    output.status = true
                                    output.statusCode = parseInt(process.env.statusCreated)
                                    logger.info( '', { message: `Method : create trades time ${_.now()}  - success` });
                                    callback(output)
                                }else{
                                    output.error = userTradesResult
                                    output.status = false
                                    output.statusCode = parseInt(process.env.statusBadRequest)
                                    logger.info( '', { message: `Method : create trades time ${_.now()}  - error` });
                                    callback(output)
                                }
                            }).catch((err) => {
                                output.dberror = err.errmsg
                                output.error = "userid / tradeid must be unique "
                                output.status = false
                                output.statusCode = parseInt(process.env.statusBadRequest)
                                logger.info( '', { message: `Method : create trades time ${_.now()}   - catch error` });
                                callback(output)
                            });
                    }
                })
                .catch(err => console.log(err));
        }
    });
})

/* --This function use getAll trades with assending order
-- step 1: getall the trades from doc and callback the results
 */
const getAllTrades = ((input, callback) => {
    let output = {}
    TradeModel
        .find().sort('id')
        .then((trades) => {
            output.data = trades
            output.status = true
            output.message = "All the trades list"
            output.statusCode = parseInt(process.env.statusOk)
            logger.info( '', { message: `Method : getAllTrades - time ${_.now()}   - success` })
            callback(output)
        })
})

/* --This function use getAll trades with assending order with userID
-- step 1: getall the trades with userID from doc and callback the results
 */

const getTradesByUserid = ((input, callback) => {
    let output = {}
    TradeModel
        .find({
            'user.id': input.params.userID
        })
        .sort('id')
        .then((trades) => {
            if (trades.length > 0) {
                output.data = trades
                output.status = true
                output.message = "All the trades list using userId "
                output.statusCode = parseInt(process.env.statusOk)
                logger.info( '', { message: `Method : getTradesByUserid time ${_.now()}  - success` })
                callback(output)
            } else {
                output.data = []
                output.status = false
                output.statusCode = parseInt(process.env.statusNotFound)
                logger.info( '', { message: `Method : getTradesByUserid time ${_.now()}   - notfound` })
                callback(output)
            }
        })
})

/* --This function use getAll trades using StockSymbol with date range
-- step 1: getall the trades with StockSymbol.
-- step 2: give the date range from and to.
-- step 3: add optional condition for type
-- step 4: get the results and callback to router
 */
const getTradesByStockSymbol =((input, callback)=>{
    let output = {}
            TradeModel
                .find({
                     symbol: input.params.stockSymbol,
                     $or:[{timestamp:{$lte:input.query.start}},{timestamp:{$gte:input.query.end}},
                        {type:input.query.type}]
                })
                .then((trades) => {
                    if (trades.length > 0) {
                        output.data = trades
                        output.status = true
                        output.message = "All the trades list using stockSymbol "
                        output.statusCode = parseInt(process.env.statusOk)
                        logger.info( '', { message: `Method : getTradesByStockSymbol time ${_.now()}   - success` })
                        callback(output)
                    } else {
                        output.data = []
                        output.message = "There are no trades in the given date range"
                        output.status = false
                        output.statusCode = parseInt(process.env.statusNotFound)
                        logger.info( '', { message: `Method : getTradesByStockSymbol time ${_.now()}   - notfound` })
                        callback(output)
                    }
                })
})


/* --This function use getAll trades using StockSymbol with daterange and price
-- step 1: getall the trades with StockSymbol.
-- step 2: give the date range from and to.
-- step 3: add optional condition for type
-- step 4: get the results and callback to router
 */
const getTradesByprice =((input, callback)=>{
    let output = {}
            TradeModel
                .find({
                     symbol: input.params.stockSymbol,
                     timestamp: {
                        $gte: input.query.start,
                        $lt: input.query.end
                    }
                }).sort({price:'desc'})
                .then((trades) => {
                    if (trades.length > 0) {
                        output.data = trades
                        output.status = true
                        output.message = "All the trades list using stockSymbol "
                        output.statusCode = parseInt(process.env.statusOk)
                        logger.info( '', { message: `Method : getTradesByprice time ${_.now()}   - success` })
                        callback(output)
                    } else {
                        output.data = []
                        output.message = "There are no trades in the given date range"
                        output.status = false
                        output.statusCode = parseInt(process.env.statusNotFound)
                        logger.info( '', { message: `Method : getTradesByprice time ${_.now()}   - notfound` })
                        callback(output)
                    }
                })
})

module.exports = {
    createTrade,
    deleteAllTrades,
    getAllTrades,
    getTradesByUserid,
    getTradesByStockSymbol,
    getTradesByprice
}