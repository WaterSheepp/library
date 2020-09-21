'use strict'

var express = require( "express" )
var md_auth = require( "../middleware/auth" )
var mbController = require( "../controllers/mbController")

var api = express.Router()

api.post( '/addBM', mbController.addBOM)
api.get( '/getBOM', mbController.viewOM)
api.put( '/editBOM/:_id', mbController.editBom)
api.delete( '/deleteBOM/:_id', mbController.deleteBom)

module.exports = api
