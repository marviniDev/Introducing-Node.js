// Lesson 2 - Creating a web server and routing
const http = require("http");

// Create a local server to receive data from
const server = http.createServer((request, response) => {
  const routes = ["app", "user", "profile", "settings"];

  if (routes.includes(request.url.replace(/\//g, ""))) {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(
      JSON.stringify({
        data: "route found to: " + request.url,
      })
    );
  } else {
    response.writeHeader(200, { "Content-Type": "text/html" });
    response.write(`
          <h1>Server running</h1>
          <h2>Try:</h2>
          <ul>
            <li>GET: localhost:3000/users</li>
          </ul>
          `);
    response.end();
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
