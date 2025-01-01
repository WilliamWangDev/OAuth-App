const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const userController = require("../controllers/userController");
const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = passport.use(localLogin);

// GitHub OAuth
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/github/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        // console.log("GitHub profile:", profile);

        // Attempt to find the user by GitHub ID
        let user = userController.getUserByGitHubId(profile.id);

        // If the user doesn't exist, create a new user record
        if (!user) {
          user = userController.createUser({
            githubId: profile.id, // Store GitHub ID separately from internal ID
            username: profile.username,
            name: profile.displayName,
            profileUrl: profile.profileUrl,
          });
        }

        // Pass the user object to `done` for session management
        return done(null, user);
      } catch (err) {
        return done(err); // Handle errors
      }
    }
  )
);

module.exports = passport.use(localLogin);
