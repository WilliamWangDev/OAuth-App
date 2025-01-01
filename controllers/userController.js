const userModel = require("../models/userModel").userModel;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

// Find user by GitHub ID
const getUserByGitHubId = (githubId) => {
  const user = userModel.findByGitHubId(githubId); // New method in `userModel`
  return user || null;
};

// Add the createUser function
const createUser = (userData) => {
  return userModel.createUser(userData);
};

function isUserValid(user, password) {
  return user.password === password;
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  createUser,
  getUserByGitHubId
};
