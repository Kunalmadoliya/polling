import "dotenv/config";
import http from "node:http";
import {createExpressApp} from "./app";


async function main() {
  const PORT = process.env.PORT || 3000;
  const server = http.createServer(createExpressApp());

  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

main().catch((error: Error) => {
  console.error(error);
  process.exit(1);
});
