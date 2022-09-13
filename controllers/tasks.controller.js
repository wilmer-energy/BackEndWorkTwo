const { Tasks } = require("../models/tasks.model");
const { Users } = require("../models/users.model");

const createTask = async function (req, res) {
  try {
    const { userId, title, limitDate, startDate } = req.body;
    console.log(userId);
    const newTask = await Tasks.create({ userId, title, limitDate, startDate });
    res.status(202).json({
      status: "success",
      data: newTask,
    });
  } catch {
    console.log("error");
  }
};
const getTask = async function (req, res) {
  try {
    const { status } = req.params;
    const task = await Tasks.findAll({
      include: { model: Users },
      where: { status },
    });
    res.status(202).json({
      status: "succsess",
      data: task,
    });
  } catch {
    console.log("error");
  }
};
const getAllTasks = async function (req, res) {
  try {
    const allTasks = await Tasks.findAll({
      include: { model: Users },
      where: { status: "active" },
    });
    res.status(202).json({
      status: "Sucsess",
      data: allTasks,
    });
  } catch {
    console.log("error getting the tasks");
  }
};
const updateTask = async function (req, res) {
  try {
    const { task } = req;
    const { finishDate } = req.body;

    let taskUpdated = await task.update({ finishDate });

    const { limitDate } = task;
    if (taskUpdated.finishDate > limitDate) {
      taskUpdated = await task.update({ status: "late" });
    } else {
      taskUpdated = await task.update({ status: "completed" });
    }
    res.status(202).json({
      status: "Success",
      data: taskUpdated,
    });
  } catch {
    console.log("error");
  }
};
const deleteTask = async function (req, res) {
  try {
    const { task } = req;
    const taskCancelled = await task.update({ status: "cancelled" });
    res.status(202).json({
      status: "Success",
      data: taskCancelled,
    });
  } catch {
    console.log("error");
  }
};

module.exports = { createTask, getTask, getAllTasks, updateTask, deleteTask };
