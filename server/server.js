const express = require('express')
const jsonServer = require('json-server')
const app = express()
app.use(jsonServer.defaults(), jsonServer.router('db.json'))

module.exports = {
  path: '/api',
  handler: app
}
