// Lesson 5 - Creating a crud user and reading the data from a file
const express = require("express");
const { randomUUID } = require("crypto");
const fs = require("fs");

const app = express();
app.use(express.json()); // to support JSON-encoded bodies

let users = [];

fs.readFile("./users.json", "utf8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    users = JSON.parse(data);
  }
});

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

// define default route
app.get("/", (req, res) => {
  res.send("Server running on port 3000");
});

// define route to get all users
app.get("/users", (req, res) => {
  res.json(users);
});

// define route to get all users
app.get("/user:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);
  res.json(user);
});

//  define route to get a user by id
app.post("/user", (req, res) => {
  const { name, age, ...rest } = req.body;

  const user = {
    id: randomUUID(),
    name,
    age,
    ...rest,
  };

  users.push(user);

  createUserFile(user);

  return res.json({ message: "User successfully added" });
});

// define route to get a user by id
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

  createUserFile();

  return res.json({ message: message });
});

//  define route to get a user by id
app.delete("/user/:id", (req, res) => {
  const { id } = req.params;

  const userIndex = users.findIndex((user) => user.id === id);

  userIndex !== -1 && users.splice(userIndex, 1);

  const message = userIndex !== -1 ? "User deleted" : "User not found";

  return res.json({ message: message });
});

/* Creating a file called users.json and writing the users array to it. */
function createUserFile() {
  fs.writeFile("./users.json", JSON.stringify(users), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("User successfully added");
    }
  });
}

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
