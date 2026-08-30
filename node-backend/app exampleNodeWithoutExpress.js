//get method without express js - express js make easier to write code. see other file with express for get how shorten
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/products") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    res.end(JSON.stringify({
      message: "Products fetched successfully"
    }));
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
});

server.listen(3000);