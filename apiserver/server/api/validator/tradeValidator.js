
//Trade validator
const createTradeValidator = ((input, callback) => {
    let output = {}
    if ((input.type ==! 'buy') || (input.type  ==! 'sell')) {
        output.error = "The trade type either buy or sell ";
        output.status = false;
        output.statusCode = parseInt(process.env.statusBadRequest)
        callback(output)
    }else if((input.price <= parseInt(process.env.shareStartPrice)) || (input.price >= parseInt(process.env.shareEndPrice))){
        output.error = `The stock price is between ${process.env.shareStartPrice} and ${process.env.shareStartPrice} only`;
        output.status = false;
        output.statusCode = parseInt(process.env.statusBadRequest)
        callback(output)
    }else if((input.shares <= parseInt(process.env.shareState)) || (input.shares >= parseInt(process.env.shareEnd))){
        output.error = `The shares limits  between ${(parseInt(process.env.shareState)+1)} and ${(parseInt(process.env.shareEnd)-1)} only`;
        output.status = false;
        output.statusCode = parseInt(process.env.statusBadRequest)
        callback(output)
    }else{
        callback()
    }

})

module.exports = {
    createTradeValidator
}