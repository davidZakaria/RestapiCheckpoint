require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("./model/user");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT;

app.post("/api/user", async (req, res) => {
  try {
    const user = new User({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      age: req.body.age,
    });
    const result = await user.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send("Error yabne");
  }
});
app.get("/api/user", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.put("/api/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});
app.delete("/api/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

mongoose.connect(process.env.CONNECTION_STRING, {}, () =>
  console.log("Connected to DB")
);

app.listen(PORT || 3000, () => console.log("Server is up and running"));
