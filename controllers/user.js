const { validationResult } = require('express-validator');
const { hashUserPassword } = require("../utils/passwordHashing")
const db = require("../models/index")

exports.getSingleUser = async(req, res) => {
        try {
            const user = await db.user.findOne({ where: req.body || req.query, });
            if (!user) {
                return res.status(404).json({ message: "User not found", statuscode: 404, });
            }
            res.status(200).json({ message: "User Fetched", statuscode: 200, data: { user } });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Something went wrong", statuscode: 500, errors: [{ message: error.message || "internal server error" }] })

        }
    }
    // exports.getAuser = async(req, res) => {
    //     try {

//         const { id } = req.params;
//         const user = await db.user.findOne({ where: { id } });
//         if (!user) {
//             return res.status(404).json({ message: "User not found", statuscode: 404, });

//         }

//         res.status(200).json({ message: "User Fetched", statuscode: 200, data: { user } });
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: "Something went wrong", statuscode: 500, errors: [{ message: error.message || "internal server error" }] })

//     }
// }
exports.createUser = async(req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, password } = req.body

        // let hashedPassword = await hashUserPassword(password)


        const existingUser = await db.user.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ message: `Email already in use`, statuscode: 400, errors: [{ message: `Email already in use` }] });

        }
        const createdUser = await db.user.create({ name, email, password });
        console.log(createdUser)
        res.status(201).send({ message: "User created", statuscode: 201, data: { user: createdUser } });


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong", statuscode: 500, errors: [{ message: error.message || "internal server error" }] })

    }
}
exports.updateUser = async(req, res) => {
    try {
        const { id } = req.params;
        const user = await db.user.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({ message: "User not found", statuscode: 404, errors: [{ message: "User not found" }] })

        }
        delete req.body.password
        const updatedUser = await db.user.update(req.body, { where: { id }, returning: true, plain: true })
        res.status(200).json({ message: `User info updated`, statuscode: 200, data: { user: updatedUser[1] } });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong", statuscode: 500, errors: [{ message: error.message || "internal server error" }] })

    }
}
exports.deleteUser = async(req, res) => {
    try {
        const { id } = req.params;
        const user = await db.user.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({ message: "User not found", statuscode: 404, errors: [{ message: "User not found" }] })

        }
        await db.user.destroy({ where: { id } })
        res.status(204).json({ message: `User info deleted`, statuscode: 204, });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong", statuscode: 500, errors: [{ message: error.message || "internal server error" }] })

    }
}