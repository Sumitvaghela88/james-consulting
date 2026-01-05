const express = require("express");
const { registerUser, loginUser, getAllUsers } = require("../controllers/authcontroller");
const authMiddleware = require("../middleware/authmiddleware");


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", authMiddleware, getAllUsers);
// Example protected route
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ msg: "Welcome to your profile", userId: req.user });
});

module.exports = router;
