const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber')

//getting all
router.get('/', async (req,res) =>{
    // res.send('hello')
    try{
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})

//getting one
router.get('/:id',getSubscriber,(req,res) =>{
   res.send(res.subscriber) 
})

//creating one
router.post('/',async (req,res) =>{
    const subscriber = new Subscriber({
        message: req.body.message,
    })
    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//updating one
router.patch('/:id',getSubscriber, async (req,res) =>{
    if(req.body.message != null){
        res.subscriber.message = req.body.message
    }
    if(req.body.subscribedToChannel != null){
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    }catch (err) {
        res.status(400).json({message: err.message})
    }
})

//delete one
router.delete('/:id',getSubscriber, async (req,res) =>{
    try {
        await res.subscriber.remove()
        res.json({message:'Deleted subscriber'})
    }catch (err){
        res.status(500).json({message: err.message})
    }
})

async function getSubscriber(req,res,next) {
    let subscriber
 try{
    subscriber = await Subscriber.findById(req.params.id)
    if(subscriber == null){
        return res.status(404).json({message:'cannot find'})
    }
 }catch(err){
    return res.status(500).json({message:err.message})
 }
 res.subscriber = subscriber
 next()
}

module.exports = router