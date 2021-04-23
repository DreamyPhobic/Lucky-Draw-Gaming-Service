const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { token } = require('morgan');
const bcrypt = require("bcrypt");
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const checkAdminAuth = require('../middleware/check-admin-auth');
const checkUserAuth = require('../middleware/check-user-auth');


router.post("/signup", (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail exists"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            name: req.body.name,
                            password: hash
                        });
                        user
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "User created"
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        });
});

router.post("/login", (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            userId: user[0]._id,
                            name: user[0].name
                        },
                        process.env.JWT_USER_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token,
                        user: user[0]
                    });
                }
                res.status(401).json({
                    message: "Auth failed"
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.patch('/addTickets/:user_id', checkAdminAuth, (req, res, next) => {
    const id = req.params.user_id;
    const tickets = req.body.tickets;
    User.findByIdAndUpdate(id, { $inc: { tickets: tickets } }).exec().then(result => {
        res.status(200).json({
            message: 'Tickets have been added',
            result: result
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });


});
// router.post('/addUser',(req,res,next)=>{
//     const user = new User({
//         _id: new mongoose.Types.ObjectId(),
//         name: req.body.name,
//         tickets:req.body.tickets
//     })

//     user.save().then(result=>{
//         const token = jwt.sign({_id:user._id,name: user.name},process.env.JWT_USER_KEY,)
//         res.status(201).json({
//             message: 'User saved',
//             token:token,
//             result:result
//         })
//     }).catch(err=>{
//         console.log(err);
//         res.status(500).json({
//             error:err
//         })
//     });
// });

// router.get('/:user_id',(req,res,next)=>{

//     const id = req.params.user_id;

//     User.findById(id).exec().then(doc=>{
//         res.status(200).json(doc)
//     }).catch(err=>{
//         console.log(err)
//         res.status(500).json({
//             error:err
//         })
//     })
// });

module.exports = router;