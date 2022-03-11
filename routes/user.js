const express = require('express');
const { getSingleUser, getAuser, createUser, updateUser, deleteUser } = require("../controllers/user")
const { createUserValidation, getUserValidation } = require("../utils/validate")

const userRouter = express.Router();

userRouter.get("/", getUserValidation, getSingleUser)
    // userRouter.get("/:id", getAuser)
userRouter.post("/", createUserValidation, createUser)
userRouter.patch("/:id", updateUser)
userRouter.delete("/:id", deleteUser)


module.exports = { userRouter };