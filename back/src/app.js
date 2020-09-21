'use strict'

var CORS = require('cors')

const express = require("express")
const app = express();
const bodyParser = require("body-parser")

var user_routes = require ( "./routes/userRoutes" )
var mb_routes = require ( "./routes/mbRoutes" )

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())


app.use(CORS())

app.use( '/api', user_routes, mb_routes )


module.exports = app;