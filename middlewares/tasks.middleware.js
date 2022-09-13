// Models
const { Tasks } = require("../models/tasks.model");

const taskExist = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Tasks.findOne({ where: { id } });

    // If user doesn't exist, send error message
    if (!task) {
      return res.status(404).json({
        status: "error",
        message: "Task not found",
      });
    }
    req.task = task;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  taskExist,
};
