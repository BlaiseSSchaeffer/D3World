const filePath = __dirname + '/family.json'
const fs = require('fs');
const http = require('http');
const url = require('url');
const port = 4261;
const headers = {
    "Content-Type": "application/json"
};
let cors = false;

const content = fs.readFileSync(filePath);
const jsonData = JSON.parse(content);
const data = JSON.stringify(jsonData);

for (let i = 0; i < process.argv.length; i++) {
    arg = process.argv[i];
    if (arg == "--cors") {
        cors = true;
        headers["Access-Control-Allow-Origin"] = "*";
        headers["Access-Control-Allow-Headers"] = "Content-Type";
    }
}

const server = http.createServer((request, response) => {
    console.log("Request received...");
    console.log("URL:")
    console.log(request.url);
    console.log("HEADERS:");
    console.log(request.headers);
    query = url.parse(request.url, true).query;
    console.log("QUERY:");
    console.log(query)
    response.writeHead(200, headers);
    response.write(data);
    response.end();
    console.log("Response sent.\n");
});

server.listen(port)
console.log("Dev Server started on http://localhost:" + port);
if (cors) {
    console.log("with Access-Control-Allow-**** headers (CORS).");
}
console.log();