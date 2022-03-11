const express = require("express");
const undefinedRouter = express.Router();

router.all("*", (req, res) => {


    res.status(404).json({
        message: "Invalid Endpoint",
        statusCode: 404,
    });
});
module.exports = { undefinedRouter };