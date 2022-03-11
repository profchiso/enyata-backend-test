const express = require("express");
const path = require("path");
const cors = require("cors")
const { userRouter } = require("./routes/user");
const { undefinedRouter } = require("./routes/undefinedRoute")
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());
app.use("/api/v1/users", userRouter);
app.use(undefinedRouter);



app.listen(PORT, () => console.log(`Server started on port ${PORT}`));