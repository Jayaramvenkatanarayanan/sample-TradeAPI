require('dotenv').config();
//DB config
module.exports = {
    db: {
      url: process.env.devServerHost+process.env.devServerDB_NAME
    }
  };