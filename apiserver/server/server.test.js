// Import All Testing

let chai = require('chai')
let chaiHttp = require('chai-http')
let expect = require('expect')
let should = chai.should()
const config = require('./enviroment/configuration');

let url = process.env.serverName + config.port

chai.use(chaiHttp)
const {TradeModel} = require('./api/model/tradeModel')

// Erasing all the trades
describe('Trede API Testing', () => {
  it('Erasing all the trades - method /erase', (done) => {
      chai.request(url)
      .delete('/erase')
      .end((err, response) => {
          expect(200)
          done()
        })
  })

// Adding new trades
  it('Adding new trades - method /trades', (done) => {
     let input={
      "symbol": "ASP.U",
      "user": {
        "id":200,
        "name": "asdadasd"
      },
      "type": "buy",
      "shares":12,
      "price": 150.42,
      "timestamp":"2019-06-07"
    }
      chai.request(url)
      .post('/erase')
      .send(input)
      .end((err, response) => {
          response.body.should.be.a('object')
          expect(200)
          done()
        })
  })

  // Returning the trade records filtered by the user ID
  it('Returning the trade records filtered by the user ID - /trades/users/:userID method', (done) => {
      chai.request(url)
      .get('/trades/users/'+200)
      .end((err, response) => {
          response.body.should.be.a('object')
          expect(200)
          done()
        })
  })

// Returning the trade records filtered by the stock symbol and trade type in the given date range
it('Returning the trade records filtered by the user ID - /stocks/:stockSymbol/trades method', (done) => {
  chai.request(url)
  .get('/stocks/'+'ASP.U'+'/trades?type=buy&start=2019-10-10&end=2019-10-10')
  .end((err, response) => {
      response.body.should.be.a('object')
      expect(200)
      done()
    })
})

//Returning the highest and lowest price for the stock symbol in the given date range
it('Returning the trade records filtered by the user ID - /stocks/:stockSymbol/price method', (done) => {
  chai.request(url)
  .get('/stocks/'+'ASP.U'+'/price?type=buy&start=2019-10-10&end=2019-10-10')
  .end((err, response) => {
      response.body.should.be.a('object')
      expect(200)
      done()
    })
})

// Returning all the trades
    it('Returning all the trades - /trades method', (done) => {
        chai.request(url)
        .get('/trades')
        .end((err, response) => {
            response.body.should.be.a('object')
            expect(200)
            done()
          })
    })
  })