/* eslint-disable no-undef */
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const post = require("./routes/post.route");
const user = require("./routes/user.route");
const tag = require("./routes/tag.route");
const profile = require("./routes/profile.route");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

app.use("/api/posts", post);
app.use("/api/users", user);
app.use("/api/tags", tag);
app.use("/api/profile", profile);

app.listen(process.env.SERVER_PORT, () => {
  console.log("Server is Running on Port " + process.env.SERVER_PORT);
});
