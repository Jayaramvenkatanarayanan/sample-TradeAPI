const http = require('http')
const serverPort = process.env.PORT || 8080
const express = require('express')
const app = express()
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')
swaggerDocument.host = process.env.host || swaggerDocument.host
console.log('swaggerDocument host', swaggerDocument.host)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

http.createServer(app).listen(serverPort, function () {
  console.log('Your server is listening on port %d (http://localhost:%d/api/v1)', serverPort, serverPort)
  console.log('Swagger-ui is available on http://localhost:%d/api-docs', serverPort)
})
