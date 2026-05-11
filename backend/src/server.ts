import http from "node:http";

async function main() {
  const server = http.createServer((req, res) => {
    res.end("Hello World");
  });

  server.listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
  });
}

main().catch((error: Error) => {
  console.error(error);
  process.exit(1);
});
