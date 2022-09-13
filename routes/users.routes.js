const express = require("express");

// Controllers
const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  login,
} = require("../controllers/users.controllers");

// Middlewares
const {
  createUserValidators,
} = require("../middlewares/validators.middleware");
const {protectedSession}=require('../middlewares/auth.middleware')
const { userExists } = require("../middlewares/users.middleware");

const usersRouter = express.Router();

usersRouter.get("/", getUsers);

usersRouter.post("/", createUserValidators, createUser);

usersRouter.patch("/",login)



usersRouter.patch("/:id", userExists,protectedSession, updateUser);

usersRouter.delete("/:id", userExists,protectedSession, deleteUser);

module.exports = { usersRouter };
