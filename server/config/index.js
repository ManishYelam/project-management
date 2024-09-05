const sequelize = require('../config/database');
const Project = require('../models/Project');
const User = require('../models/User');

// Define associations

sequelize.sync();
// sequelize.drop();

module.exports = {
  sequelize,
  User,
  Project,
};
