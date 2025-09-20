const express = require("express");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
      const messages = e.errors.map((err) => {
        // Check if the error is for the 'notNull' validation
        if (err.validatorKey === 'is_null' && err.path === 'password') {
        return "La contraseña no puede estar vacía.";
      }
      return err.message;
    });


      return res.status(400).json({ msg: messages });
    }
    // Generic server error
    console.error(e);
    return res.status(500).json({ msg: "Internal server error" });
  };
});


  // POST - User Signin
  authRouter.post("/api/signin", async (req, res, next) => {
    try {
      // Grabing contents from request
      const { email, password } = req.body;
      // Trying to find an existing user
      const findUser = await User.findOne({ where: { email } });

      // Case 0 - User not found
      if (!findUser) {
        return res
          .status(400)
          .json({ msg: "No existe un usuario con estas credenciales." });
        // Case 1 - User found -> Validating password
      } else {
        const validCreds = await bcrypt.compare(password, findUser.password);

        if (!validCreds) {
          return res.status(400).json({ msg: "La contraseña es incorrecta." });
        } else {
          // Password is correct -> Assigning web token
          const token = jwt.sign(
            { id: findUser.id },
            process.env.JWT_SECRET || "passwordKey",
            { expiresIn: "1h" }
          );

          const userData = findUser.toJSON();
          const { password: _password, ...userWithoutPassword } = userData;

          return res.status(200).json({
            message: "Inicio de sesión exitoso.",
            token,
            user: userWithoutPassword,
          });
        }
      }
    } catch (e) {
      console.error(e);
      return res.status(500).json({ msg: "Error del servidor" });
    }
});

module.exports = authRouter;
