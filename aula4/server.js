// Lesson 4 - Creating crud user
const express = require("express");
const { randomUUID } = require("crypto");

const app = express();
app.use(express.json()); // to support JSON-encoded bodies

let users = [];

/**
 * POST - Insert a new data
 * GET - Get all data
 * PUT - Update an existing data
 * DELETE - Delete an existing data
 */

/**
 * body - The body of the request (method POST, PUT, DELETE) // ex: { name: 'Joan', age: 20 }
 * params - The params of the request (method GET) // example (url: /users/:id)
 * query - The query of the request (method GET) // example (url: /users?name=Joan)
 */

/* This is a route that will be called when the user accesses the root of the application. */
app.get("/", (req, res) => {
  res.send("Server running on port 3000");
});

/* Getting the all users. */
app.get("/users", (req, res) => {
  res.json(users);
});

/* Getting the user by id. */
app.get("/user:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);
  res.json(user);
});

/* Creating a new user. */
app.post("/user", (req, res) => {
  const { name, age, ...rest } = req.body;

  const user = {
    id: randomUUID(),
    name,
    age,
    ...rest,
  };

  users.push(user);

  return res.json({ message: "User successfully added" });
});

/* Updating the user by id. */
app.put("/user/:id", (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;

  const userIndex = users.findIndex((user) => user.id === id);

  users[userIndex] = {
    ...users[userIndex],
    name,
    age,
  };

  const message =
    userIndex !== -1 ? "User successfully updated" : "User not found";

  return res.json({ message: message });
});

/* Deleting the user by id. */
app.delete("/user/:id", (req, res) => {
  const { id } = req.params;

  const userIndex = users.findIndex((user) => user.id === id);

  userIndex !== -1 && users.splice(userIndex, 1);

  const message = userIndex !== -1 ? "User deleted" : "User not found";

  return res.json({ message: message });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
