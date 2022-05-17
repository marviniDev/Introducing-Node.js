// Lesson 1 - Creating a web server without using the Node.js framework
const http = require("http");

// Create a local server to receive data from
const server = http.createServer((request, response) => {
  response.writeHeader(200, { "Content-Type": "text/html" });
  response.write("<h1>Hello World</h1>");
  response.end();
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
