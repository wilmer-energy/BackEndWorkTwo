const { db, DataTypes } = require('../utils/database.util');

const Tasks = db.define('Tasks', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	title: {
		type: DataTypes.STRING,
	},
	limitDate: {
		type: DataTypes.DATE,
	},
    startDate: {
		type: DataTypes.DATE,
	},
    finishDate: {
		type: DataTypes.DATE,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active',
	},
});

module.exports = { Tasks };