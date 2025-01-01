const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: "admin",
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: "user",
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role: "user",
  },
];

const userModel = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
  findByGitHubId: (githubId) => {
    return database.find((user) => user.githubId === githubId) || null;
  },
  createUser: (userData) => {
    // Generate a new unique ID
    const newId = database.length ? database[database.length - 1].id + 1 : 1;
    const newUser = { id: newId, ...userData };
    database.push(newUser);
    console.log("Updated database:", database);
    return newUser;
  },
};

module.exports = { database, userModel };
