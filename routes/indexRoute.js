const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");


router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  // console.log(`User details are: ${req.user}`);
  res.render("dashboard", {
    user: req.user,
  });
});

// Function to retrieve all active sessions (dependent on session store)
async function getAllSessions(sessionStore) {
  return new Promise((resolve, reject) => {
    sessionStore.all((err, sessions) => {
      if (err) {
        return reject(err);
      }
      // Convert sessions object to an array for easier handling
      const sessionArray = Object.entries(sessions).map(([sessionId, sessionData]) => ({
        id: sessionId,
        userId: sessionData.passport?.user, // Assuming Passport.js stores user ID here
      }));
      resolve(sessionArray);
    });
  });
}

// Admin route to display all active sessions
router.get('/admin', isAdmin, async (req, res) => {
  try {
    const sessions = await getAllSessions(req.sessionStore); // Get all active sessions
    res.render('admin', { sessions, user: req.user });
  } catch (err) {
    console.error('Failed to retrieve sessions:', err);
    res.status(500).send('Could not retrieve sessions');
  }
});

router.post('/admin/revoke/:sessionId', isAdmin, async (req, res) => {
  const sessionId = req.params.sessionId;
  req.sessionStore.destroy(sessionId, (err) => {
    if (err) {
      res.status(500).send('Error revoking session');
    } else {
      res.redirect('/admin');
    }
  });
})

module.exports = router;
