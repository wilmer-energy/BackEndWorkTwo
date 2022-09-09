
const express = require('express');

const tasksRouter = express.Router();

// Middlewares
/*
const { commentExists } = require('../middlewares/comments.middlewares');
*/
const {createTaskValidator}=require('../middlewares/validators.middleware')

tasksRouter.get('/',()=>{});

tasksRouter.post('/',createTaskValidator,()=>{});

tasksRouter.patch('/:id', ()=>{});

tasksRouter.delete('/:id', ()=>{});

module.exports = { tasksRouter };