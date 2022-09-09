const express = require('express');

// Controllers
const {createUser,getUsers}=require('../controllers/users.controllers')

// Middlewares
const {createUserValidators}=require('../middlewares/validators.middleware')
const {userExists}=require('../middlewares/users.middleware')

const usersRouter = express.Router();


usersRouter.get('/',getUsers);

usersRouter.post('/',createUserValidators,createUser)

usersRouter.patch('/:id',userExists, ()=>{});

usersRouter.delete('/:id',userExists, ()=>{});

module.exports = { usersRouter };