const { Users } = require("../models/users.model");
const { Tasks } = require("../models/tasks.model");

const createUser = async function (req, res) {
  try {
    const { name, email, password } = req.body;
    const newUser = await Users.create({ name, email, password });
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

module.exports = { createUser, getUsers, updateUser, deleteUser };
