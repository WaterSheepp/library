'use strict'

var express = require( "express" )
var md_auth = require( "../middleware/auth" )
var userController = require( "../controllers/userController" )

var api = express.Router()

api.post( '/login', userController.loginUser )
api.post( '/addUser', md_auth.ensureAuth, userController.addUser ) 
api.put( '/editUser/:_id', md_auth.ensureAuth, userController.editUser)
api.get( '/getUsers', userController.viewUser)
api.delete( '/deleteUser/:_id', userController.deleteUser)
api.put( '/borrowBook/:_id/:_id2', userController.borrowBookorMagazine)

module.exports = api