// Lesson 3 - Creating a web server with express
const express = require("express");

const app = express();

let users = [
  {
    id: 1,
    name: "John",
    email: "vinicius.uchoa2002@gmail.com",
    password: "123456",
  },
];

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
  res.send(`
  <h1>Server running</h1>
  <h2>Try:</h2>
  <ul>
    <li>GET: localhost:3000/users</li>
  </ul>
  `);
});

/* Getting the all users. */
app.get("/users", (req, res) => {
  console.log(req.url);
  res.json(users);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
