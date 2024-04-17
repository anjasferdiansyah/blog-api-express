require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");

const post = require("./routes/post.route");
const user = require("./routes/user.route");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

sequelize
  .authenticate()
  .then((error) => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.log("Unable to connect to the database:", error);
  });

app.use("/api/posts", post);
app.use("/api/users", user);

app.listen(process.env.SERVER_PORT, () => {
  console.log("Server is Running on Port " + process.env.SERVER_PORT);
});
