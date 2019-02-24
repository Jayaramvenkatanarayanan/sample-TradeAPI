require('dotenv').config();
//DB config
module.exports = {
    db: {
        url: process.env.prodServerHost+process.env.prodServerDB_NAME
      }
  };