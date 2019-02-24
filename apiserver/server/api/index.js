// enable router and import tradeRouter
var router = require('express').Router();

// v1 - version one
router.use('/v1', require('./router/tradeRouter'));

// Export the routers
module.exports = router;