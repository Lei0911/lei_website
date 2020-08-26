// const express = require("express");
// const mongoose = require("mongoose");
// const GuestUserSchema = require("../../models/GuestUser");

// const router = express.Router();

// router.post("/registerGuest", async (req, res) => {
//     const { username, password } = req.body;
//     let guestUser = {};
//     guestUser.username = username;
//     guestUser.password = password;
//     guestUser.createdAt = createdAt;
//     let guestUserModel = new GuestUserSchema(guestUser);
//     await guestUserModel.save();
//     res.json(guestUserModel);
// });

// module.exports = router;
