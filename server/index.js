require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const Connnection = require("./db");
const auth = require("./routes/auth");
const user = require("./routes/user");

Connnection();

app.use(express.json());
app.use(cors());

app.use("/api/auth", auth);
app.use("/api/users", user);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listenning on port ${port}`));
