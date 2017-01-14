'use strict'

const express = require('express')
const port = process.env.PORT || 8080;
const app = express();
const server = require('http').Server(app);
const path = require('path');

app.use(express.static(path.resolve(__dirname, 'build')))

server.listen(port, function() {
  console.log('Example app listening on port ' + port)
})
