'use strict'

var BM = require('../models/bm');
const jwt = require('../services/jwt');

function addBOM(req, res) {

    var bom = new BM()
    var params = req.body
    
        bom.title = params.title
        bom.author = params.author
        bom.edition = params.edition
        bom.key_words = params.key_words
        bom.description = params.description
        bom.frequency = params.frequency
        bom.theme = params.theme
        bom.published = params.published
        bom.copies = params.copies
        bom.available = params.available
        bom.type = params.type

        if(params.title && params.author && params.edition) {

            BM.findOne({title: bom.title}, (err, foundTitle) => {
                console.log(foundTitle);
                if(err) return res.status(500).send({messsage: 'bad request'})
                if(foundTitle) {
                    return res.status(500).send({messsage: 'its already in the database'})
                }else{
                    bom.save((err, savedBom) => {
                        console.log(err);
                        if(err) return res.status(500).send({messsage: 'bad request'})
                        if(savedBom) {
                            res.status(200).send({messsage: 'success', book: savedBom})
                        }else{
                            res.status(400).send({messsage: 'unexpected'})
                        }
                    })
                }
            })

        }else{
             return res.status(404).send({messsage: 'missing data'});
        }
}

function viewOM(req, res) {

    var params = req.body
    var userId = req.params._id
    
    BM.find((err, b) => {

        if(!b) return res.status(404).send({messsage: 'we could not retrive the data'})
        if(err) return res.status(500).send({messsage: 'erros'})
        if(b) {

            return res.status(200).send({foundBoms: b})
        }
    })
}

function editBom(req, res) {

    var params = req.body
    var userId = req.params._id

    BM.findByIdAndUpdate(userId, params, {new: true}, (err, newData) => {

        if(err) return res.status(500).send({messsage: 'nad request'})
        if(!newData) return res.status(404).send({messsage: 'there was a n error while updating the user'})

        return res.status(200).send({newData})

    })
}

function deleteBom(req, res) {

    var userId = req.params._id

    BM.findByIdAndDelete(userId, (err, delBm) => {

        if(err) return res.status(500).send({messsage: 'bad request'})
        return res.status(200).send({messsage: 'entry has been deleted'})

    })

}


module.exports = {
    addBOM,
    viewOM,
    editBom,
    deleteBom
}


