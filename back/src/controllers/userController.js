'use strict'

//imports
var bcrypt = require("bcrypt-nodejs")
var User = require('../models/user');
const jwt = require('../services/jwt');
var BModel = require('../models/bm');
const user = require("../models/user");

function createAdmin(req, res) {

    var user = new User()


    User.findOne({ user_name: 'admin' }, (err, users) => {
        if(err) return console.log('bad request');
        if(users) {
            return console.log('admin user already exists'); 
        }else {

            user.user_name = 'admin'
            user.password = 'admin'
            user.rol = 'admin'

            bcrypt.hash( user.password, null, null, (err, hash) => {
                user.password = hash
            })

            user.save()
            console.log('admin user created');
        }
    })
}

function loginUser(req, res) {


    var user = new User()
    var params = req.body

    if(params.user_name && params.password ){

        console.log(params);
        User.findOne({ user_name: params.user_name },(err,loginUs)=>{
        

            if(err) return res.status(500).send({message:'petition error'})
            if(loginUs){
                bcrypt.compare(params.password, loginUs.password,(err,check)=>{

                    if( check === false) {
                        return res.status(200).send({message: 'incorrect password'})
                    }else{

                        return res.status(200).send({
                            token:jwt.createToken(loginUs)
                        })
                    }
                })
            }else{
    
                return res.status(404).send({message:'bad credentials'})
            }
        })
    }
}

function addUser(req, res) {

    var user = new User()
    var params = req.body
    var userRol = req.user.rol

    if (userRol === 'admin') {

        user.user_name = params.user_name
        user.name = params.name
        user.sur_name = params.sur_name
        user.password = params.password
        user.carnet = params.carnet
        user.rol = params.rol

        if ( params.user_name &&  params.name &&  params.sur_name &&  params.password &&  params.carnet &&  params.rol) {

                console.log(params);
                User.find({ user: user.user_name }, (error, users) => {
                if(error) return res.status(400).send({ message: 'Bad Request' })
                if(users.length >= 1) {
                    return res.status(500).send({ message: 'El usuario ya existe.' })
                } else {
                    bcrypt.hash(params.password, null, null, (err, hash) =>{
                        user.password = hash;
    
                        user.save((error, userSave)=>{
                            if(error) res.status(400).send({ message: 'Bad Request' });
                            if(userSave) {
                                res.status(201).send({ message: 'Success', usuario: userSave })
                            } else {
                                res.status(400).send({ message: 'Unexpected Error' })
                            }
                        })  
                    })
                }
            })
        } else {
            res.status(400).send({ message: 'Missing Data' });
        }

    }else {
        return res.status(404).send({message: 'you dont have permission for this'})
    }


}

function editUser(req, res) {

    var params = req.body
    var userId = req.params._id

    User.findByIdAndUpdate(userId, params, {new: true}, (err, newData) => {
        console.log(userId);
        if(err) return res.status(500).send({message: 'bad request'});
        if(!newData) return res.status(404).send({message: 'there was an error while updating the user'})
        
                  
        return res.status(200).send({newData})
    });
}

function viewUser(req, res) {


    User.find( (err, n) =>{

        if(!n) return res.status(404).send({message: 'petition error'})
        if(err) return res.status(500).send({message: "error"})
        if(n){
            
            return res.status(200).send({foundUsers: n})
        }
    })
}

function deleteUser(req, res) {

    var userId = req.params._id

    User.findByIdAndDelete(userId, (err, delUser) => {
        if(err) return res.status(500).send({message: 'bad request'})
        return res.status(200).send({message: 'user has been deleted'})

    })
}

function borrowBookorMagazine(req, res) {

    var bookId = req.params._id
    var userId = req.params._id2

    BModel.findById(bookId, (err, found) => {
        console.log(err);
        if(err) return res.status(500).send({message: 'error petition'})
        if(found.available >= 1) {

            BModel.findByIdAndUpdate(bookId, { $inc: { available: -1 } }, (err, newData) => {
                if(err) return res.status(500).send({message: 'petition error'})
                var result = newData.title
                User.findByIdAndUpdate(userId, { $push: { borrowed: {borrow: result}}}, {new: true}, (err, updatedUser) => {
                    if(err) return res.status(500).send({message: 'error saving book title'})
                    if(!updatedUser) return res.status(404).send({message: 'not found'})
                    return res.status(200).send({message: updatedUser})
                })
            })
        } else{
            return res.status(404).send({message: 'there are no available copies'})
        }
    })
}

function returnBook(req, res) {

    
    

}
    
    module.exports = {
        createAdmin,
        loginUser,
        addUser,
        editUser,
        viewUser,

        deleteUser,
        borrowBookorMagazine
    }