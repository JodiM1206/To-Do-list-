const express = require("express")
const router = express.Router()
const Item = require("../models/Item.js")

router 
.post ('/createItem', async (req, res) => {
    try {
        await Item.createItem(req.body, req.body.user_id)
        res.send("Item Created!")
    }
    catch (err) {
        res.status(401).send({ message: err.message })  
    }
})

.patch('/updateItem/:item_id', async (req,res) => {
    try {
        await Item.updateItem(req.params.item_id, req.body)
        res.send({ message: "Item updated!" })
    }
    catch (err) {
        res.status(401).send({ message: err.message })
    }
})

.patch('/completedItem/:item_id', async (req,res) => {
    try {
        await Item.completedItem(req.params.item_id, req.body.item_status)
        res.send({ message: "Item status updated!" })
    }
    catch (err) {
        res.status(401).send({ message: err.message })
    }
})

.delete('/deleteItem/:item_id', async (req, res) => {
    try {
        await Item.deleteItem(req.params.item_id)
        res.send({message: "Item deleted!"})
    }
    catch (err) {
        res.status(401).send({ message: err.message })
    }
})

.get('/getAllItems/:user_id', async (req, res) => {
    try{
        const items = await Item.getAllItems(req.params.user_id)
        res.send(items)
    }
    catch (err){
        res.status(401).send({message: err.message})
    }
})

module.exports = router