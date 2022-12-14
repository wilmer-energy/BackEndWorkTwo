// Models
const { Users } = require("./users.model");
const { Tasks } = require("./tasks.model");

const initModels = () => {
  // 1 User <----> M Tasks
  Users.hasMany(Tasks, { foreignKey: "userId" });
  Tasks.belongsTo(Users);
};

module.exports = { initModels };
