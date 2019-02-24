require('dotenv').config();
//DB config
module.exports = {
    db: {
        url: process.env.testServerHost+process.env.testServerDB_NAME
      }
  };