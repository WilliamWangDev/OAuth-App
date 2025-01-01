const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

router.post(
  // Submitting the login form, we use post method
  "/login",
  passport.authenticate("local", {
    // successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
  }),
  (req, res) => {
    if (req.user.role === "admin") {
      res.redirect("/admin");
    } else {
      res.redirect("/dashboard");
    }
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  function (req, res) {
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  }
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    console.log("Session details are:", req.session);
    res.redirect("/dashboard");
  }
);

module.exports = router;