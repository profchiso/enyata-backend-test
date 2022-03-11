const express = require('express');
const { getAllUser, getAuser, createUser, updateUser, deleteUser } = require("../controllers/user")
const { createUserValidation } = require("../utils/validate")

const userRouter = express.Router();

userRouter.get("/", getAllUser)
userRouter.get("/:id", getAuser)
userRouter.post("/", createUserValidation, createUser)
userRouter.patch("/:id", updateUser)
userRouter.delete("/:id", deleteUser)


module.exports = { userRouter };