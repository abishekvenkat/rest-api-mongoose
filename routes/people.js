const express = require("express");
const people = require("../modules/people");
const router = express.Router();
const People = require('../modules/people')

//Get all people
router.get('/', async (req,res) => {
    try{
      const people = await People.find()
      res.json(people);  
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})
//Get one people
router.get('/:id', getPeople, (req,res) => {
  res.json(res.people);
})
//Create one people
router.post('/', async (req,res) => {
    const people = new People({
        name: req.body.name,
        age: req.body.age
    })
    try{
        const newPeople = await people.save();
        res.status(201).json(newPeople);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
})
//Update one people
router.patch('/:id', getPeople, async (req,res) => {
    if(req.body.name != null){
        res.people.name = req.body.name;
    }
    if(req.body.age != null){
        res.people.age = req.body.age;
    }
    try{
       const updatedPeople = await res.people.save()
       res.json(updatedPeople)
    } catch (err){
        res.status(400).json({message: err.message});
    }
})
//Delete one people
router.delete('/:id', getPeople, async (req,res) => {
    try{
        await res.people.remove();
        res.json({message: 'Deleted People'})
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})

async function getPeople(req, res, next){
    let people
    try{
        people = await People.findById(req.params.id);
        if (people == null){
            return res.status(404).json({message: 'Cannot find people'});
        }
    } catch (err) {
        res.status(500).json({message: err.message});
    }
    res.people = people
    next()
}
module.exports = router