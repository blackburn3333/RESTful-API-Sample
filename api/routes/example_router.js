const express = require('express');
const router = express.Router();


//example model
const ExampleSchema = require('../models/example_router');

router.get('/', (req, res, next) => {
    ExampleSchema.find().exec()
        .then(doc => {
            if (doc.length >= 1) {
                res.status(200).json(doc)
            } else {
                res.status(404).json({ message: "Empty result" })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

router.post('/', (req, res, next) => {
    const example = new ExampleSchema({
        example_column_one: req.body.example_column_one,
        example_column_two: req.body.example_column_two,
        example_column_three: req.body.example_column_three,
    });
    example.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Added Successfully',
                status: 'successful'
            });
        }).catch(err => { console.log(err); res.status(500).json({ error: err }) })
});

router.get('/:ID', (req, res, next) => {
    const ID = req.params.ID;
    ExampleSchema.findById(ID)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc)
            } else {
                res.status(404).json({ message: "Not Available" })
            }
        })
        .catch(err => { console.log(err); res.status(500).json({ error: err }) })
});

//send values inside of array []
//[
	//{"propName": "example_column_one",		"value": "ExampleData"},
	//{"propName": "example_column_two",		"value": "ExampleData"},
	//{"propName": "example_column_three",      "value": ExampleData"},
//]
router.patch('/:ID', (req, res, next) => {
    const ID = req.params.ID;
    const updateValues = {};
    for (const ops of req.body) {
        updateValues[ops.propName] = ops.value
    }
    ExampleSchema.update({ _id: ID }, { $set: updateValues })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({ result });
        })
        .catch(err => { console.log(err); res.status(500).json({ error: err }) })
});

router.delete('/:ID', (req, res, next) => {
    ExampleSchema.remove({
        _id: req.params.ID
    }).exec()
        .then(result => {
            res.status(200).json({
                message:"Delete successful"
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

module.exports = router;