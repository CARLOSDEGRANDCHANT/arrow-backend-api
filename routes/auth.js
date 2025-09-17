const express = require("express");
const { User } = require("../models");

const authRouter = express.Router();

// ==Routes==
// POST - User Signup
authRouter.post("/api/signup", async (req, res, next) => {
  try {
    // Grab values from the request
    const { name, email, phone, code, password } = req.body;

    // Write new user in DB
    const newUser = await User.create({
      name,
      email,
      phone,
      code,
      password,
    });

    // Send success response
    res.status(201).json({
      message: "Usuario registrado exitosamente.",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (e) {
    // Check is email already registered
    if (e.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        msg: "El correo electrónico ya está registrado.",
      });
    }
    // Validation errors
    if (e.name === "SequelizeValidationError") {
      const messages = e.errors.map((err) => err.message);
      return res.status(400).json({ msg: messages });
    }

    // Generic server error
    console.error(e);
    return res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = authRouter;
