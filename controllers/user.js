const { validationResult } = require('express-validator');
const { hashUserPassword } = require("../utils/passwordHashing")
const db = require("../models/index")

exports.getAllUser = async(req, res) => {}
exports.getAuser = async(req, res) => {}
exports.createUser = async(req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, password } = req.body
            //HASH USER PASSWORD
        let hashedPassword = await hashUserPassword(password)

        //CHECK IF USER ALREADY EXIST
        const existingUser = await db.User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ message: `Email already in use`, statuscode: 400, errors: [{ message: `Email already in use` }] });

        }
        const createdUser = await db.User.create({ name, email, password });
        console.log(createdUser)
        res.status(201).send({ message: "User created", statuscode: 201, data: { user: createdUser } });


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong", statuscode: 500, errors: [{ message: error.message || "internal server error" }] })

    }
}
exports.updateUser = async(req, res) => {}
exports.deleteUser = async(req, res) => {}