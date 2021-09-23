const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/authenticate");

//registration
router.post(
   "/register",
   [
      check("name").notEmpty().withMessage("Name is required"),
      check("email").notEmpty().isEmail().withMessage("Enter a valid email address"),
      check("phone").notEmpty().isNumeric().isLength({ min: 10, max: 10 }).withMessage("Enter a valid email address"),
      check("password").notEmpty().isLength({ min: 6 }).withMessage("minimum password length must be at least 6 characters"),
      check("cpassword").custom(async (cpassword, { req }) => {
         const password = req.body.password;

         // If password and confirm password not same
         // don't allow to sign up and throw error
         if (password !== cpassword) {
            throw new Error("Passwords must be same");
         }
      }),
   ],
   async (req, res) => {
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }
      try {
         let { name, email, phone, password, cpassword } = req.body;
         let userEmail = await User.findOne({ email });
         let userPhone = await User.findOne({ phone });
         if (userEmail) {
            return res.status(400).json({ errors: [{ msg: "Email address is already exits" }] });
         } else if (password !== cpassword) {
            return res.status(400).json({ errors: [{ msg: "password is not matching with confirm password" }] });
         } else if (userPhone) {
            return res.status(400).json({ errors: [{ msg: "Phone number is already exits" }] });
         }
         let salt = await bcrypt.genSalt(10);
         password = await bcrypt.hash(password, salt);
         let isAdmin = false;
         let user = new User({ name, email, phone, password, isAdmin });
         let newUser = await user.save();
         res.status(200).json({
            result: "User is Created",
            user: newUser,
         });
         // let payload = {
         //    user: {
         //       id: newUser.id,
         //    },
         // };
         // jwt.sign(payload, process.env.JWT, (err, token) => {
         //    if (err) throw err;
         //    res.status(200).json({
         //       result: "success",
         //       token: token,
         //    });
         // });
      } catch (error) {
         console.error(error);
         res.status(500).json({ errors: error });
      }
   }
);

//login
router.post(
   "/login",
   [
      check("email").notEmpty().isEmail().withMessage("Enter a valid email address"),
      check("password").notEmpty().isLength({ min: 6 }).withMessage("Enter correct password"),
   ],
   async (req, res) => {
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }
      try {
         let { email, password } = req.body;
         let userEmail = await User.findOne({ email });

         if (!userEmail) {
            return res.status(401).json({ errors: [{ msg: "Invalid Credentials" }] });
         }

         let isMatch = await bcrypt.compare(password, userEmail.password);
         if (!isMatch) {
            return res.status(401).json({ errors: [{ msg: "Invalid Credentials" }] });
         }
         let payload = {
            user: {
               id: userEmail.id,
            },
         };
         jwt.sign(payload, process.env.JWT, (err, token) => {
            if (err) throw err;
            res.status(200).json({
               result: "success",
               token: token,
            });
         });
      } catch (error) {
         console.error(error);
         res.status(500).json({ errors: error });
      }
   }
);

// get a user information
router.get("/", auth, async (req, res) => {
   try {
      // @ts-ignore
      let user = await User.findById(req.user.id).select("-password");
      res.status(200).json(user);
   } catch (error) {
      res.status(500).json(error);
   }
});
module.exports = router;
