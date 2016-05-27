'use strict';
const router = require('express').Router();
const User = require('mongoose').model('User');
module.exports = router;

// router.param('id', (req,res,next,id) => {
//     User.findById(id)
//     .then(user => {
//         req.requestedUser = user;
//         next();
//     })
//     .catch(next);
// })

// router.get('/:id?', (req, res) => {
//     res.json(req.requestedUser || req.user);
// })

router.get('/friends', (req, res, next) => {
    User.findById(req.user._id)
    .populate('friends')
    .then(user => {
        user.friends.forEach(friend => {
            delete friend.facebook;
            delete friend.friends;
        })
        return res.send(user.friends);
    })
    .catch(next)
});

router.put('/', (req, res, next) => {
    console.log("updating user:", req.user);
    req.user.set(req.body)
    console.log("user updated to:", req.user);
    req.user.save()
    .then(user => {
        return req.status(201).send(user)
    })
    .catch(next);
});
