const bcrypt = require("bcryptjs");

//HASH USER PASSWORD WITH BCRYPTJS
exports.hashUserPassword = async(password) => {
    try {
        const saltRound = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, saltRound);
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
};