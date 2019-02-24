const router = require('express').Router();
const tradeController = require('../controller/tradeController');

// Commounrouter
commounRouter = (response,output) =>{
    response.status(output.statusCode).send({result:output})
    response.end()
}

// Erasing all the trades
router.delete('/erase',(request,response)=>{ tradeController.deleteAllTrades(request,(result)=> commounRouter(response,result))})

// Adding new trades
router.post('/trades',(request,response)=>{ tradeController.createTrade(request,(result)=> commounRouter(response,result))})

// Returning all the trades
router.get('/trades',(request,response)=>{ tradeController.getAllTrades(request,(result)=> commounRouter(response,result))})

// Returning the trade records filtered by the user ID
router.get('/trades/users/:userID',(request,response)=>{ tradeController.getTradesByUserid(request,(result)=> commounRouter(response,result))})

// Returning the trade records filtered by the stock symbol and trade type in the given date range
// sample URL : stocks/:stockSymbol/trades?type=:tradeType&start=:startDate&end=:endDate
router.get('/stocks/:stockSymbol/trades',(request,response)=>{ tradeController.getTradesByStockSymbol(request,(result)=> commounRouter(response,result))})

//Returning the highest and lowest price for the stock symbol in the given date range
// Sample URL :  /stocks/{stockSymbol}/price?start={startDate}&end={endDate}
router.get('/stocks/:stockSymbol/price',(request,response)=>{ tradeController.getTradesByprice(request,(result)=> commounRouter(response,result))})

module.exports = router;