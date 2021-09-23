const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/alluser", async (request, response) => {
   try {
      let users = await User.find();
      response.status(200).json(users);
   } catch (err) {
      console.error(err);
      response.status(500).json({
         msg: err.message,
      });
   }
});

router.get("/alluser/:id", async (request, response) => {
   try {
      let userId = request.params.id;
      let user = await User.findById(userId);
      response.status(200).json(user);
   } catch (err) {
      console.error(err);
      response.status(500).json({
         msg: err.message,
      });
   }
});

router.put("/alluser/:id", async (request, response) => {
   let userId = request.params.id;
   try {
      let updatedUser = {
         name: request.body.name,
         image: request.body.image,
         price: request.body.price,
         qty: request.body.qty,
         info: request.body.info,
      };
      // user is exists or not
      let user = await User.findById(userId);
      if (!user) {
         return response.status(401).json({
            msg: "No User Found",
         });
      }
      // update
      user = await User.findByIdAndUpdate(
         userId,
         {
            $set: updatedUser,
         },
         { new: true }
      );
      response.status(200).json({
         result: "User is Updated",
         user: user,
      });
   } catch (err) {
      console.error(err);
      response.status(500).json({
         msg: err.message,
      });
   }
});

router.delete("/alluser/:id", async (request, response) => {
   try {
      let userId = request.params.id;
      // user is exists or not
      let user = await User.findById(userId);
      if (!user) {
         return response.status(401).json({
            msg: "No user Found",
         });
      }
      //delete
      user = await User.findByIdAndDelete(userId);
      response.status(200).json({
         result: "user is Deleted",
         user: user,
      });
   } catch (err) {
      console.error(err);
      response.status(500).json({
         msg: err.message,
      });
   }
});

module.exports = router;
