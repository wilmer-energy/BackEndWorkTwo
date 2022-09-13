const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const { Users } = require("../models/users.model");
const { Tasks } = require("../models/tasks.model");
dotenv.config({ path: "./config.env" });

const createUser = async function (req, res) {
  try {
    const { name, email, password } = req.body;
    salt = await bcrypt.genSalt(12);
    hashedPass = await bcrypt.hash(password, salt);

    const newUser = await Users.create({ name, email, password: hashedPass });
    newUser.password = undefined;

    res.status(202).json({
      status: "New user created",
      data: newUser,
    });
  } catch {
    return res.status(400).json({
      status: "Unable to create the user",
    });
  }
};

const getUsers = async function (req, res) {
  try {
    const allUsers = await Users.findAll({
      include: { model: Tasks },
      where: { status: "active" },
    });
    res.status(202).json({
      status: "Susscess",
      data: allUsers,
    });
  } catch {
    res.status(400).json({
      status: "Unable to find the users",
    });
  }
};

const updateUser = async function (req, res) {
  try {
    const { name, email } = req.body;
    const { user } = req;
    const userUpdated = await user.update({ name, email });
    userUpdated.password = undefined;
    res.status(202).json({
      status: "User updated",
      data: userUpdated,
    });
  } catch {}
};

const deleteUser = async function (req, res) {
  try {
    const { user } = req;
    const userDeleted = await user.update({ status: "inactive" });
    res.status(202).json({
      status: "Succses to delete the user",
      data: userDeleted,
    });
  } catch {}
};

const login = async (req, res) => {
  try {
    // Get email and password from req.body
    const { email, password } = req.body;

    // Validate if the user exist with given email
    const user = await Users.findOne({
      where: { email, status: "active" },
    });

    // Compare passwords (entered password vs db password)
    // If user doesn't exists or passwords doesn't match, send error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        status: "error",
        message: "Wrong credentials",
      });
    }

    // Remove password from response
    user.password = undefined;

    // Generate JWT (payload, secretOrPrivateKey, options)
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({
      status: "success",
      data: { user, token },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createUser, getUsers, updateUser, deleteUser, login };
