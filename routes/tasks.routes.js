const express = require("express");

const tasksRouter = express.Router();

//Controllers
const {
  createTask,
  getTask,
  getAllTasks,
  updateTask,
  deleteTask,
} = require("../controllers/tasks.controller");

// Middlewares
const { taskExist } = require("../middlewares/tasks.middleware");
const { createTaskValidator } = require("../middlewares/validators.middleware");

tasksRouter.get("/", getAllTasks);

tasksRouter.post("/", createTaskValidator, createTask);

tasksRouter.get("/:status", getTask);

tasksRouter.patch("/:id", taskExist, updateTask);

tasksRouter.delete("/:id", taskExist, deleteTask);

module.exports = { tasksRouter };
